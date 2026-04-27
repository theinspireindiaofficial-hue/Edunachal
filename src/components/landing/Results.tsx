import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHead } from "./CoursesSection";

const stories = [
  { name: "Ananya Sharma", exam: "UPSC CSE 2024", rank: "AIR 87", quote: "The structured weekly plans + analytics turned my chaotic prep into a system. I always knew what to do next." },
  { name: "Rohit Verma", exam: "IIT-JEE Adv", rank: "AIR 412", quote: "Problem-first learning made physics click. The mentors don&apos;t just teach — they coach." },
  { name: "Pooja Nair", exam: "SBI PO", rank: "Selected", quote: "Daily mocks and personalised feedback closed every gap. Cleared on first attempt." },
  { name: "Tenzin Dorjee", exam: "APSC", rank: "Top 50", quote: "Regional focus + national-grade mentorship is a rare combo. Edunachal nailed it." },
  { name: "Sara Khan", exam: "NEET UG", rank: "AIR 1,204", quote: "Weak topic detection saved months. I revised what mattered, not what was easy." },
  { name: "Vikram Singh", exam: "RBI Grade B", rank: "Selected", quote: "Premium feel, world-class content. Felt like prep for a championship — not an exam." },
];

const Results = () => (
  <section id="results" className="relative py-28">
    <div className="container">
      <SectionHead
        eyebrow="Results"
        title={<>Stories that prove <span className="text-gradient-brand">the system works</span></>}
        subtitle="Real aspirants. Real ranks. Real transformations."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
        {stories.map((s, i) => (
          <motion.article
            key={s.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.06 }}
            whileHover={{ y: -6 }}
            className="group relative glass-strong ring-grad rounded-3xl p-6 overflow-hidden"
          >
            <div aria-hidden className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-secondary/20 blur-3xl opacity-0 group-hover:opacity-100 transition" />
            <Quote className="w-7 h-7 text-primary/70" />
            <p className="mt-3 text-base text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.quote.replace("&apos;", "'") }} />
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-primary grid place-items-center font-display font-bold">
                  {s.name.split(" ").map(n=>n[0]).slice(0,2).join("")}
                </div>
                <div>
                  <div className="font-semibold text-sm">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.exam}</div>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-gradient-primary text-white font-semibold">{s.rank}</span>
            </div>
            <div className="mt-4 flex items-center gap-0.5 text-accent">
              {Array.from({length:5}).map((_,i)=>(<Star key={i} className="w-3.5 h-3.5 fill-current" />))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Results;
