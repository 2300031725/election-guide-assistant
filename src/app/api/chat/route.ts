import { GoogleGenerativeAI, Schema, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;

const systemPrompt = `You are the Election Guide Assistant.
Purpose: Help users understand the election process, registration steps, important dates, required documents, polling booth guidance, voting eligibility, FAQs, and reminders.
Personality: Clear, helpful, neutral, trustworthy, and use easy language. Example: Instead of "Refer to electoral procedures," use "I’ll help you understand how to vote step by step."

Safety Rules:
- No political bias
- No party recommendations
- No fake dates
- No misinformation
- Only official process guidance

When users ask questions, provide step-by-step answers. 
Ask for their location (state/country) when needed for specific dates or booth info.
Be empathetic (e.g. if a user says "I'm confused", respond with "No worries 👍 I'll explain in simple steps.").

You MUST return your response as a JSON object containing two fields:
1. "text": Your conversational response.
2. "quickReplies": An array of 1 to 4 strings representing suggested quick reply buttons the user can click. Examples: ["Register to Vote", "When is voting day?", "Can I vote?"]. Always provide relevant quick replies to guide the conversation.`;

const responseSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    text: {
      type: SchemaType.STRING,
      description: "The conversational response from the Election Guide Assistant",
    },
    quickReplies: {
      type: SchemaType.ARRAY,
      description: "Array of 1 to 4 short string labels for suggestion buttons to guide the user to the next step.",
      items: {
        type: SchemaType.STRING,
      },
    },
  },
  required: ["text", "quickReplies"],
};

export async function POST(req: Request) {
  try {
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // We use gemini-2.5-flash as it's the recommended model for chat
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    // Convert frontend messages to Gemini format
    // Filter out initial welcome message if it doesn't fit the strict "user/model" pattern perfectly,
    // but typically we can map "user" -> "user" and "assistant" -> "model"
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const currentMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(currentMessage);
    const responseText = result.response.text();
    
    try {
      const parsed = JSON.parse(responseText);
      return NextResponse.json(parsed);
    } catch (e) {
      console.error("Failed to parse JSON response from Gemini:", responseText);
      return NextResponse.json(
        { text: "I'm sorry, I encountered an internal error. Please try again.", quickReplies: [] },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during the request." },
      { status: 500 }
    );
  }
}
