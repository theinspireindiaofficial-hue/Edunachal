import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => (
  <section id="contact" className="relative py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2rem] premium-panel ring-grad p-10 md:p-16 text-center"
      >
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero opacity-80" />
        <div aria-hidden className="absolute -inset-x-10 -top-24 h-72 bg-gradient-primary opacity-20 blur-2xl" />
        <svg aria-hidden className="absolute inset-0 w-full h-full opacity-[0.12]" preserveAspectRatio="none" viewBox="0 0 800 400">
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 30} x2="800" y2={i * 30 - 80} stroke="white" strokeWidth="0.5" />
          ))}
        </svg>

        <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs uppercase tracking-widest text-subtle-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-primary animate-pulse-glow" /> Limited cohort
        </span>
        <h2 className="font-display mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-gradient max-w-3xl mx-auto leading-[1.05]">
          Step into the room where <span className="text-gradient-brand">rankers are built</span>.
        </h2>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
          Join a focused cohort, meet your mentor, and get a clear rank plan before the week ends.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="btn-glow rounded-full px-7 h-12 text-white border-0">
            <Link to="/book-call">
              Reserve My Seat <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="rounded-full h-12 px-6 glass hover:bg-white/10 text-foreground">
            <Link to="/book-call">
              <PhoneCall className="w-4 h-4 mr-1" /> Talk to a counsellor
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTA;
