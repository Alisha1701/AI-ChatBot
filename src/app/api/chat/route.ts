import { NextRequest, NextResponse } from "next/server";
import { personas } from "@/lib/personas";

export async function POST(req: NextRequest) {
  try {
    const { personaId, messages } = await req.json();

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Please set GOOGLE_API_KEY in your environment variables." },
        { status: 500 }
      );
    }

    const persona = personas[personaId];
    if (!persona) {
      return NextResponse.json(
        { error: "Invalid persona selected." },
        { status: 400 }
      );
    }

    // Build the conversation history for Gemini API
    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: persona.systemPrompt }],
          },
          contents,
          generationConfig: {
            temperature: 0.8,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Gemini API error:", errorData);
      
      let errorMessage = "Failed to get response from AI. Please try again.";
      if (response.status === 429) {
        errorMessage = "API quota exceeded. Please wait a moment and try again, or use a different API key.";
      } else if (response.status === 403) {
        errorMessage = "API key is invalid or lacks permissions. Please check your GOOGLE_API_KEY.";
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I apologize, I couldn't generate a response. Please try again.";

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
