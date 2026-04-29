import { motion } from "framer-motion";
import { GraduationCap, FlaskConical, BookOpenCheck, Users, MessagesSquare, Trophy, LineChart, CalendarCheck } from "lucide-react";
import { SectionHead } from "./CoursesSection";

const items = [
  { icon: GraduationCap, title: "Expert mentors", desc: "Mentors from IITs, IIMs and top services who've been there." },
  { icon: FlaskConical, title: "Smart test series", desc: "Adaptive tests that target your exact weak topics." },
  { icon: BookOpenCheck, title: "Updated material", desc: "Notes refreshed to the latest pattern and current affairs." },
  { icon: Users, title: "Personal guidance", desc: "1:1 strategy calls and study plans tailored to you." },
  { icon: MessagesSquare, title: "Doubt support", desc: "Sub-2 hour doubt resolution from real mentors, not bots." },
  { icon: Trophy, title: "Proven results", desc: "500+ selections and counting — across categories." },
  { icon: LineChart, title: "Performance analytics", desc: "Live dashboards that translate effort into rank." },
  { icon: CalendarCheck, title: "Consistency tracking", desc: "Streaks, milestones and accountability nudges." },
];

const WhyUs = () => (
  <section id="about" className="relative py-28">
    <div aria-hidden className="absolute inset-0 bg-grid opacity-30 -z-10" />
    <div className="container">
      <SectionHead
        eyebrow="Why Edunachal"
        title={<>An ecosystem <span className="text-gradient-brand">built to win</span></>}
        subtitle="Eight pillars that set serious aspirants apart from the rest."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.05 }}
            whileHover={{ y: -4 }}
            className="premium-panel rounded-3xl p-6 hover:bg-white/[0.07] transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-violet grid place-items-center mb-5">
              <it.icon className="w-5 h-5 text-white" />
            </div>
            <div className="font-display text-lg font-bold">{it.title}</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
