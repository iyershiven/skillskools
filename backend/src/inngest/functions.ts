import { inngest } from "./index.ts";
import { NonRetriableError } from "inngest";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { supabaseAdmin } from "../config/supabase.ts";

export const generateHomework = inngest.createFunction(
  { id: "Generate-Homework" },
  { event: "homework/generate" },
  async ({ event, step }) => {
    const { homeworkId, topic, subjectName, difficulty, count } = event.data;

    const aiQuestions = await step.run("generate-homework-logic", async () => {
      const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
      if (!apiKey) {
        throw new NonRetriableError("GOOGLE_GENERATIVE_AI_API_KEY is missing");
      }

      const prompt = `
        You are a strict teacher. Create a JSON array of ${count} multiple-choice questions for a high school homework assignment.

        CONTEXT:
        - Subject: ${subjectName}
        - Topic: ${topic}
        - Difficulty: ${difficulty}

        STRICT JSON SCHEMA (Array of Objects):
        [
          {
            "question_text": "Question string",
            "question_type": "mcq",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer_key": "The exact string of the correct option",
            "marks": 1,
            "difficulty": "${difficulty}"
          }
        ]

        RULES:
        1. Output ONLY raw JSON. No Markdown.
        2. Ensure answer_key matches one of the options exactly.
      `;

      const google = createGoogleGenerativeAI({ apiKey });
      const activeModel = google("gemini-3-flash-preview");

      const { text } = await generateText({ prompt, model: activeModel });
      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(cleanJson);
    });

    await step.run("save-homework", async () => {
      const { data: homework, error: fetchError } = await supabaseAdmin
        .from("homework")
        .select("school_id")
        .eq("id", homeworkId)
        .single();

      if (fetchError || !homework) {
        throw new NonRetriableError(`Homework ${homeworkId} not found`);
      }

      // Map ai questions to table structure
      const questionsToInsert = aiQuestions.map((q: any) => ({
        school_id: homework.school_id,
        homework_id: homeworkId,
        question_text: q.question_text,
        question_type: "mcq",
        options: q.options,
        answer_key: q.answer_key,
        marks: q.marks,
        difficulty: q.difficulty || "medium",
      }));

      const { error: insertError } = await supabaseAdmin
        .from("homework_questions")
        .insert(questionsToInsert);

      if (insertError) {
        throw new NonRetriableError(`Failed to save questions: ${insertError.message}`);
      }

      return { success: true, count: aiQuestions.length };
    });

    return { message: "Homework generated successfully" };
  }
);

export const handleHomeworkSubmission = inngest.createFunction(
  { id: "Handle-Homework-Submission" },
  { event: "homework/submit" },
  async ({ event, step }) => {
    const { homeworkId, studentId, schoolId, answers } = event.data;

    await step.run("process-homework-submission", async () => {
      // 1. Check if already submitted
      const { data: existingSubmission } = await supabaseAdmin
        .from("homework_submissions")
        .select("id")
        .eq("homework_id", homeworkId)
        .eq("student_id", studentId)
        .single();

      if (existingSubmission) {
        throw new NonRetriableError("Homework already submitted");
      }

      // 2. Fetch questions to calculate score
      const { data: questions } = await supabaseAdmin
        .from("homework_questions")
        .select("id, answer_key, marks")
        .eq("homework_id", homeworkId);

      if (!questions) {
        throw new NonRetriableError(`Questions not found for homework ${homeworkId}`);
      }

      let score = 0;
      let totalPoints = 0;
      const studentAnswersToInsert: any[] = [];

      // Create submission first to get ID
      const { data: submission, error: submissionError } = await supabaseAdmin
        .from("homework_submissions")
        .insert({
          school_id: schoolId,
          homework_id: homeworkId,
          student_id: studentId,
          status: "submitted",
          score: 0 // Will update after grading
        })
        .select()
        .single();

      if (submissionError || !submission) {
        throw new NonRetriableError("Failed to create submission record");
      }

      questions.forEach((question) => {
        totalPoints += question.marks;
        const studentAns = answers.find((a: any) => a.questionId === question.id);
        const isCorrect = studentAns && studentAns.answer === question.answer_key;
        
        const earnedScore = isCorrect ? question.marks : 0;
        score += earnedScore;

        studentAnswersToInsert.push({
          school_id: schoolId,
          submission_id: submission.id,
          question_id: question.id,
          student_answer: studentAns ? studentAns.answer : null,
          ai_score: earnedScore,
          ai_feedback: isCorrect ? "Correct!" : "Incorrect."
        });
      });

      // Insert answers
      await supabaseAdmin.from("student_answers").insert(studentAnswersToInsert);

      // Update total score on submission
      await supabaseAdmin
        .from("homework_submissions")
        .update({ score })
        .eq("id", submission.id);

    });

    return { message: "Homework submitted and graded successfully" };
  }
);
