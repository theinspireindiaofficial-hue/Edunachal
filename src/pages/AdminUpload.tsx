import { useState } from "react";
import * as mammoth from "mammoth";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, FileText, Loader2, Lock, UploadCloud } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { parseQuizDoc, type ParsedQuiz } from "@/lib/parseQuizDoc";

type Status = "idle" | "reading" | "ready" | "uploading" | "done" | "error";

const AdminUpload = () => {
  const [password, setPassword] = useState("");
  const [fileName, setFileName] = useState("");
  const [quizzes, setQuizzes] = useState<ParsedQuiz[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const totalQuestions = quizzes.reduce((n, q) => n + q.questions.length, 0);

  async function handleFile(file: File) {
    setStatus("reading");
    setMessage("");
    setQuizzes([]);
    setErrors([]);
    setFileName(file.name);
    try {
      let text = "";
      if (file.name.toLowerCase().endsWith(".docx")) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else {
        text = await file.text(); // .txt fallback
      }
      const parsed = parseQuizDoc(text);
      setQuizzes(parsed.quizzes);
      setErrors(parsed.errors);
      setStatus("ready");
    } catch {
      setStatus("error");
      setMessage("Couldn't read that file. Please upload a .docx (Word) or .txt file.");
    }
  }

  async function handleUpload() {
    if (!password.trim()) {
      setStatus("error");
      setMessage("Please enter the admin password.");
      return;
    }
    setStatus("uploading");
    setMessage("");
    try {
      const res = await fetch("/api/upload-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim(), quizzes }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Upload failed. Please try again.");
        return;
      }
      setStatus("done");
      setMessage(data.message || `Added ${data.added} quiz(zes).`);
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  const canUpload = quizzes.length > 0 && errors.length === 0 && status !== "uploading";

  return (
    <Layout title="Upload Quizzes">
      <section className="pt-28 md:pt-32 pb-20 min-h-screen">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
              <Lock className="h-3.5 w-3.5" /> Admin
            </span>
            <h1 className="font-display mt-5 text-3xl md:text-4xl font-extrabold">Upload quizzes from a Word file</h1>
            <p className="mt-3 text-subtle-foreground/90">
              Pick a filled-in Word document. We'll read it, show you a preview, and publish it to the site.
            </p>

            <div className="premium-panel ring-grad rounded-[2rem] p-6 md:p-8 mt-8 space-y-6">
              {/* Password */}
              <label className="block">
                <span className="text-sm font-medium text-subtle-foreground">Admin password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter the shared admin password"
                  className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm outline-none focus:border-secondary/60 focus:bg-white/10 transition-colors"
                />
              </label>

              {/* File picker */}
              <div>
                <span className="text-sm font-medium text-subtle-foreground">Quiz document (.docx)</span>
                <label className="mt-1.5 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-10 text-center cursor-pointer hover:bg-white/10 transition-colors">
                  <UploadCloud className="h-8 w-8 text-secondary" />
                  <span className="text-sm font-medium">
                    {fileName ? fileName : "Click to choose a Word (.docx) file"}
                  </span>
                  <span className="text-xs text-muted-foreground">or a plain .txt file</span>
                  <input
                    type="file"
                    accept=".docx,.txt"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFile(f);
                    }}
                  />
                </label>
              </div>

              {status === "reading" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Reading the document…
                </div>
              )}

              {/* Preview */}
              {status !== "idle" && status !== "reading" && quizzes.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <FileText className="h-4 w-4 text-secondary" />
                    Found {quizzes.length} quiz{quizzes.length > 1 ? "zes" : ""} · {totalQuestions} questions
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {quizzes.map((qz, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                        <span className="text-foreground font-medium">{qz.title || "(untitled)"}</span>
                        <span>· {qz.topic || "no topic"} · {qz.questions.length} Qs</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Errors */}
              {errors.length > 0 && (
                <div className="rounded-2xl border border-amber-400/40 bg-amber-400/10 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
                    <AlertTriangle className="h-4 w-4" /> Please fix these in the document, then re-upload:
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-amber-200/90 list-disc pl-5">
                    {errors.slice(0, 12).map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Result messages */}
              {status === "done" && (
                <div className="flex items-center gap-2 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-4 text-sm text-emerald-300">
                  <CheckCircle2 className="h-5 w-5" /> {message} It's live on /tests now.
                </div>
              )}
              {status === "error" && message && (
                <div className="flex items-center gap-2 rounded-2xl border border-rose-400/40 bg-rose-400/10 p-4 text-sm text-rose-300">
                  <AlertTriangle className="h-5 w-5" /> {message}
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={!canUpload}
                size="lg"
                className="btn-glow rounded-full text-white border-0 px-8 h-12 disabled:opacity-40"
              >
                {status === "uploading" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Publishing…
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-4 w-4 mr-2" /> Publish quizzes
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminUpload;
