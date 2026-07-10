-- =============================================================
-- Edunachal Open Test — Supabase schema, security & seed data
-- Run this once in the Supabase SQL Editor (SQL Editor -> New query -> paste -> Run).
-- Safe to re-run: it drops and recreates the tables.
-- =============================================================

-- ---------- Clean slate (comment out if you want to keep data) ----------
drop table if exists submissions cascade;
drop table if exists questions cascade;
drop table if exists quizzes cascade;
drop table if exists topics cascade;

-- ---------- Tables ----------
create table topics (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text unique not null,
  description   text,
  display_order int  not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

create table quizzes (
  id               uuid primary key default gen_random_uuid(),
  topic_id         uuid not null references topics(id) on delete cascade,
  title            text not null,
  description      text,
  duration_minutes int  not null default 10,
  difficulty       text not null default 'Medium',   -- Easy | Medium | Hard
  is_active        boolean not null default false,   -- keep off while drafting
  created_at       timestamptz not null default now()
);

create table questions (
  id             uuid primary key default gen_random_uuid(),
  quiz_id        uuid not null references quizzes(id) on delete cascade,
  question_text  text not null,
  options        jsonb not null,            -- e.g. ["A","B","C","D"]
  correct_answer int  not null,             -- 0-based index into options
  explanation    text,
  marks          int  not null default 4,
  display_order  int  not null default 0
);

create table submissions (
  id            uuid primary key default gen_random_uuid(),
  quiz_id       uuid references quizzes(id) on delete set null,
  student_name  text not null,
  student_email text not null,
  student_phone text,
  student_class text,
  answers       jsonb,
  score         int,
  total_marks   int,
  percentile    numeric,
  submitted_at  timestamptz not null default now()
);

-- Helpful indexes
create index on quizzes (topic_id);
create index on questions (quiz_id);
create index on submissions (quiz_id);

-- ---------- Row Level Security ----------
alter table topics       enable row level security;
alter table quizzes      enable row level security;
alter table questions    enable row level security;
alter table submissions  enable row level security;

-- Public (anon) may READ only active topics/quizzes and their questions.
create policy "read active topics"
  on topics for select using (is_active = true);

create policy "read active quizzes"
  on quizzes for select using (is_active = true);

create policy "read questions of active quizzes"
  on questions for select
  using (quiz_id in (select id from quizzes where is_active = true));

-- Public (anon) may only INSERT submissions — never read/edit/delete them.
create policy "insert submissions"
  on submissions for insert with check (true);

-- =============================================================
-- SEED DATA (optional starter content — delete/replace anytime)
-- =============================================================
with t as (
  insert into topics (name, slug, description, display_order) values
    ('Polity',          'polity',          'Constitution, governance & rights',        1),
    ('Geography',       'geography',       'Physical, Indian & world geography',        2),
    ('History',         'history',         'Ancient, medieval & modern India',          3),
    ('Current Affairs', 'current-affairs', 'Latest national & international events',     4)
  returning id, slug
),
q as (
  insert into quizzes (topic_id, title, description, duration_minutes, difficulty, is_active)
  select id, 'Fundamental Rights', 'Articles 12-35 and landmark cases.', 10, 'Medium', true from t where slug = 'polity'
  union all
  select id, 'Indian Rivers', 'Major river systems of India.', 8, 'Easy', true from t where slug = 'geography'
  union all
  select id, 'Freedom Struggle', 'Key movements & leaders, 1857-1947.', 10, 'Medium', true from t where slug = 'history'
  returning id, title
)
insert into questions (quiz_id, question_text, options, correct_answer, explanation, marks, display_order)
select id, 'Which Article of the Indian Constitution deals with the Right to Constitutional Remedies?',
       '["Article 19","Article 21","Article 32","Article 44"]'::jsonb, 2,
       'Dr. B.R. Ambedkar called Article 32 the ''heart and soul'' of the Constitution.', 4, 1 from q where title = 'Fundamental Rights'
union all
select id, 'Which Article abolishes untouchability?',
       '["Article 15","Article 16","Article 17","Article 18"]'::jsonb, 2,
       'Article 17 abolishes untouchability and forbids its practice in any form.', 4, 2 from q where title = 'Fundamental Rights'
union all
select id, 'Which is the longest river flowing entirely within India?',
       '["Ganga","Godavari","Narmada","Krishna"]'::jsonb, 1,
       'The Godavari is the longest river that flows entirely within India.', 4, 1 from q where title = 'Indian Rivers'
union all
select id, 'The Non-Cooperation Movement was launched in which year?',
       '["1919","1920","1930","1942"]'::jsonb, 1,
       'Mahatma Gandhi launched the Non-Cooperation Movement in 1920.', 4, 1 from q where title = 'Freedom Struggle';

-- Done. You should see rows in Table Editor -> topics / quizzes / questions.
