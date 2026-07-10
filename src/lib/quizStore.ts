// The single data seam for the quiz platform. The whole UI calls these
// functions; only this file knows about Supabase. Column names in the DB are
// snake_case and get mapped to our camelCase types here.

import type { Topic, Quiz, QuizQuestion, Submission } from "@/data/quizTypes";
import { supabase } from "@/lib/supabaseClient";

function mapTopic(r: any): Topic {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    description: r.description ?? "",
    displayOrder: r.display_order ?? 0,
    isActive: r.is_active,
  };
}

function mapQuiz(r: any): Quiz {
  return {
    id: r.id,
    topicId: r.topic_id,
    title: r.title,
    description: r.description ?? "",
    durationMinutes: r.duration_minutes ?? 10,
    difficulty: r.difficulty ?? "Medium",
    isActive: r.is_active,
    createdAt: r.created_at,
  };
}

function mapQuestion(r: any): QuizQuestion {
  return {
    id: r.id,
    quizId: r.quiz_id,
    questionText: r.question_text,
    options: Array.isArray(r.options) ? r.options : [],
    correctAnswer: r.correct_answer,
    explanation: r.explanation ?? "",
    marks: r.marks ?? 4,
    displayOrder: r.display_order ?? 0,
  };
}

export async function getTopics(): Promise<Topic[]> {
  const { data, error } = await supabase
    .from("topics")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  if (error) throw error;
  return (data ?? []).map(mapTopic);
}

export async function getTopicBySlug(slug: string): Promise<Topic | null> {
  const { data, error } = await supabase
    .from("topics")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) throw error;
  return data ? mapTopic(data) : null;
}

export async function getQuizzesByTopic(topicId: string): Promise<Quiz[]> {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("topic_id", topicId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapQuiz);
}

export async function getQuiz(quizId: string): Promise<Quiz | null> {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", quizId)
    .eq("is_active", true)
    .maybeSingle();
  if (error) throw error;
  return data ? mapQuiz(data) : null;
}

export async function getQuestions(quizId: string): Promise<QuizQuestion[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("quiz_id", quizId)
    .order("display_order");
  if (error) throw error;
  return (data ?? []).map(mapQuestion);
}

export async function saveSubmission(submission: Submission): Promise<void> {
  const { error } = await supabase.from("submissions").insert({
    quiz_id: submission.quizId,
    student_name: submission.student.name,
    student_email: submission.student.email,
    student_phone: submission.student.phone,
    student_class: submission.student.studentClass ?? null,
    answers: submission.answers,
    score: submission.score,
    total_marks: submission.totalMarks,
    percentile: submission.percentile ?? null,
  });
  if (error) throw error;
}
