-- =============================================================
-- ADD A NEW QUIZ  (Edunachal)
-- How to use:
--   1. Supabase -> SQL Editor -> New query -> paste this whole file.
--   2. Edit the values in the two marked sections below.
--   3. Click Run. The quiz appears on the site immediately.
--
-- Rules to remember:
--   * correct_answer is 0-BASED  (0 = first option, 1 = second, ...).
--   * options must be a JSON array of strings:  '["A","B","C","D"]'::jsonb
--   * The quiz shows on the site only when is_active = true (set below).
--   * The topic must already exist. To add a brand-new topic, uncomment
--     the "OPTIONAL: new topic" block.
-- =============================================================

-- ---------- OPTIONAL: create a new topic (skip if it already exists) ----------
-- insert into topics (name, slug, description, display_order, is_active)
-- values ('Economy', 'economy', 'Micro, macro & Indian economy', 5, true)
-- on conflict (slug) do nothing;

-- ---------- 1) THE QUIZ ----------
with new_quiz as (
  insert into quizzes (topic_id, title, description, duration_minutes, difficulty, is_active)
  select
    t.id,
    'Directive Principles',                       -- << quiz title
    'DPSP: Articles 36-51 and their significance.',-- << short description
    10,                                            -- << duration in minutes
    'Medium',                                      -- << Easy | Medium | Hard
    true                                           -- << true = publish now
  from topics t
  where t.slug = 'polity'                          -- << TOPIC slug to attach to
  returning id
)

-- ---------- 2) THE QUESTIONS ----------
-- Add or remove "select ..." blocks (each separated by "union all").
-- Columns: question_text, options(jsonb), correct_answer(0-based), explanation, marks, display_order
insert into questions (quiz_id, question_text, options, correct_answer, explanation, marks, display_order)
select id, 'Which part of the Constitution contains the Directive Principles of State Policy?',
       '["Part III","Part IV","Part IVA","Part V"]'::jsonb, 1,
       'DPSP are contained in Part IV (Articles 36-51) of the Constitution.', 4, 1 from new_quiz
union all
select id, 'Directive Principles of State Policy are:',
       '["Justiciable","Non-justiciable","Fundamental Rights","Preamble clauses"]'::jsonb, 1,
       'Unlike Fundamental Rights, DPSP are non-justiciable - not enforceable by courts.', 4, 2 from new_quiz
union all
select id, 'The concept of DPSP was borrowed from the constitution of:',
       '["USA","Ireland","Britain","Canada"]'::jsonb, 1,
       'The idea of Directive Principles was borrowed from the Irish Constitution.', 4, 3 from new_quiz;

-- Done. Check Table Editor -> quizzes / questions, then open /tests on the site.
