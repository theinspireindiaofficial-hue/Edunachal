import { motion } from "framer-motion";
import { Brain, Compass, Activity, RefreshCcw, Gauge, Zap } from "lucide-react";
import { SectionHead } from "./CoursesSection";

const features = [
  { icon: Compass, title: "Personalized roadmap", desc: "Your goal, time, and gaps — translated into a daily plan." },
  { icon: Brain, title: "Weak topic detection", desc: "We surface what&apos;s holding back your rank. You fix it." },
  { icon: Activity, title: "Daily performance insights", desc: "Effort, accuracy, speed — measured the right way." },
  { icon: RefreshCcw, title: "Smart revision planner", desc: "Spaced repetition so nothing fades from memory." },
  { icon: Gauge, title: "Rank forecast dashboard", desc: "See your projected rank — and the path to improve it." },
  { icon: Zap, title: "Productivity tracker", desc: "Deep work sessions, streaks, and weekly reviews." },
];

const SmartLearning = () => (
  <section className="relative py-28">
    <div aria-hidden className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <div className="container">
      <SectionHead
        eyebrow="Smart Learning OS"
        title={<>An <span className="text-gradient-brand">AI-grade</span> layer over your prep</>}
        subtitle="Beautiful dashboards. Real signals. Zero noise."
      />

      <div className="mt-14 grid lg:grid-cols-12 gap-5">
        {/* Big featured panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="lg:col-span-7 glass-strong ring-grad rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div aria-hidden className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Today&apos;s plan</div>
          <h3 className="font-display text-2xl md:text-3xl font-bold mt-2">Your rank, modeled in real-time.</h3>
          <p className="text-muted-foreground mt-2 max-w-xl">Every test, every revision, every minute — turned into a forecast you can actually trust.</p>

          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { k: "Hours", v: "4.2h", sub: "deep work" },
              { k: "Accuracy", v: "78%", sub: "this week" },
              { k: "Forecast", v: "AIR 318", sub: "↑ 24" },
            ].map((m) => (
              <div key={m.k} className="rounded-2xl bg-white/5 border border-white/5 p-4">
                <div className="text-xs text-muted-foreground">{m.k}</div>
                <div className="font-display text-2xl font-bold mt-1">{m.v}</div>
                <div className="text-xs text-emerald-400 mt-0.5">{m.sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-white/5 border border-white/5 p-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span>Weekly trajectory</span>
              <span>Mon — Sun</span>
            </div>
            <div className="flex items-end gap-2 h-28">
              {[35,52,46,68,72,58,82].map((h,i)=>(
                <motion.div
                  key={i}
                  initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i*0.06, ease: "easeOut" }}
                  className="flex-1 rounded-md bg-gradient-to-t from-primary/60 to-secondary/60"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Feature stack */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i*0.05 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-5 hover:bg-white/[0.07]"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-primary grid place-items-center mb-3">
                <f.icon className="w-4 h-4 text-white" />
              </div>
              <div className="font-semibold">{f.title}</div>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed" dangerouslySetInnerHTML={{ __html: f.desc.replace("&apos;","'") }} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SmartLearning;
