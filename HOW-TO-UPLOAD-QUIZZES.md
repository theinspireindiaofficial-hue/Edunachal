# How to upload quizzes (Word document)

The easy way, for anyone — no code, no commands. Fill a Word file, upload it, done.

## For the person adding quizzes

1. Open **`Quiz-Upload-Template.docx`** and follow the layout (it has examples).
   - `Topic:` the subject · `Quiz:` the quiz name · `Difficulty:` Easy/Medium/Hard · `Duration:` minutes.
   - Number each question. List choices as `A)` `B)` `C)` `D)`.
   - `Answer:` the correct letter · `Explanation:` (optional).
   - To add another quiz, start again from a new `Topic:` / `Quiz:` block.
2. Save the file.
3. Go to **yoursite.com/admin/upload**, enter the **admin password**, and choose your Word file.
4. You'll see a preview ("Found 2 quizzes · 15 questions"). If anything's wrong, it tells you exactly what to fix.
5. Click **Publish quizzes**. They appear on **/tests** immediately.

That's the whole job. You never touch the database or any code.

## One-time technical setup (developer, done once)

The upload page talks to a small secure function that needs three secrets, set as
**Environment Variables in Vercel** (Project → Settings → Environment Variables):

| Variable | Value |
|---|---|
| `SUPABASE_URL` | `https://mmsyicktcybmvxjkejpw.supabase.co` |
| `SUPABASE_SERVICE_KEY` | Supabase → Project Settings → API → **service_role** (secret) key |
| `ADMIN_UPLOAD_PASSWORD` | Any password you choose — this is what admins type on the page |

After setting them, redeploy. Also run `npm install` once (a new package, `mammoth`, was added for reading Word files).

**Note:** the upload endpoint (`/api/upload-quiz`) runs on Vercel. It works on your live
site and on Vercel preview deployments, but **not** under a plain local `npm run dev`
(Vite doesn't run serverless functions). To test locally, use `vercel dev`.

## Security

- The `service_role` key and the admin password live only in Vercel's server
  environment — they are never included in the website code sent to browsers.
- The public site still uses the safe publishable key, which can only read active
  quizzes and record student submissions.

## For the next developer

- Word template: `Quiz-Upload-Template.docx`
- Upload page: `src/pages/AdminUpload.tsx` (route `/admin/upload`)
- Document parser: `src/lib/parseQuizDoc.ts` (pure function — easy to unit test)
- Secure insert endpoint: `api/upload-quiz.js` (Vercel serverless, uses service key)
- Alternative for developers: `content/quizzes.json` + `npm run import:quizzes`
- Database schema/security: `supabase-setup.sql`
