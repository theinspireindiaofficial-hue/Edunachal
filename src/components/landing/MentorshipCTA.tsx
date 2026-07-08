import { motion } from "framer-motion";
import {
  MessageCircle,
  ArrowRight,
  Sparkles,
  Flag,
  Footprints,
  Trophy,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 * One-to-One Mentorship — an interactive, branded band.
 * Only the green "Chat on WhatsApp" button (and the WhatsApp icon)
 * open WhatsApp; the surrounding panel is not a link.
 * ------------------------------------------------------------------ */

const BLUE = "#1B3A9E";
const BLUE_DEEP = "#12307E";
const ORANGE = "#F47216";
const GREEN = "#2E9E44";

const WA_NUMBER = "917628928150";
const WA_MESSAGE =
  "Hi EduBharat! I'm interested in the 1-on-1 Mentorship Program. Please share the details.";
const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

const dotBg = {
  backgroundImage:
    "radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1.4px)",
  backgroundSize: "22px 22px",
} as const;

const gridBg = {
  backgroundImage:
    "linear-gradient(rgba(27,58,158,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(27,58,158,0.06) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
} as const;

const journey = [
  { icon: Flag, label: "Day One", sub: "Foundation & plan" },
  { icon: Footprints, label: "Prelims", sub: "Weekly tracking" },
  { icon: Footprints, label: "Mains", sub: "Answer writing" },
  { icon: Trophy, label: "Interview", sub: "We stand beside you" },
];

const chips = [
  { text: "UPSC", top: "12%", left: "6%", delay: 0, color: BLUE },
  { text: "UPPSC", top: "72%", left: "10%", delay: 0.6, color: ORANGE },
  { text: "BPSC", top: "20%", left: "88%", delay: 1.1, color: GREEN },
  { text: "Interview Ready", top: "80%", left: "82%", delay: 0.3, color: BLUE },
];

const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const MentorshipCTA = () => (
  <section
    id="mentorship"
    className="relative overflow-hidden py-20"
    style={{ background: "linear-gradient(180deg, #e9f0fb 0%, #f4f7fd 45%, #fdf1e8 100%)" }}
  >
    {/* branded background: grid + blurred logo-colour glows */}
    <div className="pointer-events-none absolute inset-0" style={gridBg} />
    <div className="pointer-events-none absolute -left-24 top-4 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(27,58,158,0.18)" }} />
    <div className="pointer-events-none absolute -right-20 -top-10 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(244,114,22,0.18)" }} />
    <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl" style={{ background: "rgba(46,158,68,0.16)" }} />

    {/* drifting exam chips */}
    {chips.map((c) => (
      <motion.span
        key={c.text}
        className="pointer-events-none absolute hidden rounded-full bg-white/80 px-3 py-1 text-xs font-bold shadow-sm ring-1 ring-black/5 backdrop-blur md:block"
        style={{ top: c.top, left: c.left, color: c.color }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5 + c.delay, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
      >
        {c.text}
      </motion.span>
    ))}

    <div className="relative mx-auto max-w-7xl px-6">
      {/* eyebrow + big catchy heading */}
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] shadow-sm ring-1 ring-black/5" style={{ color: ORANGE }}>
          <Sparkles className="h-3.5 w-3.5" /> Personalised Mentorship
        </span>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] md:text-6xl" style={{ color: BLUE }}>
          One Mentor.{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${ORANGE}, #ff9e52)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Your Entire Journey.
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
          Not just another course — a mentor assigned only to you, from Day One to the interview room.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[34px] p-[2px] shadow-[0_30px_80px_-30px_rgba(37,211,102,0.45)]"
        style={{ background: "linear-gradient(120deg, #F47216 0%, #ffcf5f 38%, #25D366 100%)" }}
      >
        {/* NOTE: this is a plain container, not a link */}
        <div
          onMouseMove={handleMove}
          className="group relative block overflow-hidden rounded-[32px]"
          style={{ background: `radial-gradient(130% 130% at 0% 0%, #21489f 0%, ${BLUE} 45%, ${BLUE_DEEP} 100%)` }}
        >
          {/* texture + cursor spotlight */}
          <div className="pointer-events-none absolute inset-0 opacity-60" style={dotBg} />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.14), transparent 45%)" }}
          />

          {/* floating accent orbs */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full blur-3xl"
            style={{ background: "rgba(244,114,22,0.45)" }}
            animate={{ y: [0, 18, 0], x: [0, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 right-1/3 h-56 w-56 rounded-full blur-3xl"
            style={{ background: "rgba(37,211,102,0.35)" }}
            animate={{ y: [0, -22, 0], x: [0, -12, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* corner ribbon */}
          <div className="pointer-events-none absolute -right-14 top-7 rotate-45 bg-[#F47216] px-16 py-1.5 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-lg">
            Limited Seats
          </div>

          <div className="relative grid items-center gap-10 px-7 py-10 md:grid-cols-[1.55fr_auto] md:px-12 md:py-12">
            {/* -------- left: message + journey -------- */}
            <div className="text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] ring-1 ring-white/25 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" style={{ color: "#ffcf9e" }} /> 1-on-1 Mentorship
              </span>

              <h3 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] md:text-[2.7rem]">
                You don&apos;t need another coaching.
                <br />
                <span style={{ color: "#ff9e52" }}>
                  You need someone who walks every step with you.
                </span>
              </h3>

              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-blue-100/90">
                Personal mentorship for <span className="font-semibold text-white">UPSC, UPPSC &amp; BPSC</span> aspirants -
                a dedicated mentor from your first day of preparation to the final interview.
              </p>

              {/* the interactive "every step" journey path */}
              <div className="relative mt-8 grid grid-cols-4 gap-2">
                <div className="absolute left-[12%] right-[12%] top-5 h-[2px] bg-white/25" />
                <div className="absolute left-[12%] top-5 h-[2px] w-0 bg-[#ffcf5f] transition-[width] duration-700 ease-out group-hover:w-[76%]" />
                {journey.map(({ icon: Icon, label, sub }, i) => (
                  <div
                    key={label}
                    className="group/step relative flex flex-col items-center text-center"
                  >
                    <span
                      className="grid h-10 w-10 place-items-center rounded-full ring-2 ring-white/30 backdrop-blur transition-all duration-300 group-hover/step:-translate-y-1 group-hover/step:scale-125 group-hover/step:ring-[#ffcf5f]"
                      style={{ background: i === journey.length - 1 ? "#25D366" : "rgba(255,255,255,0.14)" }}
                    >
                      <Icon className="h-4 w-4" style={{ color: i === journey.length - 1 ? "#fff" : "#ffcf9e" }} />
                    </span>
                    <span className="mt-2 text-xs font-bold text-white transition-colors group-hover/step:text-[#ffcf5f]">{label}</span>
                    <span className="text-[10px] leading-tight text-blue-100/70 transition-colors group-hover/step:text-blue-50">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* -------- right: WhatsApp CTA (the only clickable link) -------- */}
            <div className="relative flex flex-col items-center gap-4 rounded-3xl bg-white/10 p-7 text-center ring-1 ring-white/20 backdrop-blur-sm">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with a mentor on WhatsApp"
                className="relative grid h-20 w-20 place-items-center"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50" />
                <span className="relative grid h-20 w-20 place-items-center rounded-2xl bg-[#25D366] text-white shadow-xl shadow-emerald-500/40 transition-transform duration-300 hover:scale-110">
                  <MessageCircle className="h-10 w-10 fill-current" />
                </span>
              </a>

              <div>
                <div className="text-sm font-medium text-blue-100/80">Talk to a mentor now</div>
                <div className="text-lg font-extrabold text-white">+91 76289 28150</div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with a mentor on WhatsApp"
                className="group/btn inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-base font-bold text-white shadow-lg shadow-emerald-500/40 transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                Chat on WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </a>

              <span className="text-xs font-medium text-blue-100/80">
                Book your FREE 30-min strategy session
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default MentorshipCTA;
