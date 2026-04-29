import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 1000000, suffix: "+", label: "Active learners" },
  { value: 50000, suffix: "+", label: "Selections guided" },
  { value: 4.9, suffix: "/5", label: "Student rating", decimals: 1 },
  { value: 126, suffix: "+", label: "Expert mentors" },
];

const logos = ["UPSC", "APSC", "SSC CGL", "IBPS PO", "NEET UG", "JEE Adv", "RRB NTPC", "RBI Grade B", "CDS", "CAPF"];

function useCounter(target: number, decimals = 0, duration = 1500, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Number((target * eased).toFixed(decimals)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, decimals, duration]);
  return val;
}

const Counter = ({ s, start }: { s: typeof stats[number]; start: boolean }) => {
  const v = useCounter(s.value, s.decimals ?? 0, 1600, start);
  return (
    <div className="text-center">
      <div className="font-display text-3xl md:text-4xl font-bold tracking-tight text-gradient">
        {v.toLocaleString(undefined, { minimumFractionDigits: s.decimals ?? 0 })}{s.suffix}
      </div>
      <div className="mt-1 text-xs md:text-sm text-muted-foreground uppercase tracking-wider">{s.label}</div>
    </div>
  );
};

const SocialProof = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <section ref={ref} className="relative py-16 border-y border-white/5 bg-white/[0.015]">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl glass px-4 py-6">
              <Counter s={s} start={inView} />
            </div>
          ))}
        </div>

        <div className="mt-10 relative overflow-hidden mask-fade">
          <div className="flex gap-12 marquee whitespace-nowrap">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="text-muted-foreground/70 font-display font-semibold tracking-wider text-lg">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`.mask-fade{ -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);}`}</style>
    </section>
  );
};

export default SocialProof;
