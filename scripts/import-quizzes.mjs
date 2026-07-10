/**
 * import-quizzes.mjs — adds the quizzes from content/quizzes.json into Supabase.
 *
 *   Run it with:   npm run import:quizzes
 *
 * How it works (for the next developer):
 *   1. Reads content/quizzes.json.
 *   2. For each quiz: makes sure the topic exists (creates it if not),
 *      inserts the quiz, then inserts its questions.
 *   3. "answer" letters (A/B/C/D) are converted to the 0-based index the
 *      database expects. You never deal with indexes by hand.
 *
 * Needs a service-role key (write access). Put it in .env.local (git-ignored):
 *   SUPABASE_SERVICE_KEY=...   (Supabase → Project Settings → API → service_role)
 * The project URL is read from .env (VITE_SUPABASE_URL).
 */
import { readFileSync, existsSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// --- Minimal .env reader (no extra dependency) ---
function loadEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnv(".env");
loadEnv(".env.local");

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

if (!url || !serviceKey) {
  console.error(
    "\nMissing credentials.\n" +
      "  • VITE_SUPABASE_URL should be in .env\n" +
      "  • SUPABASE_SERVICE_KEY should be in .env.local (see .env.local.example)\n"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const letterToIndex = (a) => "ABCDEFGH".indexOf(String(a).trim().toUpperCase());

async function ensureTopic(name) {
  const slug = slugify(name);
  const { data: existing, error: selErr } = await supabase
    .from("topics")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (selErr) throw selErr;
  if (existing) return existing.id;

  const { data, error } = await supabase
    .from("topics")
    .insert({ name, slug, description: "", is_active: true })
    .select("id")
    .single();
  if (error) throw error;
  console.log(`  + created new topic "${name}"`);
  return data.id;
}

async function run() {
  const file = "content/quizzes.json";
  const { quizzes } = JSON.parse(readFileSync(file, "utf8"));
  console.log(`\nImporting ${quizzes.length} quiz(zes) from ${file}...\n`);

  let added = 0;
  let skipped = 0;

  for (const quiz of quizzes) {
    const topicId = await ensureTopic(quiz.topic);

    // Don't create duplicates: skip if same title already exists in this topic.
    const { data: dupe } = await supabase
      .from("quizzes")
      .select("id")
      .eq("topic_id", topicId)
      .eq("title", quiz.title)
      .maybeSingle();
    if (dupe) {
      console.log(`  - "${quiz.title}" already exists — skipped. (Delete it in Supabase to re-import.)`);
      skipped++;
      continue;
    }

    const { data: q, error: qErr } = await supabase
      .from("quizzes")
      .insert({
        topic_id: topicId,
        title: quiz.title,
        description: quiz.description ?? "",
        duration_minutes: quiz.durationMinutes ?? 10,
        difficulty: quiz.difficulty ?? "Medium",
        is_active: quiz.active ?? true,
      })
      .select("id")
      .single();
    if (qErr) throw qErr;

    const rows = quiz.questions.map((question, i) => {
      const idx = letterToIndex(question.answer);
      if (idx < 0 || idx >= question.options.length) {
        throw new Error(
          `Bad "answer" (${question.answer}) in quiz "${quiz.title}", question ${i + 1}. ` +
            `Use a letter that matches an option: A, B, C, ...`
        );
      }
      return {
        quiz_id: q.id,
        question_text: question.question,
        options: question.options,
        correct_answer: idx,
        explanation: question.explanation ?? "",
        marks: question.marks ?? 4,
        display_order: i + 1,
      };
    });

    const { error: insErr } = await supabase.from("questions").insert(rows);
    if (insErr) throw insErr;

    console.log(`  + "${quiz.title}" (${quiz.topic}) — ${rows.length} questions added`);
    added++;
  }

  console.log(`\nDone! Added ${added}, skipped ${skipped}. Open /tests on the site to see them.\n`);
}

run().catch((e) => {
  console.error("\nImport failed:", e.message, "\n");
  process.exit(1);
});
