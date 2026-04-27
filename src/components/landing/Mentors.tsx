import { motion } from "framer-motion";
import { SectionHead } from "./CoursesSection";

const mentors = [
  { name: "Dr. Aarav Mehta", role: "UPSC GS Faculty", exp: "12+ yrs", subj: "Polity & Governance", grad: "from-primary to-secondary" },
  { name: "Prof. Kavya Iyer", role: "JEE Mathematics", exp: "10+ yrs", subj: "Calculus & Algebra", grad: "from-secondary to-accent" },
  { name: "Dr. Rohan Bhatt", role: "NEET Biology", exp: "9+ yrs", subj: "Botany & Genetics", grad: "from-primary to-accent" },
  { name: "Ms. Riya Kapoor", role: "Banking & SSC", exp: "8+ yrs", subj: "Quant & Reasoning", grad: "from-secondary to-primary" },
];

const Mentors = () => (
  <section className="relative py-28">
    <div className="container">
      <SectionHead
        eyebrow="Mentors"
        title={<>Learn from <span className="text-gradient-brand">the best in the country</span></>}
        subtitle="Faculty who&apos;ve cracked, taught and mentored thousands of selections."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
        {mentors.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i*0.06 }}
            whileHover={{ y: -6 }}
            className="group glass rounded-3xl p-5 ring-grad relative overflow-hidden"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${m.grad}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.6))]" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-white/80">{m.exp}</span>
                <span className="text-[10px] uppercase tracking-widest text-white/80">Mentor</span>
              </div>
              <motion.div
                initial={false}
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: i*0.4 }}
                className="absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 opacity-0 group-hover:opacity-100"
              />
            </div>
            <div className="mt-4">
              <div className="font-display font-bold">{m.name}</div>
              <div className="text-xs text-muted-foreground">{m.role}</div>
              <div className="text-xs mt-1 text-subtle-foreground">{m.subj}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Mentors;
