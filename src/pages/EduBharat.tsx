import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  GraduationCap,
  BookOpen,
  Video,
  FileText,
  BarChart3,
  Newspaper,
  UserRound,
  Wallet,
  CheckCircle2,
  Users,
  Mail,
  Globe,
} from "lucide-react";
import mark from "@/assets/edubharat-emblem.png";

/* ------------------------------------------------------------------ *
 * EduBharat — a self-contained landing page (light theme).
 * Palette pulled from the EduBharat logo:
 *   blue   #1B3A9E   (deep #12307E)
 *   orange #F47216
 *   green  #2E9E44
 * ------------------------------------------------------------------ */

const BLUE = "#1B3A9E";
const BLUE_DEEP = "#12307E";
const ORANGE = "#F47216";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why-us" },
  { label: "Exams", href: "#exams" },
  { label: "Features", href: "#features" },
  { label: "Community", href: "#community" },
];

const heroTags = [
  "UPSC", "State PSC", "SSC", "Banking", "Railways", "Defence",
  "Teaching", "CUET", "NEET", "JEE", "Skill Development",
];

const whyCards = [
  { icon: GraduationCap, title: "Expert Faculty", body: "Learn from India's top educators and subject matter experts." },
  { icon: BookOpen, title: "Comprehensive Courses", body: "Structured curriculum covering every major competitive exam." },
  { icon: Video, title: "Live & Recorded Classes", body: "Attend live sessions or learn anytime with the recorded library." },
  { icon: FileText, title: "Study Materials", body: "Well-researched notes, PDFs, and reference material included." },
  { icon: BarChart3, title: "Mock Tests & Analysis", body: "Real exam simulations with detailed performance analytics." },
  { icon: Newspaper, title: "Current Affairs", body: "Daily updates, monthly magazines, and topic-wise coverage." },
  { icon: UserRound, title: "Personal Mentorship", body: "One-on-one guidance to keep your preparation on track." },
  { icon: Wallet, title: "Affordable Learning", body: "Premium education at prices every aspirant can afford." },
];

const examGroups = [
  { title: "Civil Services", items: ["UPSC CSE", "BPSC", "UPPSC", "MPSC", "APPSC", "State PCS Exams"] },
  { title: "Government Recruitment", items: ["SSC CGL / CHSL", "Banking (IBPS, SBI, RBI)", "Railways (RRB NTPC, Group D)", "Defence (NDA, CDS)"] },
  { title: "Entrance Exams", items: ["CUET UG & PG", "NEET", "JEE Main & Advanced", "State Entrance Tests"] },
  { title: "Skill Development", items: ["Spoken English", "Communication Skills", "Interview Preparation", "Personality Development"] },
];

const featureList = [
  "Live Interactive Classes with two-way engagement",
  "Recorded Library accessible on any device, anytime",
  "Performance Analytics with topic-wise insights",
  "Doubt Resolution by mentors within 24 hours",
  "Downloadable notes and structured study plans",
  "Weekly assessments and full-length mock tests",
];

const whoCanJoin = [
  "School & college students preparing for entrance exams",
  "Graduates targeting UPSC, PSC, SSC, Banking & Railways",
  "Working professionals upskilling for new opportunities",
  "Aspirants seeking mentorship and community support",
];

const stats = [
  { value: "50K+", label: "Learners" },
  { value: "200+", label: "Courses" },
  { value: "100+", label: "Mentors" },
];

const communityPerks = [
  "Peer-to-peer study groups and discussion forums",
  "Expert AMAs, webinars, and success story sessions",
  "Exclusive scholarships and early access to new batches",
  "Career guidance from mentors who cracked top exams",
];

