# How to add quizzes

Adding quizzes takes two things: **edit one file**, then **run one command**. No SQL, no database screens.

## One-time setup (do this once)

1. In Supabase, go to **Project Settings → API** and copy the **`service_role`** key (the secret one).
2. In the project folder, make a copy of `.env.local.example` and rename it to `.env.local`.
3. Open `.env.local` and paste your key after `SUPABASE_SERVICE_KEY=`.
4. Install packages once: `npm install`.

That's it. You won't touch this again.

## Adding quizzes (every time)

1. Open **`content/quizzes.json`**.
2. Copy one of the existing quiz blocks and change the words. Each quiz has:
   - `topic` — the subject (e.g. "Polity"). If the topic is new, it's created automatically.
   - `title`, `description`, `difficulty` ("Easy" / "Medium" / "Hard"), `durationMinutes`.
   - `questions` — a list. For each: the `question`, four `options`, the correct `answer` as a **letter** (A = first option, B = second, and so on), and an `explanation`.
3. Save the file.
4. Run: **`npm run import:quizzes`**

The quizzes appear on the site at **/tests** immediately. That's the whole process.

## A tiny example

```json
{
  "topic": "History",
  "title": "Freedom Struggle",
  "description": "Key movements, 1857-1947.",
  "difficulty": "Medium",
  "durationMinutes": 10,
  "questions": [
    {
      "question": "The Non-Cooperation Movement was launched in which year?",
      "options": ["1919", "1920", "1930", "1942"],
      "answer": "B",
      "explanation": "Gandhi launched it in 1920."
    }
  ]
}
```

`"answer": "B"` means the second option (1920) is correct. You never deal with numbers or indexes.

## Good to know

- **No duplicates:** if a quiz with the same title already exists in that topic, the import skips it. To re-import a changed quiz, delete that quiz in the Supabase **Table Editor** first, then run the command again.
- **Hide a quiz without deleting:** in the Supabase **Table Editor**, open the `quizzes` table and set that quiz's `is_active` to `false`. Set it back to `true` to show it again.
- **Nothing is ever shipped with your secret key** — it lives only in `.env.local`, which is never committed and never sent to the website.

## For the next developer

- Editable content: `content/quizzes.json`
- Import script: `scripts/import-quizzes.mjs` (Node, uses `@supabase/supabase-js`)
- Command: `npm run import:quizzes` (defined in `package.json`)
- The site reads/writes the database through one file: `src/lib/quizStore.ts`.
- Database schema and security live in `supabase-setup.sql`.
