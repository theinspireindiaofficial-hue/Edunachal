import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Layers,
  Sparkles,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTopics, getQuizzesByTopic } from "@/lib/quizStore";

const TEST_URL = "/tests";

// Playable preview questions — a taste of the real thing (no timer, no stakes).
const SAMPLES = [
  {
    topic: "Polity",
    question: "Which article of the Indian Constitution deals with the Right to Constitutional Remedies?",
    options: ["Article 19", "Article 21", "Article 32", "Article 44"],
    correct: 2,
    explain: "Dr. B.R. Ambedkar called Article 32 the 'heart and soul' of the Constitution.",
  },
  {
    topic: "Geography",
    question: "Which is the longest river flowing entirely within India?",
    options: ["Ganga", "Godavari", "Narmada", "Krishna"],
    correct: 1,
    explain: "The Godavari is the longest river that flows entirely within India.",
  },
  {
    topic: "History",
    question: "'Do or Die' was the slogan associated with which movement?",
    options: ["Non-Cooperation", "Civil Disobedience", "Quit India", "Swadeshi"],
    correct: 2,
    explain: "'Do or Die' was Gandhi's call during the Quit India Movement of 1942.",
  },
];

const FALLBACK_TOPICS = ["Polity", "Geography", "History", "Current Affairs"];

const QuizSection = () => {
  const [topicNames, setTopicNames] = useState<string[]>(FALLBACK_TOPICS);
  const [topicCount, setTopicCount] = useState<number | null>(null);
  const [quizCount, setQuizCount] = useState<number | null>(null);

  // Mini-quiz interaction state
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [solved, setSolved] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const topics = await getTopics();
        if (!alive || topics.length === 0) return;
        setTopicNames(topics.map((t) => t.name));
        setTopicCount(topics.length);
        const counts = await Promise.all(topics.map((t) => getQuizzesByTopic(t.id)));
        if (!alive) return;
        setQuizCount(counts.reduce((n, c) => n + c.length, 0));
      } catch {
        // keep fallbacks — the section still looks complete
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const sample = SAMPLES[qi];
  const isLast = qi === SAMPLES.length - 1;
  const answered = picked !== null;
  const correct = picked === sample.correct;

  function pick(i: number) {
    if (answered) return;
    setPicked(i);
    if (i === sample.correct) setSolved((s) => s + 1);
  }

  function next() {
    if (isLast) return;
    setQi((n) => n + 1);
    setPicked(null);
  }

  return (
    <section id="quizzes" className="relative py-16 md:py-24 overflow-hidden">
      <div aria-hidden className="absolute -top-24 left-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full orbital opacity-25" />
      <div aria-hidden className="absolute bottom-0 -right-24 -z-10 h-[22rem] w-[22rem] rounded-full bg-secondary/10 blur-3xl" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative premium-panel ring-grad noise rounded-[2.25rem] p-6 md:p-10"
        >
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* LEFT: copy + topics + CTA */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white"
              >
                <Zap className="h-3.5 w-3.5" /> Free Practice Quizzes
              </motion.div>

              <h2 className="font-display mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.03] tracking-tight">
                <span className="text-gradient">Master every topic,</span>{" "}
                <span className="text-gradient-brand">one quiz at a time.</span>
              </h2>

              <p className="mt-5 text-lg text-subtle-foreground/90 max-w-xl leading-relaxed">
                Bite-sized, exam-grade quizzes across every subject - with instant scoring
                and clear explanations for every answer. New quizzes added regularly. No fees, no login.
              </p>

              {/* Live topic pills */}
              <div className="mt-7">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  <Layers className="h-4 w-4 text-secondary" /> Browse by topic
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {topicNames.map((name, i) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        to={TEST_URL}
                        className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-2 text-sm font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-all"
                      >
                        <BookOpen className="h-3.5 w-3.5 text-secondary" /> {name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="btn-glow rounded-full text-base px-8 h-12 text-white border-0">
                  <Link to={TEST_URL}>
                    Browse all quizzes <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </Button>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Layers className="h-4 w-4 text-secondary" /> {topicCount ?? topicNames.length} topics
                  </span>
                  {quizCount !== null && (
                    <span className="inline-flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-secondary" /> {quizCount} quizzes
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: playable mini-quiz */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="relative glass-strong rounded-[1.75rem] p-5 md:p-6 shadow-soft"
              >
                <div aria-hidden className="absolute -inset-3 -z-10 bg-gradient-primary opacity-20 blur-2xl rounded-[2.25rem]" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary">
                      <BrainCircuit className="h-4 w-4 text-white" />
                    </span>
                    <div>
                      <div className="text-xs text-muted-foreground">Try a few - {sample.topic}</div>
                      <div className="text-sm font-semibold">Question {qi + 1} of {SAMPLES.length}</div>
                    </div>
                  </div>
                  {/* progress dots */}
                  <div className="flex items-center gap-1.5">
                    {SAMPLES.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${i === qi ? "w-5 bg-secondary" : i < qi ? "w-1.5 bg-secondary/60" : "w-1.5 bg-white/15"}`}
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={qi}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="mt-4 text-base font-medium leading-relaxed">{sample.question}</p>

                    <div className="mt-4 space-y-2.5">
                      {sample.options.map((opt, i) => {
                        const chosen = picked === i;
                        const revealCorrect = answered && i === sample.correct;
                        const revealWrong = chosen && i !== sample.correct;
                        return (
                          <button
                            key={i}
                            onClick={() => pick(i)}
                            disabled={answered}
                            className={[
                              "w-full flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-all",
                              !answered ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20" : "cursor-default",
                              revealCorrect ? "border-emerald-400/50 bg-emerald-400/10" : "",
                              revealWrong ? "border-rose-400/50 bg-rose-400/10" : "",
                              answered && !revealCorrect && !revealWrong ? "border-white/10 bg-white/5 opacity-60" : "",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold",
                                revealCorrect ? "bg-emerald-400 text-black" : revealWrong ? "bg-rose-400 text-black" : "bg-white/10 text-foreground",
                              ].join(" ")}
                            >
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {revealCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                            {revealWrong && <XCircle className="h-5 w-5 text-rose-400" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`rounded-2xl border p-4 text-sm ${correct ? "border-emerald-400/40 bg-emerald-400/5" : "border-secondary/40 bg-secondary/5"}`}>
                        <div className="font-semibold mb-1">
                          {correct ? "Correct! Nicely done." : "Not quite - here's why."}
                        </div>
                        <p className="text-muted-foreground">{sample.explain}</p>

                        {isLast ? (
                          <Link
                            to={TEST_URL}
                            className="mt-3 inline-flex items-center gap-1 text-secondary font-semibold hover:underline"
                          >
                            You solved {solved}/{SAMPLES.length} - take a full quiz <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        ) : (
                          <button
                            onClick={next}
                            className="mt-3 inline-flex items-center gap-1 text-secondary font-semibold hover:underline"
                          >
                            Next question <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!answered && (
                  <div className="mt-3 text-center text-xs text-muted-foreground inline-flex w-full items-center justify-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> Pick an answer to see the explanation
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuizSection;