/* --- small reveal-on-scroll wrapper --- */
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Logo = ({ dark = false }: { dark?: boolean }) => (
  <div className="flex items-center gap-3">
    <span className="grid place-items-center w-11 h-11 rounded-full bg-white shadow-sm ring-1 ring-black/5">
      <img src={mark} alt="EduBharat" className="w-10 h-10" />
    </span>
    <div className="leading-tight">
      <div className="font-extrabold text-lg tracking-tight">
        <span style={{ color: dark ? "#fff" : BLUE }}>Edu</span>
        <span style={{ color: ORANGE }}>Bharat</span>
      </div>
      <div className={`text-[10px] font-semibold tracking-[0.14em] ${dark ? "text-white/70" : "text-slate-500"}`}>
        POWERED BY EDUNACHAL
      </div>
    </div>
  </div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center font-bold tracking-[0.18em] text-sm uppercase" style={{ color: ORANGE }}>
    {children}
  </p>
);

const EnrollBtn = ({
  children = "Enroll Now",
  className = "",
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-95 ${className}`}
    style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, boxShadow: "0 10px 30px -8px rgba(244,114,22,0.6)" }}
  >
    {children}
  </button>
);

const EduBharat = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const goEnroll = (exam = "") => {
    setOpen(false);
    navigate(exam ? `/edubharat/enroll?exam=${encodeURIComponent(exam)}` : "/edubharat/enroll");
  };

  /* swap favicon + title for this page, restore on unmount */
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const prevHref = link?.getAttribute("href") ?? null;
    const prevTitle = document.title;

    let el = link;
    if (!el) {
      el = document.createElement("link");
      el.rel = "icon";
      document.head.appendChild(el);
    }
    el.type = "image/png";
    el.setAttribute("href", "/edubharat-favicon.png");
    document.title = "EduBharat — Empowering India's Aspirants | Powered by Edunachal";

    return () => {
      if (prevHref) el!.setAttribute("href", prevHref);
      document.title = prevTitle;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dotBg = {
    backgroundImage:
      "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1.4px)",
    backgroundSize: "22px 22px",
  } as const;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-orange-200">
      {/* ---------------- Navbar ---------------- */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
        <div className="mx-auto max-w-7xl px-4">
          <nav className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-2.5 transition-all duration-300 ${scrolled ? "bg-white/90 shadow-md backdrop-blur ring-1 ring-black/5" : "bg-white/80 backdrop-blur"}`}>
            <Link to="/edubharat"><Logo /></Link>

            {/* center Home / Landing pill */}
            <div className="hidden md:flex items-center gap-1 rounded-full bg-slate-100 p-1">
              <Link to="/" className="rounded-full px-5 py-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900">
                Edunachal
              </Link>
              <span className="rounded-full bg-white px-5 py-1.5 text-sm font-semibold shadow-sm" style={{ color: BLUE }}>
                EduBharat
              </span>
            </div>

            <ul className="hidden lg:flex items-center gap-6">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-900">{l.label}</a>
                </li>
              ))}
            </ul>

            <div className="hidden md:block"><EnrollBtn onClick={() => goEnroll()} /></div>

            <button className="md:hidden grid place-items-center w-10 h-10 rounded-xl bg-slate-100" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>

          {open && (
            <div className="md:hidden mt-2 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/5">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">
                <Home className="w-4 h-4" /> Edunachal
              </Link>
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50">{l.label}</a>
              ))}
              <div className="mt-2"><EnrollBtn className="w-full justify-center" onClick={() => goEnroll()} /></div>
            </div>
          )}
        </div>
      </header>

      {/* ---------------- Hero ---------------- */}
      <section id="home" className="relative overflow-hidden pt-36 pb-24 text-white" style={{ background: `radial-gradient(120% 90% at 50% -10%, #2a4fb8 0%, ${BLUE} 45%, ${BLUE_DEEP} 100%)` }}>
        <div className="absolute inset-0" style={dotBg} />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/20 backdrop-blur">
              <Sparkles className="w-4 h-4" style={{ color: "#ffcf9e" }} /> India's Trusted Learning Platform
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="mt-8 font-display text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
            Empowering India's Aspirants
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }} className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-blue-100/90">
            One Platform. Every Competitive Exam. Endless Opportunities.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }} className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {heroTags.map((t) => (
              <button
                key={t}
                onClick={() => goEnroll(t)}
                className="rounded-full bg-white/10 px-4 py-1.5 text-sm ring-1 ring-white/15 backdrop-blur transition hover:bg-white/20 hover:scale-105"
              >
                {t}
              </button>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <EnrollBtn onClick={() => goEnroll()}>Enroll Now <ArrowRight className="w-4 h-4" /></EnrollBtn>
            <a href="#exams" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Explore Courses
            </a>
          </motion.div>
        </div>
      </section>

      {/* ---------------- About ---------------- */}
      <section id="about" className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal><SectionLabel>About EduBharat</SectionLabel></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold" style={{ color: BLUE }}>
              Education That Builds Careers
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              EduBharat is a national learning platform powered by the trusted legacy of{" "}
              <strong className="text-slate-900">Edunachal</strong>. We bring together India's best educators,
              structured curriculum, and modern learning technology to deliver quality education and expert
              mentorship to every aspirant — from metro cities to the remotest towns.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Why Choose ---------------- */}
      <section id="why-us" className="py-24" style={{ background: "linear-gradient(180deg, #eef3fb 0%, #f6f9ff 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><SectionLabel>Why Choose EduBharat</SectionLabel></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-center font-display text-4xl md:text-5xl font-extrabold" style={{ color: BLUE }}>
              Everything You Need To Succeed
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={0.04 * i}>
                  <motion.button
                    type="button"
                    onClick={() => goEnroll()}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group h-full w-full cursor-pointer rounded-2xl bg-white p-6 text-left shadow-[0_10px_40px_-24px_rgba(27,58,158,0.5)] ring-1 ring-slate-100 hover:ring-2 hover:shadow-[0_22px_55px_-24px_rgba(27,58,158,0.6)]"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-xl text-white transition-colors group-hover:brightness-110" style={{ background: BLUE }}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold" style={{ color: BLUE }}>{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold opacity-0 transition-all -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0" style={{ color: ORANGE }}>
                      Enroll now <ArrowRight className="h-4 w-4" />
                    </span>
                  </motion.button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Exams ---------------- */}
      <section id="exams" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><SectionLabel>Exams We Cover</SectionLabel></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-center font-display text-4xl md:text-5xl font-extrabold" style={{ color: BLUE }}>
              One Platform. Every Exam.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {examGroups.map((g, i) => (
              <Reveal key={g.title} delay={0.05 * i}>
                <div className="h-full rounded-2xl bg-white p-7 shadow-[0_10px_40px_-24px_rgba(27,58,158,0.5)] ring-1 ring-slate-100">
                  <h3 className="text-xl font-bold" style={{ color: BLUE }}>{g.title}</h3>
                  <span className="mt-3 block h-1 w-10 rounded-full" style={{ background: ORANGE }} />
                  <ul className="mt-5 space-y-3">
                    {g.items.map((it) => (
                      <li key={it}>
                        <button onClick={() => goEnroll(it)} className="flex w-full items-start gap-2.5 rounded-lg px-2 py-1 text-left text-slate-700 transition hover:bg-slate-50 hover:text-slate-900">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ORANGE }} />
                          <span>{it}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section id="features" className="py-24" style={{ background: "linear-gradient(180deg, #f6f9ff 0%, #eaf1fc 100%)" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <Reveal className="max-w-md">
            <SectionLabel>Learning Features</SectionLabel>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold leading-tight" style={{ color: BLUE }}>
              Built For Modern Aspirants
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Interactive learning, personalized analytics, and instant doubt support — everything in one place.
            </p>
          </Reveal>

          <div className="space-y-4">
            {featureList.map((f, i) => (
              <Reveal key={f} delay={0.05 * i}>
                <div className="flex items-center gap-4 rounded-2xl bg-white px-6 py-5 shadow-[0_10px_40px_-26px_rgba(27,58,158,0.55)] ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_-26px_rgba(27,58,158,0.6)]">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ background: "rgba(244,114,22,0.12)" }}>
                    <CheckCircle2 className="h-5 w-5" style={{ color: ORANGE }} />
                  </span>
                  <span className="font-medium text-slate-800">{f}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Who can join + stats ---------------- */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-white p-9 shadow-[0_16px_50px_-30px_rgba(27,58,158,0.5)] ring-1 ring-slate-100">
              <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: "rgba(244,114,22,0.12)" }}>
                <Users className="h-6 w-6" style={{ color: ORANGE }} />
              </span>
              <h3 className="mt-5 font-display text-3xl font-extrabold" style={{ color: BLUE }}>Who Can Join</h3>
              <ul className="mt-6 space-y-4">
                {whoCanJoin.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ORANGE }} />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-3xl bg-white p-9 shadow-[0_16px_50px_-30px_rgba(27,58,158,0.5)] ring-1 ring-slate-100">
              <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: "rgba(244,114,22,0.12)" }}>
                <Sparkles className="h-6 w-6" style={{ color: ORANGE }} />
              </span>
              <h3 className="mt-5 font-display text-3xl font-extrabold" style={{ color: BLUE }}>Why Students Trust Us</h3>
              <p className="mt-6 leading-relaxed text-slate-600">
                We put students first — every course, every mentor, and every feature is built to help you learn
                better, practice smarter, and achieve your goals with confidence.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl py-5 text-center" style={{ background: "#eef3fb" }}>
                    <div className="text-2xl font-extrabold" style={{ color: BLUE }}>{s.value}</div>
                    <div className="mt-1 text-xs font-semibold tracking-wide text-slate-500 uppercase">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Community ---------------- */}
      <section id="community" className="bg-white pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl px-8 py-14 md:px-14" style={{ background: `radial-gradient(120% 120% at 100% 0%, #2a4fb8 0%, ${BLUE} 45%, ${BLUE_DEEP} 100%)` }}>
            <div className="absolute inset-0" style={dotBg} />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div className="text-white">
                <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight">Join the EduBharat Community</h2>
                <p className="mt-5 max-w-md text-blue-100/90">
                  Be part of a growing network of learners, mentors, and achievers working together to build careers.
                </p>
                <div className="mt-8"><EnrollBtn onClick={() => goEnroll()}>Get Started Today <ArrowRight className="w-4 h-4" /></EnrollBtn></div>
              </div>
              <div className="space-y-4">
                {communityPerks.map((p) => (
                  <div key={p} className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-4 ring-1 ring-white/15 backdrop-blur">
                    <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: "#ffb877" }} />
                    <span className="text-white">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="text-white" style={{ background: BLUE_DEEP }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-blue-100/80">
              Empowering India's aspirants with quality education, expert mentorship, and modern learning technology.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-[0.14em] text-blue-100/70 uppercase">Contact</h4>
            <ul className="mt-5 space-y-3 text-blue-100/90">
              <li className="flex items-center gap-2.5"><Mail className="h-4 w-4" style={{ color: "#ffb877" }} /> edubharatlive@gmail.com</li>
              <li className="flex items-center gap-2.5"><Globe className="h-4 w-4" style={{ color: "#ffb877" }} /> www.edubharat.org</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-[0.14em] text-blue-100/70 uppercase">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-blue-100/90">
              <li><a href="#about" className="transition hover:text-white">About</a></li>
              <li><a href="#exams" className="transition hover:text-white">Exams We Cover</a></li>
              <li><a href="#features" className="transition hover:text-white">Learning Features</a></li>
              <li><a href="#community" className="transition hover:text-white">Join Community</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-5 text-center text-sm text-blue-100/60">
            © {new Date().getFullYear()} EduBharat · Powered by Edunachal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EduBharat;
