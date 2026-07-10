/**
 * Serverless endpoint (Vercel) that receives parsed quizzes from the admin
 * upload page and writes them to Supabase using the service-role key.
 *
 * Security: the service key and the admin password live ONLY in Vercel
 * environment variables (server-side) — never in the website bundle.
 *
 * Required Vercel env vars:
 *   SUPABASE_URL             (your project URL)
 *   SUPABASE_SERVICE_KEY     (Project Settings -> API -> service_role secret)
 *   ADMIN_UPLOAD_PASSWORD    (the shared password admins type on the page)
 */
import { createClient } from "@supabase/supabase-js";

const LETTERS = "ABCDEFGH";
const slugify = (s) =>
  String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const letterToIndex = (a) => LETTERS.indexOf(String(a).trim().toUpperCase());

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password, quizzes } = req.body || {};

  const expected = process.env.ADMIN_UPLOAD_PASSWORD;
  if (!expected || password !== expected) {
    return res.status(401).json({ error: "Incorrect admin password." });
  }

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !serviceKey) {
    return res.status(500).json({ error: "Server not configured: missing Supabase env vars." });
  }
  if (!Array.isArray(quizzes) || quizzes.length === 0) {
    return res.status(400).json({ error: "No quizzes to upload." });
  }

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  async function ensureTopic(name) {
    const slug = slugify(name);
    const { data: existing, error: selErr } = await supabase
      .from("topics").select("id").eq("slug", slug).maybeSingle();
    if (selErr) throw selErr;
    if (existing) return existing.id;
    const { data, error } = await supabase
      .from("topics")
      .insert({ name, slug, description: "", is_active: true })
      .select("id").single();
    if (error) throw error;
    return data.id;
  }

  try {
    let added = 0;
    let skipped = 0;

    for (const quiz of quizzes) {
      if (!quiz.title || !quiz.topic || !Array.isArray(quiz.questions) || quiz.questions.length === 0) {
        continue;
      }
      const topicId = await ensureTopic(quiz.topic);

      const { data: dupe } = await supabase
        .from("quizzes").select("id").eq("topic_id", topicId).eq("title", quiz.title).maybeSingle();
      if (dupe) {
        skipped++;
        continue;
      }

      const { data: q, error: qErr } = await supabase
        .from("quizzes")
        .insert({
          topic_id: topicId,
          title: quiz.title,
          description: quiz.description || "",
          duration_minutes: Number(quiz.durationMinutes) || 10,
          difficulty: quiz.difficulty || "Medium",
          is_active: true,
        })
        .select("id").single();
      if (qErr) throw qErr;

      const rows = quiz.questions.map((question, i) => {
        const idx = letterToIndex(question.answer);
        if (idx < 0 || idx >= question.options.length) {
          throw new Error(`Bad answer in "${quiz.title}", question ${i + 1}.`);
        }
        return {
          quiz_id: q.id,
          question_text: question.question,
          options: question.options,
          correct_answer: idx,
          explanation: question.explanation || "",
          marks: Number(question.marks) || 4,
          display_order: i + 1,
        };
      });

      const { error: insErr } = await supabase.from("questions").insert(rows);
      if (insErr) throw insErr;
      added++;
    }

    const parts = [`Added ${added} quiz${added === 1 ? "" : "zes"}`];
    if (skipped) parts.push(`skipped ${skipped} (same title already existed)`);
    return res.status(200).json({ added, skipped, message: parts.join(", ") + "." });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Upload failed." });
  }
}
