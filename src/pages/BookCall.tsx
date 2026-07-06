import { useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarCheck, CheckCircle2, Clock3, PhoneCall, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const examOptions = ["UPSC CSE", "APSC", "SSC", "Banking", "NEET UG", "IIT-JEE", "Railways", "Other"];
const timeOptions = ["Morning", "Afternoon", "Evening", "Any time"];
const WEB3FORMS_ACCESS_KEY = "18be8970-4402-4f04-b809-5a2b01d8e217";

const BookCall = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [exam, setExam] = useState("");
  const [time, setTime] = useState("");

  return (
    <Layout
      title="Book a Free Strategy Call"
      description="Book a free strategy call with Edunachal for premium exam preparation guidance."
    >
      <div className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <div aria-hidden className="absolute -left-24 top-10 -z-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div aria-hidden className="absolute -right-24 bottom-10 -z-10 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />

        <section className="container pt-32 pb-8 md:pt-40 md:pb-12">
          <nav className="flex items-center justify-between mb-8">
            <Button asChild variant="ghost" className="rounded-full glass hover:bg-white/10">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to website
              </Link>
            </Button>
          </nav>

          <div className="grid items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs uppercase tracking-widest text-subtle-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" /> Free consultation
              </span>
              <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.05] text-gradient md:text-6xl">
                Book your free <span className="text-gradient-brand">strategy call</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Tell us your target exam and current stage. Our counsellor will help you map the next best step for your preparation.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <Benefit icon={<PhoneCall className="h-4 w-4" />} title="15-20 min call" text="Quick, focused guidance" />
                <Benefit icon={<CalendarCheck className="h-4 w-4" />} title="Personal roadmap" text="Based on your exam goal" />
                <Benefit icon={<ShieldCheck className="h-4 w-4" />} title="No pressure" text="Just clear advice" />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="premium-panel ring-grad rounded-[2rem] p-6 shadow-soft md:p-8">
                {submitted ? (
                  <div className="grid min-h-[520px] place-items-center text-center">
                    <div>
                      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h2 className="font-display mt-6 text-3xl font-bold">Your request is noted.</h2>
                      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                        Thanks for reaching out. Our team will contact you soon to confirm a convenient call slot.
                      </p>
                      <Button asChild className="btn-glow mt-8 rounded-full border-0 px-7 text-white">
                        <Link to="/">Return to website</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form
                    className="grid gap-5"
                    onSubmit={async (event) => {
                      event.preventDefault();
                      setError("");

                      if (!exam || !time) {
                        setError("Please select your target exam and preferred call time.");
                        return;
                      }

                      setIsSubmitting(true);

                      const formData = new FormData(event.currentTarget);
                      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
                      formData.append("subject", "New Edunachal strategy call booking");
                      formData.append("from_name", "Edunachal Website");
                      formData.append("exam", exam);
                      formData.append("time", time);

                      try {
                        const response = await fetch("https://api.web3forms.com/submit", {
                          method: "POST",
                          body: formData,
                        });
                        const result = await response.json();

                        if (!response.ok || !result.success) {
                          throw new Error(result.message || "Unable to submit the form.");
                        }

                        setSubmitted(true);
                      } catch {
                        setError("Something went wrong while submitting. Please try again in a moment.");
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                    <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
                    <div>
                      <h2 className="font-display text-2xl font-bold">Share your details</h2>
                      <p className="mt-1 text-sm text-muted-foreground">We will use this only to schedule your strategy call.</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Full name" htmlFor="name">
                        <Input id="name" name="name" required placeholder="Your name" className="h-12 rounded-2xl border-white/10 bg-white/5" />
                      </Field>
                      <Field label="Phone number" htmlFor="phone">
                        <Input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" className="h-12 rounded-2xl border-white/10 bg-white/5" />
                      </Field>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Email" htmlFor="email">
                        <Input id="email" name="email" type="email" placeholder="you@example.com" className="h-12 rounded-2xl border-white/10 bg-white/5" />
                      </Field>
                      <Field label="Target exam" htmlFor="exam">
                        <Select value={exam} onValueChange={setExam}>
                          <SelectTrigger id="exam" className="h-12 rounded-2xl border-white/10 bg-white/5 text-sm transition hover:bg-white/10 focus:ring-2 focus:ring-primary/60 focus:ring-offset-0 data-[placeholder]:text-muted-foreground">
                            <SelectValue placeholder="Select exam" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-white/10 bg-surface-2/95 backdrop-blur-xl shadow-soft">
                            {examOptions.map((o) => (
                              <SelectItem key={o} value={o} className="rounded-lg py-2 cursor-pointer text-subtle-foreground focus:bg-primary/20 focus:text-white data-[state=checked]:bg-primary/25 data-[state=checked]:text-white">{o}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Preferred call time" htmlFor="time">
                        <Select value={time} onValueChange={setTime}>
                          <SelectTrigger id="time" className="h-12 rounded-2xl border-white/10 bg-white/5 text-sm transition hover:bg-white/10 focus:ring-2 focus:ring-primary/60 focus:ring-offset-0 data-[placeholder]:text-muted-foreground">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-white/10 bg-surface-2/95 backdrop-blur-xl shadow-soft">
                            {timeOptions.map((o) => (
                              <SelectItem key={o} value={o} className="rounded-lg py-2 cursor-pointer text-subtle-foreground focus:bg-primary/20 focus:text-white data-[state=checked]:bg-primary/25 data-[state=checked]:text-white">{o}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field label="Current stage" htmlFor="stage">
                        <Input id="stage" name="stage" placeholder="Beginner / repeat attempt / advanced" className="h-12 rounded-2xl border-white/10 bg-white/5" />
                      </Field>
                    </div>

                    <Field label="What do you need help with?" htmlFor="message">
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us your goal, timeline, weak areas, or any specific concern."
                        className="min-h-32 rounded-2xl border-white/10 bg-white/5"
                      />
                    </Field>

                    {error && (
                      <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
                        {error}
                      </div>
                    )}

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock3 className="h-4 w-4 text-secondary" />
                        Response usually within one working day
                      </div>
                      <Button type="submit" size="lg" disabled={isSubmitting} className="btn-glow rounded-full border-0 px-8 text-white">
                        {isSubmitting ? "Submitting..." : "Submit request"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

const Field = ({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) => (
  <div className="grid gap-2">
    <Label htmlFor={htmlFor} className="text-sm text-subtle-foreground">
      {label}
    </Label>
    {children}
  </div>
);

const Benefit = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="glass rounded-2xl p-4">
    <div className="flex items-center gap-2 font-semibold">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-secondary">{icon}</span>
      {title}
    </div>
    <p className="mt-1 text-xs text-muted-foreground">{text}</p>
  </div>
);

export default BookCall;
