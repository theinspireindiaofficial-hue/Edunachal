import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, TrendingUp, Trophy, Flame, Target, ShieldCheck, Sparkles, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen pt-32 md:pt-40 pb-20 overflow-hidden">
      {/* Background mesh */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <div aria-hidden className="absolute left-1/2 top-20 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full orbital opacity-20" />
      <div aria-hidden className="absolute -top-24 -left-24 w-[24rem] h-[24rem] rounded-full bg-primary/20 blur-3xl" />
      <div aria-hidden className="absolute top-40 -right-24 w-[22rem] h-[22rem] rounded-full bg-secondary/15 blur-3xl" />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full pl-2 pr-4 py-1.5 text-xs md:text-sm text-subtle-foreground shadow-soft"
            >
              <span className="px-2 py-0.5 rounded-full bg-gradient-primary text-white text-[10px] font-semibold tracking-wide">2026</span>
              Premium rank-prep ecosystem for serious aspirants
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="font-display mt-6 text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.02] tracking-tight"
            >
              <span className="text-gradient">Prepare like the top 1%</span>{" "}
              <span className="text-gradient-brand">rankers train</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-6 text-lg md:text-xl text-subtle-foreground/90 max-w-2xl leading-relaxed"
            >
              A premium learning command center for UPSC, State PCS, SSC, Banking, NEET and JEE:
              elite mentors, adaptive tests, live analytics, and disciplined execution built around your rank.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button asChild size="lg" className="btn-glow rounded-full text-base px-7 h-12 text-white border-0">
                <Link to="/book-call">
                  Book Free Strategy Call <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full h-12 px-6 glass hover:bg-white/10 text-foreground">
                <a href="https://www.youtube.com/watch?v=lZv6N33Jw1Q&list=PLkAy_twSNQD6qoFJR0ty5r4ve1U31hSvw" target="_blank" rel="noopener noreferrer">
                  <PlayCircle className="w-5 h-5 mr-1" /> Watch the experience
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 grid max-w-xl grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <TrustItem icon={<ShieldCheck className="h-4 w-4" />} title="500+ selections" text="across exams" />
              <TrustItem icon={<Sparkles className="h-4 w-4" />} title="AI-grade insights" text="every week" />
              <TrustItem icon={<Clock3 className="h-4 w-4" />} title="Live discipline" text="daily plans" />
            </motion.div>
          </div>

          {/* Mock dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative lg:translate-y-4">
              <div aria-hidden className="absolute -inset-4 bg-gradient-primary opacity-24 blur-2xl rounded-[3rem]" />
              <div aria-hidden className="absolute -right-4 top-10 h-28 w-28 rounded-full border border-white/10" />
              <div aria-hidden className="absolute -right-9 top-5 h-40 w-40 rounded-full border border-white/10" />
              <div className="relative premium-panel ring-grad rounded-[2rem] p-5 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-primary grid place-items-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Aspirant</div>
                      <div className="text-sm font-semibold">Rohan • UPSC CSE</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground glass rounded-full px-3 py-1">Day 187</div>
                </div>

                {/* Score chart */}
                <div className="rounded-2xl bg-white/5 border border-white/5 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium">Performance trajectory</div>
                    <div className="flex items-center gap-1 text-xs text-emerald-400"><TrendingUp className="w-3 h-3" /> +18%</div>
                  </div>
                  <svg viewBox="0 0 320 110" className="w-full h-24">
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(262 83% 58%)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="hsl(262 83% 58%)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,80 C40,70 60,60 100,55 S160,40 200,30 240,18 320,10 L320,110 L0,110 Z" fill="url(#g1)" />
                    <path d="M0,80 C40,70 60,60 100,55 S160,40 200,30 240,18 320,10" fill="none" stroke="hsl(189 94% 63%)" strokeWidth="2.5" />
                    {[[40,70],[100,55],[160,42],[220,28],[280,18]].map(([x,y],i)=>(
                      <circle key={i} cx={x} cy={y} r="3.2" fill="hsl(262 90% 70%)" />
                    ))}
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <Stat icon={<Flame className="w-4 h-4" />} label="Streak" value="42 days" tint="from-amber-500/20 to-amber-500/5" />
                  <Stat icon={<Trophy className="w-4 h-4" />} label="Rank Forecast" value="AIR 318" tint="from-primary/20 to-primary/5" />
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/5 p-4 mt-3">
                  <div className="text-sm font-medium mb-3">Topic mastery</div>
                  <div className="space-y-2.5">
                    {[
                      { t: "Polity", v: 86 },
                      { t: "Geography", v: 72 },
                      { t: "Economy", v: 64 },
                    ].map((row) => (
                      <div key={row.t}>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>{row.t}</span><span className="text-foreground font-semibold">{row.v}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }} whileInView={{ width: `${row.v}%` }} viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-primary"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute -left-2 md:-left-8 bottom-8 glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 shadow-soft"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary to-primary grid place-items-center">
                  <Sparkle />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">AI Insight</div>
                  <div className="text-sm font-semibold">Revise Modern History today</div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -right-1 md:-right-8 top-24 glass rounded-2xl px-4 py-3 shadow-soft"
              >
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Mentor review</div>
                <div className="mt-1 text-sm font-semibold">Weakness map updated</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Sparkle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
  </svg>
);

const TrustItem = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="glass rounded-2xl px-4 py-3">
    <div className="flex items-center gap-2 text-foreground">
      <span className="grid h-7 w-7 place-items-center rounded-xl bg-white/10 text-secondary">{icon}</span>
      <span className="text-sm font-semibold">{title}</span>
    </div>
    <div className="mt-1 text-xs text-muted-foreground">{text}</div>
  </div>
);

const Stat = ({ icon, label, value, tint }: { icon: React.ReactNode; label: string; value: string; tint: string }) => (
  <div className={`rounded-2xl bg-gradient-to-br ${tint} border border-white/5 p-3`}>
    <div className="flex items-center gap-2 text-muted-foreground text-xs">{icon}{label}</div>
    <div className="mt-1 font-display font-bold text-lg">{value}</div>
  </div>
);

export default Hero;
