import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock3, Layers, Loader2, Trophy } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { getTopics, getQuizzesByTopic } from "@/lib/quizStore";
import type { Topic, Quiz } from "@/data/quizTypes";

type TopicWithQuizzes = Topic & { quizzes: Quiz[] };

const difficultyTint: Record<string, string> = {
  Easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Hard: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const Tests = () => {
  const [data, setData] = useState<TopicWithQuizzes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const topics = await getTopics();
        const withQuizzes = await Promise.all(
          topics.map(async (t) => ({ ...t, quizzes: await getQuizzesByTopic(t.id) }))
        );
        if (alive) setData(withQuizzes.filter((t) => t.quizzes.length > 0));
      } catch (e) {
        if (alive) setError("Couldn't load the tests. Please refresh in a moment.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const totalQuizzes = data.reduce((n, t) => n + t.quizzes.length, 0);

  return (
    <Layout
      title="Free Practice Tests"
      description="Topic-wise practice quizzes and the Edunachal Open Scholarship Test. Free for everyone, instant results."
    >
      <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-40" />
        <div aria-hidden className="absolute left-1/2 top-16 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full orbital opacity-20" />

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full pl-2 pr-4 py-1.5 text-xs md:text-sm text-subtle-foreground"
          >
            <span className="px-2 py-0.5 rounded-full bg-gradient-primary text-white text-[10px] font-semibold tracking-wide">FREE</span>
            Topic-wise practice tests • Instant results
          </motion.div>

          <h1 className="font-display mt-6 text-4xl md:text-6xl font-extrabold leading-[1.03] tracking-tight max-w-3xl">
            <span className="text-gradient">Pick a topic.</span>{" "}
            <span className="text-gradient-brand">Test your mastery.</span>
          </h1>
          <p className="mt-5 text-lg text-subtle-foreground/90 max-w-2xl leading-relaxed">
            Bite-sized, exam-grade quizzes across every subject — with instant scoring,
            detailed explanations, and a shot at Edunachal scholarships. No fees, no login.
          </p>

          {!loading && !error && (
            <div className="mt-8 flex flex-wrap gap-3">
              <Stat icon={<Layers className="h-4 w-4" />} label={`${data.length} topics`} />
              <Stat icon={<BookOpen className="h-4 w-4" />} label={`${totalQuizzes} quizzes`} />
              <Stat icon={<Trophy className="h-4 w-4" />} label="Scholarship eligible" />
            </div>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          {loading && (
            <div className="flex items-center justify-center gap-3 py-24 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" /> Loading tests…
            </div>
          )}

          {error && (
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">{error}</div>
          )}

          {!loading && !error && data.length === 0 && (
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
              No tests are live yet. Please check back soon.
            </div>
          )}

          <div className="space-y-14">
            {data.map((topic, ti) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: ti * 0.05 }}
              >
                <div className="flex items-end justify-between gap-4 mb-5">
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold">{topic.name}</h2>
                    {topic.description && (
                      <p className="mt-1 text-sm text-muted-foreground">{topic.description}</p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground glass rounded-full px-3 py-1 whitespace-nowrap">
                    {topic.quizzes.length} quiz{topic.quizzes.length > 1 ? "zes" : ""}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topic.quizzes.map((quiz) => (
                    <Link
                      key={quiz.id}
                      to={`/tests/${quiz.id}`}
                      className="group premium-panel ring-grad rounded-2xl p-5 flex flex-col transition-transform hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${difficultyTint[quiz.difficulty] ?? difficultyTint.Medium}`}>
                          {quiz.difficulty}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock3 className="h-3.5 w-3.5" /> {quiz.durationMinutes} min
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold leading-snug">{quiz.title}</h3>
                      {quiz.description && (
                        <p className="mt-2 text-sm text-muted-foreground flex-grow">{quiz.description}</p>
                      )}
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-secondary group-hover:gap-2 transition-all">
                        Start quiz <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

const Stat = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-subtle-foreground">
    <span className="text-secondary">{icon}</span> {label}
  </span>
);

export default Tests;
