// Stub data — stands in for the Supabase tables until the project is wired up.
// Replace reads in quizStore.ts with Supabase queries; this file can then go away.
import type { Topic, Quiz, QuizQuestion } from "./quizTypes";

export const stubTopics: Topic[] = [
  { id: "t_polity", name: "Polity", slug: "polity", description: "Constitution, governance & rights", displayOrder: 1, isActive: true },
  { id: "t_geo", name: "Geography", slug: "geography", description: "Physical, Indian & world geography", displayOrder: 2, isActive: true },
  { id: "t_history", name: "History", slug: "history", description: "Ancient, medieval & modern India", displayOrder: 3, isActive: true },
  { id: "t_current", name: "Current Affairs", slug: "current-affairs", description: "Latest national & international events", displayOrder: 4, isActive: true },
];

export const stubQuizzes: Quiz[] = [
  { id: "q_polity_fr", topicId: "t_polity", title: "Fundamental Rights", description: "Articles 12–35 and landmark cases.", durationMinutes: 10, difficulty: "Medium", isActive: true, createdAt: "2026-07-01" },
  { id: "q_polity_parl", topicId: "t_polity", title: "Parliament & Legislature", description: "Structure, functions & procedures.", durationMinutes: 10, difficulty: "Hard", isActive: true, createdAt: "2026-07-05" },
  { id: "q_geo_rivers", topicId: "t_geo", title: "Indian Rivers", description: "Major river systems of India.", durationMinutes: 8, difficulty: "Easy", isActive: true, createdAt: "2026-07-03" },
  { id: "q_history_freedom", topicId: "t_history", title: "Freedom Struggle", description: "Key movements & leaders, 1857–1947.", durationMinutes: 10, difficulty: "Medium", isActive: true, createdAt: "2026-07-04" },
];

export const stubQuestions: QuizQuestion[] = [
  // Polity — Fundamental Rights
  { id: "qq1", quizId: "q_polity_fr", questionText: "Which Article of the Indian Constitution deals with the Right to Constitutional Remedies?", options: ["Article 19", "Article 21", "Article 32", "Article 44"], correctAnswer: 2, explanation: "Dr. B.R. Ambedkar called Article 32 the 'heart and soul' of the Constitution.", marks: 4, displayOrder: 1 },
  { id: "qq2", quizId: "q_polity_fr", questionText: "Right to Equality is guaranteed under which Articles?", options: ["Articles 14–18", "Articles 19–22", "Articles 23–24", "Articles 25–28"], correctAnswer: 0, explanation: "Articles 14 to 18 collectively guarantee the Right to Equality.", marks: 4, displayOrder: 2 },
  { id: "qq3", quizId: "q_polity_fr", questionText: "Which Article abolishes untouchability?", options: ["Article 15", "Article 16", "Article 17", "Article 18"], correctAnswer: 2, explanation: "Article 17 abolishes untouchability and forbids its practice in any form.", marks: 4, displayOrder: 3 },

  // Polity — Parliament
  { id: "qq4", quizId: "q_polity_parl", questionText: "The maximum strength of the Lok Sabha as envisaged by the Constitution is:", options: ["500", "543", "545", "552"], correctAnswer: 3, explanation: "Article 81 sets the maximum strength of the Lok Sabha at 552.", marks: 4, displayOrder: 1 },
  { id: "qq5", quizId: "q_polity_parl", questionText: "Who presides over a joint sitting of both Houses of Parliament?", options: ["President", "Vice-President", "Speaker of Lok Sabha", "Prime Minister"], correctAnswer: 2, explanation: "The Speaker of the Lok Sabha presides over a joint sitting (Article 118).", marks: 4, displayOrder: 2 },

  // Geography — Rivers
  { id: "qq6", quizId: "q_geo_rivers", questionText: "Which is the longest river flowing entirely within India?", options: ["Ganga", "Godavari", "Narmada", "Krishna"], correctAnswer: 1, explanation: "The Godavari is the longest river that flows entirely within India.", marks: 4, displayOrder: 1 },
  { id: "qq7", quizId: "q_geo_rivers", questionText: "The Sundarbans delta is formed by which rivers?", options: ["Ganga–Brahmaputra", "Krishna–Godavari", "Narmada–Tapti", "Mahanadi–Godavari"], correctAnswer: 0, explanation: "The Sundarbans delta is formed by the Ganga, Brahmaputra and Meghna rivers.", marks: 4, displayOrder: 2 },

  // History — Freedom Struggle
  { id: "qq8", quizId: "q_history_freedom", questionText: "The Non-Cooperation Movement was launched in which year?", options: ["1919", "1920", "1930", "1942"], correctAnswer: 1, explanation: "Mahatma Gandhi launched the Non-Cooperation Movement in 1920.", marks: 4, displayOrder: 1 },
  { id: "qq9", quizId: "q_history_freedom", questionText: "'Do or Die' was the slogan associated with which movement?", options: ["Non-Cooperation", "Civil Disobedience", "Quit India", "Swadeshi"], correctAnswer: 2, explanation: "'Do or Die' was Gandhi's call during the Quit India Movement of 1942.", marks: 4, displayOrder: 2 },
];
