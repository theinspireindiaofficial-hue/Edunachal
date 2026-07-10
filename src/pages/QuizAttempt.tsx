import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Loader2,
  RotateCcw,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { getQuiz, getQuestions, saveSubmission } from "@/lib/quizStore";
import type { Quiz, QuizQuestion, Registration } from "@/data/quizTypes";

type Phase = "loading" | "notfound" | "register" | "quiz" | "result";

// Randomize option order so answer position is never predictable across
// attempts. We remap correctAnswer to its new index in the shuffled array.
function shuffleQuestion(q: QuizQuestion): QuizQuestion {
  const order = q.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    correctAnswer: order.indexOf(q.correctAnswer),
  };
}

const QuizAttempt = () => {
  const { quizId = "" } = useParams();

  const [phase, setPhase] = useState<Phase>("loading");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const [reg, setReg] = useState<Registration>({ name: "", email: "", phone: "", studentClass: "" });
  const [regError, setRegError] = useState<string | null>(null);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [saving, setSaving] = useState(false);
  const submittedRef = useRef(false);

  // Load quiz + questions
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const q = await getQuiz(quizId);
        if (!q) {
          if (alive) setPhase("notfound");
          return;
        }
        const qs = await getQuestions(quizId);
        if (!alive) return;
        setQuiz(q);
        setQuestions(qs.map(shuffleQuestion));
        setTimeLeft(q.durationMinutes * 60);
        setPhase("register");
      } catch {
        if (alive) setPhase("notfound");
      }
    })();
    return () => {
      alive = false;
    };
  }, [quizId]);

  // Timer during quiz
  useEffect(() => {
    if (phase !== "quiz") return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timeLeft]);

  const totalMarks = useMemo(() => questions.reduce((s, q) => s + q.marks, 0), [questions]);

  const results = useMemo(() => {
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    questions.forEach((q) => {
      const a = answers[q.id];
      if (a === undefined) return;
      if (a === q.correctAnswer) {
        score += q.marks;
        correct += 1;
      } else {
        incorrect += 1;
      }
    });
    const attempted = correct + incorrect;
    const accuracy = attempted ? Math.round((correct / attempted) * 100) : 0;
    const percentile = totalMarks ? Math.round((score / totalMarks) * 100) : 0;
    return { score, correct, incorrect, attempted, accuracy, percentile };
  }, [answers, questions, totalMarks]);

  function startQuiz() {
    const name = reg.name.trim();
    const email = reg.email.trim();
    const phone = reg.phone.trim();
    if (!name || !email || !phone) {
      setRegError("Please fill your name, email and phone to begin.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setRegError("Please enter a valid email address.");
      return;
    }
    if (!/^[0-9+\-\s]{7,15}$/.test(phone)) {
      setRegError("Please enter a valid phone number.");
      return;
    }
    setRegError(null);
    setPhase("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setPhase("result");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Compute final numbers directly (results memo may lag a tick).
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) score += q.marks;
    });
    const percentile = totalMarks ? Math.round((score / totalMarks) * 100) : 0;

    setSaving(true);
    try {
      await saveSubmission({
        quizId,
        student: {
          name: reg.name.trim(),
          email: reg.email.trim(),
          phone: reg.phone.trim(),
          studentClass: reg.studentClass?.trim() || undefined,
        },
        answers,
        score,
        totalMarks,
        percentile,
        submittedAt: new Date().toISOString(),
      });
    } catch {
      // Non-blocking: the student still sees their result even if the save fails.
    } finally {
      setSaving(false);
    }
  }

  // ---------- LOADING / NOT FOUND ----------
  if (phase === "loading") {
    return (
      <Layout title="Loading test">
        <div className="flex items-center justify-center gap-3 min-h-[60vh] text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading test…
        </div>
      </Layout>
    );
  }

  if (phase === "notfound" || !quiz) {
    return (
      <Layout title="Test not found">
        <div className="container min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 pt-32">
          <h1 className="font-display text-3xl font-bold">This test isn't available</h1>
          <p className="text-muted-foreground">It may have been unpublished or the link is incorrect.</p>
          <Button asChild className="btn-glow rounded-full text-white border-0">
            <Link to="/tests">Browse all tests</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <Layout title={quiz.title}>
      <section className="pt-28 md:pt-32 pb-20 min-h-screen">
        <div className="container max-w-4xl">
          {/* REGISTER */}
          {phase === "register" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Link to="/tests" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
                <ChevronLeft className="h-4 w-4" /> All tests
              </Link>
              <div className="premium-panel ring-grad rounded-[2rem] p-6 md:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
                  <Target className="h-3.5 w-3.5" /> {quiz.difficulty} • {quiz.durationMinutes} min
                </span>
                <h1 className="font-display mt-5 text-3xl md:text-4xl font-extrabold">{quiz.title}</h1>
                {quiz.description && <p className="mt-3 text-subtle-foreground/90">{quiz.description}</p>}

                <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                  <MiniStat label="Questions" value={String(questions.length)} />
                  <MiniStat label="Marks" value={String(totalMarks)} />
                  <MiniStat label="Time" value={`${quiz.durationMinutes}m`} />
                </div>

                <div className="mt-8 border-t border-white/10 pt-8">
                  <h2 className="font-display text-lg font-bold">Enter your details to begin</h2>
                  <p className="text-sm text-muted-foreground mt-1">Your score and scholarship eligibility are linked to these.</p>

                  <div className="mt-5 grid sm:grid-cols-2 gap-4">
                    <Field label="Full name *" value={reg.name} onChange={(v) => setReg({ ...reg, name: v })} placeholder="e.g. Rohan Sharma" />
                    <Field label="Phone *" value={reg.phone} onChange={(v) => setReg({ ...reg, phone: v })} placeholder="10-digit mobile" />
                    <Field label="Email *" value={reg.email} onChange={(v) => setReg({ ...reg, email: v })} placeholder="you@email.com" />
                    <Field label="Class / Target exam" value={reg.studentClass ?? ""} onChange={(v) => setReg({ ...reg, studentClass: v })} placeholder="e.g. UPSC 2027" />
                  </div>

                  {regError && <p className="mt-4 text-sm text-rose-400">{regError}</p>}

                  <Button onClick={startQuiz} size="lg" className="btn-glow rounded-full text-white border-0 mt-6 px-8 h-12">
                    Start Test <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* QUIZ */}
          {phase === "quiz" && (
            <div>
              <div className="sticky top-20 z-20 mb-6 glass-strong rounded-2xl px-4 py-3 flex items-center justify-between">
                <div className="text-sm font-semibold truncate pr-3">{quiz.title}</div>
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold tabular-nums ${timeLeft <= 30 ? "bg-rose-500/20 text-rose-300" : "glass"}`}>
                  <Clock className="h-4 w-4" /> {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
                </div>
              </div>

              <QuestionCard
                q={questions[current]}
                index={current}
                total={questions.length}
                selected={answers[questions[current].id]}
                onSelect={(i) => setAnswers((a) => ({ ...a, [questions[current].id]: i }))}
              />

              {/* Navigator */}
              <div className="mt-6 flex flex-wrap gap-2">
                {questions.map((q, i) => {
                  const done = answers[q.id] !== undefined;
                  const active = i === current;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrent(i)}
                      className={`h-9 w-9 rounded-lg text-sm font-semibold transition-colors ${
                        active
                          ? "bg-gradient-primary text-white"
                          : done
                          ? "bg-secondary/20 text-secondary border border-secondary/30"
                          : "glass text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <Button
                  variant="ghost"
                  className="rounded-full glass"
                  disabled={current === 0}
                  onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                </Button>

                {current < questions.length - 1 ? (
                  <Button className="btn-glow rounded-full text-white border-0" onClick={() => setCurrent((c) => c + 1)}>
                    Next <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button className="btn-glow rounded-full text-white border-0" onClick={handleSubmit}>
                    Submit Test <CheckCircle2 className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* RESULT */}
          {phase === "result" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="premium-panel ring-grad rounded-[2rem] p-6 md:p-10 text-center">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-primary grid place-items-center">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h1 className="font-display mt-5 text-3xl md:text-4xl font-extrabold">
                  You scored <span className="text-gradient-brand">{results.score}</span> / {totalMarks}
                </h1>
                <p className="mt-2 text-subtle-foreground/90">
                  {results.percentile >= 80
                    ? "Outstanding — you're scholarship material! 🎯"
                    : results.percentile >= 50
                    ? "Solid effort. A little polish and you're there."
                    : "Good start — review the answers below and try again."}
                </p>

                <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <MiniStat label="Correct" value={String(results.correct)} tone="emerald" />
                  <MiniStat label="Incorrect" value={String(results.incorrect)} tone="rose" />
                  <MiniStat label="Accuracy" value={`${results.accuracy}%`} />
                  <MiniStat label="Score" value={`${results.percentile}%`} />
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Button asChild className="btn-glow rounded-full text-white border-0">
                    <Link to="/tests">Try another topic <ArrowRight className="h-4 w-4 ml-1" /></Link>
                  </Button>
                  <Button variant="ghost" className="rounded-full glass" onClick={() => window.location.reload()}>
                    <RotateCcw className="h-4 w-4 mr-1" /> Retake
                  </Button>
                </div>

                <div className="mt-4 text-xs text-muted-foreground inline-flex items-center gap-1.5">
                  {saving ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving your result…
                    </>
                  ) : (
                    <>
                      <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" /> Result recorded — our team may reach out about scholarships.
                    </>
                  )}
                </div>
              </div>

              {/* Review */}
              <h2 className="font-display text-2xl font-bold mt-12 mb-5">Answer review</h2>
              <div className="space-y-4">
                {questions.map((q, i) => {
                  const a = answers[q.id];
                  const correct = a === q.correctAnswer;
                  return (
                    <div key={q.id} className="glass rounded-2xl p-5">
                      <div className="flex items-start gap-3">
                        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${correct ? "bg-emerald-400 text-black" : "bg-rose-400 text-black"}`}>
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium">{q.questionText}</p>
                          <div className="mt-3 space-y-1.5">
                            {q.options.map((opt, oi) => {
                              const isCorrect = oi === q.correctAnswer;
                              const isChosen = oi === a;
                              return (
                                <div
                                  key={oi}
                                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                                    isCorrect
                                      ? "bg-emerald-400/10 text-emerald-300"
                                      : isChosen
                                      ? "bg-rose-400/10 text-rose-300"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {isCorrect ? (
                                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                                  ) : isChosen ? (
                                    <XCircle className="h-4 w-4 shrink-0" />
                                  ) : (
                                    <span className="h-4 w-4 shrink-0" />
                                  )}
                                  {opt}
                                </div>
                              );
                            })}
                          </div>
                          {q.explanation && (
                            <p className="mt-3 text-sm text-muted-foreground border-l-2 border-secondary/40 pl-3">
                              {q.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

const QuestionCard = ({
  q,
  index,
  total,
  selected,
  onSelect,
}: {
  q: QuizQuestion;
  index: number;
  total: number;
  selected: number | undefined;
  onSelect: (i: number) => void;
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={q.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="premium-panel ring-grad rounded-[2rem] p-6 md:p-8"
    >
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Question {index + 1} of {total}</span>
        <span className="glass rounded-full px-3 py-1">+{q.marks} marks</span>
      </div>
      <p className="mt-4 text-lg md:text-xl font-medium leading-relaxed">{q.questionText}</p>
      <div className="mt-6 space-y-3">
        {q.options.map((opt, i) => {
          const chosen = selected === i;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`w-full flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all ${
                chosen
                  ? "border-secondary/60 bg-secondary/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-bold ${chosen ? "bg-gradient-primary text-white" : "bg-white/10"}`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  </AnimatePresence>
);

const Field = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <label className="block">
    <span className="text-sm font-medium text-subtle-foreground">{label}</span>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm outline-none focus:border-secondary/60 focus:bg-white/10 transition-colors"
    />
  </label>
);

const MiniStat = ({ label, value, tone }: { label: string; value: string; tone?: "emerald" | "rose" }) => (
  <div className="glass rounded-xl px-3 py-3 text-center">
    <div className={`font-display text-xl font-bold ${tone === "emerald" ? "text-emerald-400" : tone === "rose" ? "text-rose-400" : ""}`}>{value}</div>
    <div className="mt-0.5 text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
  </div>
);

export default QuizAttempt;
