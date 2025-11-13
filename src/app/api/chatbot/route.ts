import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateAIResponse } from "@/lib/openai";
import { z } from "zod";

const chatSchema = z.object({
  message: z.string().min(1, "Message is required"),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .optional()
    .default([]),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { message, conversationHistory } = chatSchema.parse(body);

    // Build conversation context
    const messages: Array<{
      role: "system" | "user" | "assistant";
      content: string;
    }> = [
      {
        role: "system",
        content: `You are a helpful AI assistant for Callmaker24, a marketing automation and CRM platform. 
        You can help users with:
        - Creating and managing campaigns (email, SMS, voice)
        - Managing contacts and customer data
        - Understanding analytics and reports
        - Troubleshooting issues
        - Answering questions about features
        
        Be friendly, professional, and provide actionable advice. If you don't know something, be honest about it.`,
      },
      ...conversationHistory.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      {
        role: "user",
        content: message,
      },
    ];

    const response = await generateAIResponse(messages);

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Chatbot error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
