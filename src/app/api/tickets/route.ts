import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateAIResponse } from "@/lib/openai";
import { z } from "zod";

const ticketSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  category: z.string().optional(),
});

const responseSchema = z.object({
  ticketId: z.string(),
  content: z.string().min(1, "Content is required"),
  useAI: z.boolean().optional().default(false),
});

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tickets = await prisma.ticket.findMany({
      where: { userId: session.user.id },
      include: {
        responses: {
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
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
    const { subject, description, priority, category } =
      ticketSchema.parse(body);

    const ticket = await prisma.ticket.create({
      data: {
        userId: session.user.id,
        subject,
        description,
        priority,
        category,
        status: "open",
      },
    });

    // Generate AI response for the ticket
    try {
      const aiResponse = await generateAIResponse([
        {
          role: "system",
          content:
            "You are a helpful customer support assistant. Provide a clear, professional response to the customer's inquiry.",
        },
        {
          role: "user",
          content: `Subject: ${subject}\n\nDescription: ${description}`,
        },
      ]);

      await prisma.ticketResponse.create({
        data: {
          ticketId: ticket.id,
          content: aiResponse,
          isAI: true,
        },
      });
    } catch (aiError) {
      console.error("Error generating AI response:", aiError);
    }

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
