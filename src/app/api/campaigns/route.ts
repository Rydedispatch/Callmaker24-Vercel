import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { twilioClient, TWILIO_PHONE_NUMBER } from "@/lib/twilio";

const campaignSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["EMAIL", "SMS", "VOICE"]),
  subject: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  contactIds: z.array(z.string()),
  scheduledAt: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const campaigns = await prisma.campaign.findMany({
      where: { userId: session.user.id },
      include: {
        _count: {
          select: { campaignContacts: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, type, subject, content, contactIds, scheduledAt } =
      campaignSchema.parse(body);

    // Create campaign
    const campaign = await prisma.campaign.create({
      data: {
        userId: session.user.id,
        name,
        type,
        subject,
        content,
        status: scheduledAt ? "SCHEDULED" : "DRAFT",
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      },
    });

    // Add contacts to campaign
    if (contactIds.length > 0) {
      await prisma.campaignContact.createMany({
        data: contactIds.map((contactId) => ({
          campaignId: campaign.id,
          contactId,
        })),
      });
    }

    // If not scheduled, send immediately
    if (!scheduledAt && type === "SMS") {
      await sendSMSCampaign(campaign.id, session.user.id, content, contactIds);
    }

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function sendSMSCampaign(
  campaignId: string,
  userId: string,
  content: string,
  contactIds: string[]
) {
  try {
    const contacts = await prisma.contact.findMany({
      where: {
        id: { in: contactIds },
        phone: { not: null },
      },
    });

    for (const contact of contacts) {
      if (!contact.phone) continue;

      try {
        const message = await twilioClient.messages.create({
          body: content,
          from: TWILIO_PHONE_NUMBER,
          to: contact.phone,
        });

        await prisma.message.create({
          data: {
            userId,
            contactId: contact.id,
            campaignId,
            type: "sms",
            to: contact.phone,
            from: TWILIO_PHONE_NUMBER,
            content,
            status: "sent",
            twilioSid: message.sid,
          },
        });

        await prisma.campaignContact.updateMany({
          where: {
            campaignId,
            contactId: contact.id,
          },
          data: {
            status: "sent",
            sentAt: new Date(),
          },
        });
      } catch (error) {
        console.error(`Failed to send SMS to ${contact.phone}:`, error);
      }
    }

    await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        status: "COMPLETED",
        sentAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error sending SMS campaign:", error);
  }
}
