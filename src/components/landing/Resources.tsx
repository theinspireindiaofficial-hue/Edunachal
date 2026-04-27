import { motion } from "framer-motion";
import { Newspaper, FileText, BookMarked, Lightbulb, Youtube, ListChecks, ArrowUpRight } from "lucide-react";
import { SectionHead } from "./CoursesSection";

const items = [
  { icon: Newspaper, title: "Daily Current Affairs", tag: "Daily", desc: "Crisp, exam-ready briefings every morning." },
  { icon: FileText, title: "Free Notes Library", tag: "Library", desc: "Subject-wise, pattern-aligned, regularly updated." },
  { icon: BookMarked, title: "Previous Year Papers", tag: "Archive", desc: "Solved papers with mentor commentary." },
  { icon: Lightbulb, title: "Strategy Blogs", tag: "Insights", desc: "How toppers think — broken down weekly." },
  { icon: Youtube, title: "YouTube Sessions", tag: "Live", desc: "Free masterclasses with our top faculty." },
  { icon: ListChecks, title: "Mock Quizzes", tag: "Practice", desc: "Bite-size quizzes that build muscle memory." },
];

const Resources = () => (
  <section id="resources" className="relative py-28">
    <div className="container">
      <SectionHead
        eyebrow="Free Resources"
        title={<>An ecosystem of <span className="text-gradient-brand">free, premium learning</span></>}
        subtitle="Value first. We give away what others charge for."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
        {items.map((r, i) => (
          <motion.a
            key={r.title}
            href="#"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: (i%3)*0.06 }}
            whileHover={{ y: -4 }}
            className="group glass rounded-3xl p-6 flex items-start gap-4 hover:bg-white/[0.07]"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-violet grid place-items-center shrink-0">
              <r.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="font-display font-bold">{r.title}</div>
                <span className="text-[10px] uppercase tracking-wider text-accent/90 px-2 py-0.5 rounded-full border border-accent/30">{r.tag}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{r.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
                Open <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default Resources;
