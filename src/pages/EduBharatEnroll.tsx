import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Check,
  UserPlus,
} from "lucide-react";
import mark from "@/assets/edubharat-emblem.png";

const BLUE = "#1B3A9E";
const BLUE_DEEP = "#12307E";
const ORANGE = "#F47216";

const STORAGE_KEY = "edubharat_registrations";
/* web3forms key registered to edunachalofficial@gmail.com (same as Book-a-Call) */
const WEB3FORMS_ACCESS_KEY = "18be8970-4402-4f04-b809-5a2b01d8e217";

type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  exam: string;
  city: string;
  date: string;
};

const examOptions = [
  "UPSC", "State PSC", "SSC", "Banking", "Railways", "Defence",
  "Teaching", "CUET", "NEET", "JEE", "Skill Development", "Other",
];

const emptyForm = { name: "", email: "", phone: "", exam: "", city: "" };

/* --- clean custom dropdown (light theme) --- */
const Dropdown = ({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-2.5 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-[#1B3A9E] ${open ? "border-transparent ring-2 ring-[#1B3A9E]" : "border-slate-200 hover:border-slate-300"}`}
      >
        <span className={value ? "text-slate-800" : "text-slate-400"}>{value || placeholder}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl ring-1 ring-black/5"
          >
            {options.map((o) => {
              const active = o === value;
              return (
                <li key={o}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(o);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${active ? "font-semibold text-white" : "text-slate-700 hover:bg-slate-50"}`}
                    style={active ? { background: BLUE } : undefined}
                  >
                    {o}
                    {active && <Check className="h-4 w-4" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const EduBharatEnroll = () => {
  const [params] = useSearchParams();
  const [form, setForm] = useState({ ...emptyForm, exam: params.get("exam") || "" });
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const entry: Registration = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      exam: form.exam || "General",
      city: form.city.trim(),
      date: new Date().toISOString(),
    };

    const fd = new FormData();
    fd.append("access_key", WEB3FORMS_ACCESS_KEY);
    fd.append("subject", "New EduBharat Registration");
    fd.append("from_name", "EduBharat Website");
    fd.append("name", entry.name);
    fd.append("email", entry.email);
    fd.append("phone", entry.phone);
    fd.append("exam", entry.exam);
    fd.append("city", entry.city || "-");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Unable to submit.");
      }

      /* quiet local backup copy */
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const list: Registration[] = raw ? JSON.parse(raw) : [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...list]));
      } catch {
        /* storage may be unavailable */
      }

      setSubmittedName(entry.name);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong while submitting. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  const registerAnother = () => {
    setForm(emptyForm);
    setSubmitted(false);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      {/* top bar */}
      <div className="text-white" style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DEEP})` }}>
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/edubharat" className="flex items-center gap-2 text-sm font-medium text-blue-100 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to EduBharat
          </Link>
          <div className="flex items-center gap-2">
            <img src={mark} alt="EduBharat" className="h-10 w-10 drop-shadow" />
            <span className="text-lg font-extrabold">
              <span className="text-white">Edu</span>
              <span style={{ color: "#ffb877" }}>Bharat</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 pb-20 pt-12">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white p-10 text-center shadow-[0_20px_60px_-30px_rgba(27,58,158,0.45)] ring-1 ring-slate-100"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-green-50 text-green-600">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-extrabold" style={{ color: BLUE }}>
              Thank you{submittedName ? `, ${submittedName}` : ""}!
            </h1>
            <p className="mx-auto mt-3 max-w-md text-slate-600">
              Your registration has been received. Our team will reach out shortly to guide your preparation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={registerAnother}
                className="rounded-full px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)` }}
              >
                Register another
              </button>
              <Link
                to="/edubharat"
                className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back to EduBharat
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="font-display text-4xl font-extrabold md:text-5xl" style={{ color: BLUE }}>
                Enroll with EduBharat
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-slate-600">
                Reserve your seat in a few seconds. Our team will reach out to guide your preparation.
              </p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-10 space-y-5 rounded-3xl bg-white p-7 shadow-[0_20px_60px_-30px_rgba(27,58,158,0.45)] ring-1 ring-slate-100 md:p-8"
            >
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Full name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#1B3A9E]"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#1B3A9E]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Phone</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="10-digit number"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#1B3A9E]"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Target exam</label>
                  <Dropdown
                    value={form.exam}
                    onChange={(v) => setForm({ ...form, exam: v })}
                    options={examOptions}
                    placeholder="Select an exam"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">City</label>
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Your city"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#1B3A9E]"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)` }}
              >
                <UserPlus className="h-5 w-5" /> {submitting ? "Submitting..." : "Submit registration"}
              </button>
            </motion.form>
          </>
        )}
      </div>
    </div>
  );
};

export default EduBharatEnroll;
