// Shared types for the Edunachal Open Test / topic-wise quiz platform.
// These mirror the Supabase table shapes described in the PRD, so moving from
// stubbed data to live Supabase later is a drop-in swap.

export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
}

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Quiz {
  id: string;
  topicId: string;
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: Difficulty;
  isActive: boolean;
  createdAt: string; // ISO date
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  questionText: string;
  options: string[];
  correctAnswer: number; // index into options
  explanation: string;
  marks: number;
  displayOrder: number;
}

// What the student fills before starting a quiz (lead capture).
export interface Registration {
  name: string;
  email: string;
  phone: string;
  studentClass?: string; // class / target exam
}

// One saved attempt. `answers` maps questionId -> chosen option index.
export interface Submission {
  quizId: string;
  student: Registration;
  answers: Record<string, number>;
  score: number;
  totalMarks: number;
  percentile?: number;
  submittedAt: string; // ISO date
}
