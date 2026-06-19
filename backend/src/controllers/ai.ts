import { type Response } from "express";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import type { AuthRequest } from "../middleware/auth.ts";

export const chatWithAI = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { messages } = req.body;
    const userRole = req.user?.role;

    if (userRole !== "student") {
      res.status(403).json({ message: "Only students can use the AI Doubt Solver." });
      return;
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ message: "AI is currently unavailable." });
      return;
    }

    const google = createGoogleGenerativeAI({ apiKey });
    const model = google("gemini-3-flash-preview"); // or gemini-1.5-flash

    const systemPrompt = `
      You are ClassMind AI, a friendly and supportive school tutor.
      Your primary goal is to help students learn and understand concepts, not to give them direct answers to their homework.
      
      RULES:
      1. Explain concepts in simple, age-appropriate language (Grades 6-8).
      2. PREFER HINTS over direct answers. Guide the student to the answer.
      3. Do NOT solve equations or write full essays for them. Instead, show an example or give the first step.
      4. Encourage learning and praise their effort.
      5. If a topic is inappropriate or completely outside typical school subjects, politely decline to answer and suggest they ask their teacher.
    `;

    const result = await generateText({
      model,
      system: systemPrompt,
      messages,
    });

    res.json({ text: result.text });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ message: "Failed to connect to AI Tutor." });
  }
};
