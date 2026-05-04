import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, BarChart3, Target, Zap, Rocket, BookOpen, Brain, Loader2, Sparkles, TrendingUp, ShieldCheck, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PracticeLab = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Free Mock Test");

  const openRegistration = (planName: string) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "93b4dffb-0a00-4740-a747-1cff872f81ae");
    formData.append("subject", `New Lead: ${selectedPlan}`);
    formData.append("from_name", "Edunachal Practice Lab");
    formData.append("Selected_Plan", selectedPlan);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success("Registration Successful!", {
          description: "We have received your details. Our team will contact you shortly to activate your access."
        });
        e.currentTarget.reset();
        setIsModalOpen(false);
        
        // If they requested the Free Mock Test, redirect them directly to the test engine
        if (selectedPlan === "Free Mock Test") {
          toast("Redirecting to Free Mock Test...", { icon: <Rocket className="w-4 h-4 text-primary" /> });
          setTimeout(() => navigate("/free-mock-test"), 1500);
        }
      } else {
        toast.error("Registration Failed", {
          description: data.message || "Something went wrong. Please try again later."
        });
      }
    } catch (error) {
      toast.error("Network Error", {
        description: "Please check your internet connection and try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      title="Practice Lab | Edunachal"
      description="Crack STATE PSC, SSC, Banking & Railway exams with India’s most structured Practice-Based Preparation System."
    >
      {/* 🟦 HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-1000"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.15)_0,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:40px]"></div>
        </div>

        <div className="container px-4 mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-900/40 via-primary/20 to-blue-900/40 border border-primary/30 mb-10 shadow-[0_0_50px_rgba(var(--primary),0.2)] backdrop-blur-xl relative overflow-hidden group hover:border-primary/60 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary shadow-[0_0_10px_rgba(var(--primary),1)]"></span>
              </span>
              <span className="tracking-widest uppercase font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white text-xs sm:text-sm drop-shadow-lg">
                ⭐ INDIA'S FIRST PRACTICE BASED EXAM HUB
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Stop Studying More. <br />
              <span className="relative inline-block mt-2">
                <span className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-blue-500/20 blur-2xl rounded-full"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-blue-300 drop-shadow-sm">
                  Start Practicing Smarter.
                </span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Crack <strong className="text-white font-medium">STATE PSC, SSC, Banking & Railway</strong> exams with India’s most structured Performance-Driven Preparation System.
            </p>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center"
            >
              <Button 
                size="lg" 
                onClick={() => navigate("/free-mock-test")}
                className="relative group h-16 px-10 text-xl font-bold rounded-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary hover:to-blue-500 text-white shadow-[0_0_40px_rgba(var(--primary),0.4)] border-0 overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative flex items-center gap-2">
                  Attempt a Free Mock Now
                  <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Discover More</span>
          <ChevronRight className="w-5 h-5 rotate-90 text-muted-foreground" />
        </div>
      </section>

      {/* 🧠 WHAT IS PRACTICE LAB */}
      <section className="py-32 relative bg-black/60 border-y border-white/5 backdrop-blur-lg">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-white/80 uppercase tracking-wider">The Paradigm Shift</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                What is Edunachal <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Practice Lab?</span>
              </h2>
              
              <div className="space-y-6 text-lg text-muted-foreground">
                <p className="leading-relaxed">
                  <strong className="text-white text-xl">It is NOT a coaching institute.</strong> <br/>
                  It is an elite, performance-driven ecosystem engineered specifically to skyrocket your speed, accuracy, and absolute exam confidence.
                </p>
                <p className="leading-relaxed border-l-2 border-primary/50 pl-6 my-8">
                  Instead of passive, long lectures, we immerse you in an active-learning environment focused entirely on high-yield output:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {[
                    { icon: <ShieldCheck className="w-5 h-5" />, text: "Real exam-level mock tests" },
                    { icon: <TrendingUp className="w-5 h-5" />, text: "Daily rigorous practice" },
                    { icon: <Zap className="w-5 h-5" />, text: "Instant AI analytics" },
                    { icon: <Target className="w-5 h-5" />, text: "Targeted weakness repair" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-colors">
                      <div className="text-primary">{item.icon}</div>
                      <span className="font-medium text-white/90">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-900/30 via-primary/10 to-transparent border border-primary/20 shadow-[0_0_50px_rgba(var(--primary),0.1)] overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-blue-500"></div>
                  <div className="relative z-10">
                    <p className="text-xs font-bold text-blue-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> India's First Practice Based Exam Hub
                    </p>
                    <p className="text-xl md:text-2xl font-serif text-white/90 m-0 leading-snug">
                      "Because exams are not about how much you study, <br/>
                      <span className="text-primary italic">they are about how well you perform under pressure.</span>"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative w-full flex justify-center lg:justify-end"
            >
              {/* Complex Visual Asset */}
              <div className="relative w-full aspect-square max-w-sm lg:max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-blue-600/30 rounded-full blur-[100px] animate-pulse duration-1000"></div>
                
                <div className="absolute inset-4 bg-card/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 flex flex-col items-center justify-center text-center overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 opacity-10 rotate-12 translate-x-1/4 -translate-y-1/4">
                    <Brain className="w-full h-full text-white" />
                  </div>
                  
                  <div className="relative z-10 w-full">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-blue-600 p-[2px] mb-8 shadow-xl">
                      <div className="w-full h-full bg-black/50 backdrop-blur-md rounded-2xl flex items-center justify-center">
                        <BarChart3 className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4 text-white">Performance <br/>Engine</h3>
                    <div className="h-1 w-12 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="text-lg text-muted-foreground">Shift from passive consumption to aggressive execution and strategic mastery.</p>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -left-6 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl"
                >
                  <Target className="w-8 h-8 text-rose-400" />
                </motion.div>
                
                <motion.div 
                  animate={{ y: [0, 20, 0] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-10 -right-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl"
                >
                  <Zap className="w-8 h-8 text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ⚙️ HOW IT WORKS */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-black to-black/90">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="container px-4 mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Your Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Success System</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Four precision-engineered steps to transform your preparation from chaotic to calculated.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Attempt Daily Mock",
                desc: "Practice real exam-level questions every single day.",
                color: "from-blue-500/20 to-blue-500/0",
                iconColor: "text-blue-400",
                number: "01"
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Instant Analysis",
                desc: "Know your accuracy, speed, and weak areas instantly.",
                color: "from-purple-500/20 to-purple-500/0",
                iconColor: "text-purple-400",
                number: "02"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Improve Weak Topics",
                desc: "Hyper-focused practice on what matters most for your rank.",
                color: "from-rose-500/20 to-rose-500/0",
                iconColor: "text-rose-400",
                number: "03"
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Boost Rank",
                desc: "Track your upward trajectory and improve every day.",
                color: "from-green-500/20 to-green-500/0",
                iconColor: "text-green-400",
                number: "04"
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative p-8 rounded-[2rem] bg-card/40 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all duration-300 group hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="absolute top-6 right-6 text-6xl font-black text-white/[0.03] group-hover:text-white/[0.05] transition-colors">
                  {step.number}
                </div>
                
                <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${step.iconColor} mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 relative z-10 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">{step.title}</h3>
                <p className="text-muted-foreground relative z-10 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📦 PROGRAMS WE OFFER */}
      <section className="py-32 bg-black border-y border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.1)_0,transparent_70%)]"></div>
        <div className="container px-4 mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 mb-6">
              <span className="text-sm font-medium text-white/80 uppercase tracking-wider">Pricing</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Practice Plan</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {[
              {
                title: "Daily Practice",
                subtitle: "Membership",
                price: "₹499",
                period: "/mo",
                features: ["Daily full-length mock tests", "Curated practice sessions", "Detailed performance tracking", "AI-driven insights"],
                highlight: false,
                buttonText: "Start Daily Practice"
              },
              {
                title: "30-Day",
                subtitle: "Rank Booster",
                price: "₹2999",
                period: " one-time",
                features: ["Intensive revision material", "Complete mock test coverage", "1-on-1 strategy sessions", "Priority mentor support", "Previous year papers"],
                highlight: true,
                buttonText: "Boost Your Rank"
              },
              {
                title: "Test Series",
                subtitle: "Online + Offline",
                price: "₹999",
                period: " starts",
                features: ["SSC / Banking / Railway", "All India ranking system", "Detailed video solutions", "Exam simulation environment"],
                highlight: false,
                buttonText: "Join Test Series"
              }
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-[2.5rem] flex flex-col p-1 transition-all duration-300 ${
                  plan.highlight 
                    ? "bg-gradient-to-b from-primary via-blue-600 to-primary/50 shadow-[0_0_50px_rgba(var(--primary),0.3)] scale-100 lg:scale-105 z-10" 
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <div className={`h-full w-full rounded-[2.4rem] p-8 md:p-10 flex flex-col ${
                  plan.highlight ? "bg-black/90 backdrop-blur-xl" : "bg-black/80 backdrop-blur-md"
                }`}>
                  {plan.highlight && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-primary to-blue-500 text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-lg flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Most Popular
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white/80">{plan.title}</h3>
                    <div className="text-3xl font-black text-white">{plan.subtitle}</div>
                  </div>
                  
                  <div className="mb-8 pb-8 border-b border-white/10">
                    <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                    <span className="text-lg text-muted-foreground font-medium ml-2">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-5 mb-10 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className={`p-1 rounded-full mt-0.5 shrink-0 ${plan.highlight ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/60'}`}>
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <span className="text-white/80 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => openRegistration(`${plan.title} ${plan.subtitle}`)}
                    className={`w-full py-7 rounded-2xl text-lg font-bold transition-all duration-300 ${
                      plan.highlight 
                        ? "bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 hover:shadow-[0_0_20px_rgba(var(--primary),0.5)] text-white border-0" 
                        : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎯 WHO IS THIS FOR & 🎁 FREE ENTRY HOOK */}
      <section className="py-32 relative overflow-hidden">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
            
            {/* WHO IS THIS FOR */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-10">
                This System is For <span className="text-rose-400">You If…</span>
              </h2>
              <div className="space-y-6 mb-10">
                {[
                  "You’ve already studied the syllabus but can’t clear prelims.",
                  "Your accuracy is frustratingly low under pressure.",
                  "You constantly run out of time during actual exams.",
                  "You feel stuck at the same score despite hard work."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 shrink-0">
                      <Target className="h-6 w-6" />
                    </div>
                    <span className="text-xl text-white/80 font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex gap-4 items-center backdrop-blur-sm">
                <div className="p-3 rounded-full bg-rose-500/20 text-rose-400 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-rose-200/90 font-medium text-lg leading-snug">
                  <strong className="text-rose-400">WARNING:</strong> This is NOT for beginners who want full syllabus teaching. This is a rigorous, intensive practice environment.
                </p>
              </div>
            </motion.div>

            {/* FREE ENTRY HOOK */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-primary rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              
              <div className="relative h-full p-10 md:p-14 rounded-[2.5rem] bg-gradient-to-br from-black/80 to-black/95 backdrop-blur-xl border border-white/10 flex flex-col justify-center overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] mix-blend-screen"></div>
                
                <h2 className="text-4xl md:text-5xl font-black mb-8 relative z-10 leading-tight">
                  Start Your Journey <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">For Free</span>
                </h2>
                
                <ul className="space-y-6 mb-12 relative z-10">
                  {[
                    { icon: <Zap className="h-5 w-5" />, text: "1 Free Premium Mock Test" },
                    { icon: <BarChart3 className="h-5 w-5" />, text: "Instant Deep Analytics Report" },
                    { icon: <TrendingUp className="h-5 w-5" />, text: "Know exactly where you stand" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/30">
                        {item.icon}
                      </div>
                      <span className="text-xl font-medium text-white/90">{item.text}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  size="lg" 
                  onClick={() => navigate("/free-mock-test")}
                  className="w-full h-16 text-xl font-bold rounded-2xl bg-gradient-to-r from-blue-600 to-primary hover:from-blue-500 hover:to-primary/90 text-white relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.4)] border-0 hover:scale-[1.02] transition-all"
                >
                  Attempt a Free Mock Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MODAL REGISTRATION FORM */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl bg-black/95 backdrop-blur-2xl border-white/10 text-white p-0 overflow-hidden sm:rounded-[2rem]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-600/10 pointer-events-none"></div>
          
          <div className="p-8 md:p-10 relative z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <DialogHeader className="mb-8 relative">
              <DialogTitle className="text-3xl font-bold text-center pr-8">Complete Registration</DialogTitle>
              <DialogDescription className="text-center text-muted-foreground text-base">
                You are requesting access to the Practice Lab.
              </DialogDescription>
              <DialogClose className="absolute -top-2 -right-2 p-2 rounded-full hover:bg-white/10 transition-colors z-50 text-white/70 hover:text-white">
                <X className="w-6 h-6" />
              </DialogClose>
            </DialogHeader>

            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Select Plan Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="Selected_Plan" className="text-white/80 ml-1">Plan You Want to Join</Label>
                <Select name="Selected_Plan" value={selectedPlan} onValueChange={setSelectedPlan} required>
                  <SelectTrigger className="h-14 px-5 rounded-xl bg-primary/10 border-primary/30 text-primary font-bold focus:border-primary focus:ring-1 focus:ring-primary text-lg transition-all shadow-[0_0_15px_rgba(var(--primary),0.1)]">
                    <SelectValue placeholder="Select Plan" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10">
                    <SelectItem value="Free Mock Test" className="text-base py-3 focus:bg-primary/20 focus:text-white">Free Mock Test</SelectItem>
                    <SelectItem value="Daily Practice Membership" className="text-base py-3 focus:bg-primary/20 focus:text-white">Daily Practice Membership</SelectItem>
                    <SelectItem value="30-Day Rank Booster" className="text-base py-3 focus:bg-primary/20 focus:text-white">30-Day Rank Booster</SelectItem>
                    <SelectItem value="Test Series Online + Offline" className="text-base py-3 focus:bg-primary/20 focus:text-white">Test Series (Online + Offline)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80 ml-1">Full Name</Label>
                  <Input 
                    name="name" 
                    id="name" 
                    required 
                    placeholder="Enter your name" 
                    className="h-12 bg-white/5 border-white/10 focus-visible:border-primary text-base" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-white/80 ml-1">Mobile Number</Label>
                  <Input 
                    name="mobile" 
                    id="mobile" 
                    required 
                    type="tel" 
                    pattern="[0-9]{10}" 
                    placeholder="10-digit number" 
                    className="h-12 bg-white/5 border-white/10 focus-visible:border-primary text-base" 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80 ml-1">Email Address</Label>
                  <Input 
                    name="email" 
                    id="email" 
                    required 
                    type="email"
                    placeholder="Enter your email" 
                    className="h-12 bg-white/5 border-white/10 focus-visible:border-primary text-base" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white/80 ml-1">City / State</Label>
                  <Input 
                    name="city" 
                    id="city" 
                    required 
                    placeholder="e.g. Jaipur, Rajasthan" 
                    className="h-12 bg-white/5 border-white/10 focus-visible:border-primary text-base" 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="exam" className="text-white/80 ml-1">Exam Target</Label>
                  <Select name="exam_target" required>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 focus:border-primary text-base">
                      <SelectValue placeholder="Select Course/Exam" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10">
                      <SelectItem value="upsc-cse">UPSC CSE</SelectItem>
                      <SelectItem value="apsc-state-psc">APSC / State PSC</SelectItem>
                      <SelectItem value="neet-ug">NEET UG</SelectItem>
                      <SelectItem value="iit-jee">IIT-JEE</SelectItem>
                      <SelectItem value="ssc">SSC</SelectItem>
                      <SelectItem value="banking">Banking</SelectItem>
                      <SelectItem value="defence">Defence</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level" className="text-white/80 ml-1">Preparation Level</Label>
                  <Select name="current_level" required>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 focus:border-primary text-base">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10">
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="repeat">Repeat Aspirant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target_year" className="text-white/80 ml-1">Target Exam Year</Label>
                <Select name="target_year" required>
                  <SelectTrigger className="h-12 bg-white/5 border-white/10 focus:border-primary text-base">
                    <SelectValue placeholder="Select Target Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10">
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full h-14 text-lg font-bold rounded-xl mt-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 text-white relative overflow-hidden transition-all hover:scale-[1.02] border-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    Processing Request...
                  </>
                ) : (
                  <>
                    Submit Request
                    <ChevronRight className="ml-2 h-6 w-6" />
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                By submitting, you agree to our <Link to="/terms-and-conditions" className="text-primary hover:underline transition-colors">Terms & Conditions</Link>.
              </p>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default PracticeLab;
