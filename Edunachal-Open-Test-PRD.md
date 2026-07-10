# Product Requirements Document — Edunachal Open Test Platform

**Product:** In-site topic-wise quiz + Open Scholarship Test
**Owner:** Edunachal (edunachalofficial@gmail.com)
**Status:** Draft v1
**Last updated:** 10 July 2026

---

## 1. Overview

Edunachal will host its own quizzes and scholarship test directly on edunachal.org, replacing the temporary Google Form. Students browse quizzes by topic, take them in the browser with a timer and instant results, and every attempt is captured as a lead. Quizzes are stored in a managed database (Supabase) so the team can add, edit, publish, or retire them over time without any code changes or site redeploys.

The first surface is the **Open Scholarship Test** section already added below the homepage hero. It becomes the entry point into the wider topic-wise quiz library.

---

## 2. Goals & non-goals

### Goals
- Keep the entire test experience on edunachal.org — no external forms, no leaving the site.
- Support **many quizzes**, organized **by topic**, that are **updated frequently**.
- Capture every participant as a lead (name, email, phone, class/exam) plus their score.
- Give students an instant, engaging result (score, percentile, answer review).
- Let non-developers add and manage quizzes without a deploy.
- Run at effectively zero cost initially, with a clear, cheap scaling path.

### Non-goals (v1)
- No student login/accounts or saved history across sessions.
- No payments or paid tests.
- No automated anti-cheat / proctoring (basic timer + single-attempt-by-honor only).
- No custom-built admin UI — quizzes are managed in the Supabase dashboard.
- No automated scholarship-award emails (team reviews submissions manually in v1).

---

## 3. Users

- **Aspirants / students** — take the open test and topic-wise quizzes; want a fast, credible, rewarding experience.
- **Edunachal team (admin)** — add and update quizzes, review submissions, identify top scorers and leads.

---

## 4. Key decisions (locked)

| Decision | Choice | Rationale |
|---|---|---|
| Where the test lives | On edunachal.org (in-site) | Keeps students on-site, on-brand; no Google Form |
| Backend | Supabase (managed Postgres + API) | No server to build or maintain; free tier fits |
| Quiz storage | In the database (not code) | Update quizzes live without redeploys |
| Quiz management | Supabase dashboard (table editor) | Fastest to ship, zero extra build |
| Test engine | Reuse existing MockTest engine | Timer, scoring, review already built |

---

## 5. How it works (end to end)

1. Student clicks **"Take the Free Test"** in the homepage scholarship section and enters the in-site test area (e.g. `/tests`).
2. They browse by **topic** (Polity, Geography, History, Current Affairs, etc.), pick a topic, and see the **quizzes available** in it.
3. They choose a quiz and complete a short **registration step** (name, email, phone, class/exam).
4. The **quiz runs in the browser** using the existing engine: questions load from Supabase, a timer counts down, and the test auto-submits when time ends.
5. On submit, the browser computes the score and **saves one record to Supabase** — the student's details, their answers, the score, the quiz taken, and a timestamp.
6. The student **instantly sees results** — score, percentile, correct answers, and explanations.
7. The **team reviews submissions** in the Supabase dashboard (grid view, filter/sort, export to CSV) to find top scorers and follow up on scholarships.

---

## 6. Data model

Four linked tables in Supabase:

- **topics** — `id`, `name`, `slug`, `description`, `display_order`, `is_active`
- **quizzes** — `id`, `topic_id` (→ topics), `title`, `description`, `duration_minutes`, `difficulty`, `is_active`, `created_at`
- **questions** — `id`, `quiz_id` (→ quizzes), `question_text`, `options` (list), `correct_answer`, `explanation`, `marks`, `display_order`
- **submissions** — `id`, `quiz_id` (→ quizzes), `student_name`, `student_email`, `student_phone`, `student_class`, `answers`, `score`, `total_marks`, `percentile`, `submitted_at`

The `is_active` flags let the team prepare quizzes quietly and publish/retire them without deleting historical submissions.

---

## 7. Security

- The site uses Supabase's **public (anon) key**, which is safe to ship in frontend code.
- **Row Level Security** restricts that key to: **read** active topics/quizzes/questions, and **insert** submissions only. It cannot read other students' submissions or edit/delete anything.
- Correct answers are needed client-side to score instantly; if answer-leak or score-tampering becomes a concern at scale, scoring can be moved to a Supabase edge function (post-v1 enhancement).

---

## 8. Admin workflow (managing quizzes over time)

Handled entirely in the Supabase dashboard table editor:

1. Add a row to **topics** for a new subject (or reuse an existing one).
2. Add a row to **quizzes** under that topic, set duration/difficulty, leave `is_active` off while drafting.
3. Add rows to **questions** for that quiz (text, options, correct answer, explanation).
4. Flip the quiz's `is_active` to on — it appears on the site instantly.
5. To edit or retire: change any field, or turn `is_active` off. No deploy needed.

A short illustrated how-to guide will be delivered with the build.

---

## 9. Cost

- **Free tier — $0/month.** 500 MB database, up to 50,000 monthly active users. Quizzes and submissions are tiny text records; this comfortably supports dozens of topics, hundreds of questions, and thousands of submissions.
- **Auto-pause caveat:** a free project sleeps after 7 days with no requests; resume is one click (or a small scheduled ping keeps it awake). Live traffic generally prevents this.
- **Pro — $25/month.** Adds daily backups, no auto-pause, more headroom. Recommended once the test is running seriously.
- **No change to hosting** — the site stays on Vercel as-is. No per-submission or per-form fees.

---

## 10. Success metrics

- Number of test/quiz submissions per week.
- Leads captured (unique students with contact details).
- Quiz completion rate (started vs. submitted).
- Number of active quizzes and topics published.
- Repeat participation across topics.

---

## 11. Milestones

1. **Frontend build** — topic browse, quiz list, registration, quiz engine, results; runs immediately with stubbed data. *(No dependency on Supabase.)*
2. **Supabase setup** — create free project, run provided SQL to create tables + security rules.
3. **Wire live** — connect the site to Supabase with project URL + anon key; quizzes and submissions go live.
4. **Admin enablement** — deliver the how-to guide; team loads the first real topics and quizzes.
5. **Launch** — point the homepage button to the live flow; monitor submissions.
6. **(Optional, later)** — leaderboard, automated result emails, custom admin UI, edge-function scoring.

---

## 12. Open questions

- Single attempt per student per quiz, or unlimited retries?
- Should results show a leaderboard/rank vs. other students, or just the individual's score?
- Which fields are required at registration (is phone mandatory)?
- Fixed scholarship-test window (weekly) vs. always-available quizzes — or both?
- Do we want an automated confirmation email to the student on submission?
