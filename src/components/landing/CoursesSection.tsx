import { motion } from "framer-motion";
import { Landmark, Building2, Banknote, Stethoscope, Atom, TrainFront, MapPin, Scale, ArrowUpRight } from "lucide-react";

const courses = [
  { icon: Landmark, title: "UPSC CSE", desc: "Civil Services prelims, mains and interview prep — end to end.", tag: "Flagship" },
  { icon: MapPin, title: "APSC", desc: "Arunachal Pradesh state services with regional expert mentors.", tag: "Regional" },
  { icon: Scale, title: "SSC", desc: "CGL, CHSL, MTS and GD — disciplined daily practice.", tag: "Daily Drill" },
  { icon: Banknote, title: "Banking", desc: "IBPS, SBI PO/Clerk, RBI Grade B with prelims to interview.", tag: "Pro" },
  { icon: Stethoscope, title: "NEET UG", desc: "Concept-led biology, chemistry and physics for medical aspirants.", tag: "Live" },
  { icon: Atom, title: "IIT-JEE", desc: "Mains + Advanced strategy with problem-first learning.", tag: "Pro" },
  { icon: TrainFront, title: "Railways", desc: "RRB NTPC, ALP, Group D — speed, accuracy, stamina.", tag: "Bootcamp" },
  { icon: Building2, title: "State Exams", desc: "Targeted prep for state PSCs across India.", tag: "New" },
];

const CoursesSection = () => {
  return (
    <section id="courses" className="relative py-28">
      <div className="container">
        <SectionHead
          eyebrow="Courses"
          title={<>Programs engineered for <span className="text-gradient-brand">top ranks</span></>}
          subtitle="Pick your battle. Every course is built with structured mentorship, smart test series, and an analytics layer that keeps you on track."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {courses.map((c, i) => (
            <motion.a
              key={c.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative glass ring-grad rounded-3xl p-6 overflow-hidden"
            >
              <div aria-hidden className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow/40">
                  <c.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-accent/90 px-2 py-1 rounded-full border border-accent/30">{c.tag}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              <div className="mt-6 flex items-center gap-1 text-sm font-medium text-foreground/90">
                Explore course
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SectionHead = ({
  eyebrow, title, subtitle, align = "center",
}: { eyebrow: string; title: React.ReactNode; subtitle?: string; align?: "center" | "left" }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6 }}
    className={align === "center" ? "max-w-3xl mx-auto text-center" : "max-w-2xl"}
  >
    <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs uppercase tracking-widest text-subtle-foreground">
      <span className="w-1.5 h-1.5 rounded-full bg-gradient-primary" /> {eyebrow}
    </span>
    <h2 className="font-display mt-5 text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-gradient">
      {title}
    </h2>
    {subtitle && <p className="mt-4 text-base md:text-lg text-muted-foreground">{subtitle}</p>}
  </motion.div>
);

export default CoursesSection;
