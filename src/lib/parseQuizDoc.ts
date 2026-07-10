// Turns the plain text of an uploaded quiz document into structured quizzes.
// Tolerant by design: labels are case-insensitive, and ":" / "-" / ")" all work
// as separators, so a non-technical author can't easily break it.
//
// Expected layout (repeat the Quiz block for multiple quizzes):
//
//   Topic: Polity
//   Quiz: Fundamental Rights
//   Difficulty: Medium
//   Duration: 10
//
//   1. Which article deals with the Right to Constitutional Remedies?
//   A) Article 19
//   B) Article 21
//   C) Article 32
//   D) Article 44
//   Answer: C
//   Explanation: Article 32 is the heart and soul of the Constitution.

export interface ParsedQuestion {
  question: string;
  options: string[];
  answer: string; // single uppercase letter, e.g. "C"
  explanation?: string;
}

export interface ParsedQuiz {
  topic: string;
  title: string;
  difficulty?: string;
  durationMinutes?: number;
  questions: ParsedQuestion[];
}

export interface ParseResult {
  quizzes: ParsedQuiz[];
  errors: string[];
}

const LETTERS = "ABCDEFGH";

function label(line: string, name: string): string | null {
  const m = new RegExp(`^${name}\\s*[:\\-]\\s*(.*)$`, "i").exec(line);
  return m ? m[1].trim() : null;
}

// Accepts "C", "c", "3", or the full option text and returns a letter.
function normalizeAnswer(raw: string, options: string[]): string {
  const t = raw.trim();
  if (/^[A-Ha-h]$/.test(t)) return t.toUpperCase();
  if (/^[1-8]$/.test(t)) return LETTERS[parseInt(t, 10) - 1] ?? "";
  const idx = options.findIndex((o) => o.toLowerCase() === t.toLowerCase());
  return idx >= 0 ? LETTERS[idx] : t.toUpperCase();
}

export function parseQuizDoc(text: string): ParseResult {
  const lines = text.split(/\r?\n/).map((l) => l.trim());
  const quizzes: ParsedQuiz[] = [];
  const errors: string[] = [];

  let topic = "";
  let quiz: ParsedQuiz | null = null;
  let q: ParsedQuestion | null = null;

  const flushQ = () => {
    if (quiz && q) quiz.questions.push(q);
    q = null;
  };
  const flushQuiz = () => {
    flushQ();
    if (quiz) quizzes.push(quiz);
    quiz = null;
  };

  for (const line of lines) {
    if (!line) continue;

    let v: string | null;

    if ((v = label(line, "topic")) !== null) {
      topic = v;
      continue;
    }
    if ((v = label(line, "quiz")) !== null || (v = label(line, "quiz title")) !== null) {
      flushQuiz();
      quiz = { topic, title: v, questions: [] };
      continue;
    }
    if ((v = label(line, "difficulty")) !== null) {
      if (quiz) quiz.difficulty = v;
      continue;
    }
    if ((v = label(line, "duration")) !== null) {
      const n = parseInt(v, 10);
      if (quiz && !isNaN(n)) quiz.durationMinutes = n;
      continue;
    }
    if ((v = label(line, "answer")) !== null) {
      if (q) q.answer = normalizeAnswer(v, q.options);
      continue;
    }
    if ((v = label(line, "explanation")) !== null) {
      if (q) q.explanation = v;
      continue;
    }

    // Option line: "A) text", "A. text", "A: text", "A - text"
    let m = /^([A-Ha-h])\s*[).:\-]\s*(.+)$/.exec(line);
    if (m && q) {
      q.options.push(m[2].trim());
      continue;
    }

    // Question line: "1. text", "1) text", "Q1. text", "Question 1: text"
    m = /^(?:q(?:uestion)?\s*)?\d+\s*[).:\-]\s*(.+)$/i.exec(line);
    if (m) {
      flushQ();
      q = { question: m[1].trim(), options: [], answer: "", explanation: undefined };
      continue;
    }

    // Loose continuation lines (wrapped text): append sensibly.
    if (q) {
      if (q.options.length === 0) q.question += " " + line;
      else q.options[q.options.length - 1] += " " + line;
    }
  }
  flushQuiz();

  // ---- Validation ----
  if (quizzes.length === 0) {
    errors.push('No quizzes found. Make sure the document has a "Quiz:" line and questions.');
  }
  quizzes.forEach((qz, qi) => {
    const where = `Quiz ${qi + 1}${qz.title ? ` ("${qz.title}")` : ""}`;
    if (!qz.title) errors.push(`${where}: missing a "Quiz:" title.`);
    if (!qz.topic) errors.push(`${where}: missing a "Topic:" line above it.`);
    if (qz.questions.length === 0) errors.push(`${where}: has no questions.`);
    qz.questions.forEach((question, idx) => {
      const qref = `${where}, question ${idx + 1}`;
      if (question.options.length < 2) errors.push(`${qref}: needs at least 2 options (A, B, ...).`);
      if (!question.answer) {
        errors.push(`${qref}: missing an "Answer:" line.`);
      } else {
        const ai = LETTERS.indexOf(question.answer);
        if (ai < 0 || ai >= question.options.length) {
          errors.push(`${qref}: answer "${question.answer}" doesn't match one of its options.`);
        }
      }
    });
  });

  return { quizzes, errors };
}
