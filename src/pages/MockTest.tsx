import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { mockTestQuestions } from "@/data/mockTest";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Flag, CheckCircle2, XCircle, BarChart3, RotateCcw, LayoutGrid } from "lucide-react";
import { Navigate } from "react-router-dom";

type AnswerState = Record<string, number>;
type MarkedState = Record<string, boolean>;

const SECTIONS = ["General Studies", "English", "Quantitative Aptitude", "Reasoning"] as const;
const TOTAL_TIME = 60 * 60; // 60 minutes in seconds

const MockTest = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [marked, setMarked] = useState<MarkedState>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [activeSection, setActiveSection] = useState<typeof SECTIONS[number]>("General Studies");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentQuestion = mockTestQuestions[currentIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (hasStarted && !isSubmitted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmitTest();
    }
    return () => clearInterval(timer);
  }, [hasStarted, isSubmitted, timeLeft]);

  // Sync active section when navigating sequentially
  useEffect(() => {
    if (currentQuestion) {
      setActiveSection(currentQuestion.section);
    }
  }, [currentIndex]);

  const handleStart = () => setHasStarted(true);

  const handleOptionSelect = (optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const handleMarkForReview = () => {
    if (isSubmitted) return;
    setMarked((prev) => ({ ...prev, [currentQuestion.id]: !prev[currentQuestion.id] }));
  };

  const navigateToSection = (section: typeof SECTIONS[number]) => {
    const firstQIndex = mockTestQuestions.findIndex((q) => q.section === section);
    if (firstQIndex !== -1) setCurrentIndex(firstQIndex);
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;
    mockTestQuestions.forEach((q) => {
      if (answers[q.id] !== undefined) {
        if (answers[q.id] === q.correctAnswer) correct++;
        else incorrect++;
      }
    });
    const unattempted = mockTestQuestions.length - (correct + incorrect);
    return { correct, incorrect, unattempted, total: mockTestQuestions.length };
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!hasStarted) {
    return (
      <Layout title="Free Mock Test | Practice Lab" hideNavbar hideFooter>
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full bg-card/40 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] shadow-2xl text-center"
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary border border-primary/30">
              <Clock className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Edunachal Free Mock Test</h1>
            <p className="text-xl text-muted-foreground mb-8">Performance Engine Evaluation</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 text-left">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Questions</p>
                <p className="text-2xl font-bold text-white">60</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Duration</p>
                <p className="text-2xl font-bold text-white">60 Min</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Marking</p>
                <p className="text-2xl font-bold text-white">+1 / 0</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sections</p>
                <p className="text-2xl font-bold text-white">4</p>
              </div>
            </div>

            <ul className="text-left space-y-3 mb-10 text-white/80">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> Do not refresh the page or you will lose progress.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> You can navigate between sections at any time.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> The test will auto-submit when the timer ends.</li>
            </ul>

            <Button 
              size="lg" 
              onClick={handleStart}
              className="w-full h-16 text-xl font-bold rounded-2xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 text-white shadow-[0_0_30px_rgba(var(--primary),0.3)] transition-all hover:scale-[1.02]"
            >
              Start Mock Test Now
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (isSubmitted) {
    const stats = calculateScore();
    const accuracy = stats.correct > 0 ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) : 0;

    return (
      <Layout title="Test Results | Practice Lab" hideNavbar hideFooter>
        <div className="min-h-screen bg-black pt-10 pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-4 bg-primary/20 text-primary rounded-full mb-6">
                <BarChart3 className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Performance Report</h1>
              <p className="text-xl text-muted-foreground">Here is your detailed analysis for the mock test.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-card/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center">
                <div className="text-5xl font-black text-white mb-2">{stats.correct}</div>
                <div className="text-sm uppercase tracking-widest text-green-400 font-bold">Correct</div>
              </div>
              <div className="bg-card/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center">
                <div className="text-5xl font-black text-white mb-2">{stats.incorrect}</div>
                <div className="text-sm uppercase tracking-widest text-rose-400 font-bold">Incorrect</div>
              </div>
              <div className="bg-card/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center">
                <div className="text-5xl font-black text-white mb-2">{stats.unattempted}</div>
                <div className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Skipped</div>
              </div>
              <div className="bg-card/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10"></div>
                <div className="text-5xl font-black text-primary mb-2 relative z-10">{accuracy}%</div>
                <div className="text-sm uppercase tracking-widest text-primary font-bold relative z-10">Accuracy</div>
              </div>
            </div>

            {/* Detailed Solutions */}
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <CheckCircle2 className="text-primary" /> Detailed Solutions
            </h2>
            
            <div className="space-y-6">
              {mockTestQuestions.map((q, idx) => {
                const isAttempted = answers[q.id] !== undefined;
                const isCorrect = isAttempted && answers[q.id] === q.correctAnswer;
                
                return (
                  <div key={q.id} className={`p-6 md:p-8 rounded-3xl border ${isCorrect ? 'bg-green-500/5 border-green-500/20' : isAttempted ? 'bg-rose-500/5 border-rose-500/20' : 'bg-white/5 border-white/10'}`}>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{q.section}</span>
                      </div>
                      <div className="flex gap-2">
                        {!isAttempted ? (
                          <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold uppercase">Skipped</span>
                        ) : isCorrect ? (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-bold uppercase flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Correct
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-rose-500/20 text-rose-400 rounded-lg text-xs font-bold uppercase flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> Incorrect
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-medium mb-6 text-white/90">{q.question}</h3>
                    
                    <div className="grid md:grid-cols-2 gap-3 mb-8">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = answers[q.id] === oIdx;
                        const isActualCorrect = q.correctAnswer === oIdx;
                        let optionClass = "bg-white/5 border-white/5";
                        
                        if (isActualCorrect) optionClass = "bg-green-500/20 border-green-500/50 text-green-200";
                        else if (isSelected && !isActualCorrect) optionClass = "bg-rose-500/20 border-rose-500/50 text-rose-200";
                        
                        return (
                          <div key={oIdx} className={`p-4 rounded-xl border flex items-center gap-3 ${optionClass}`}>
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs
                              ${isActualCorrect ? 'border-green-400 bg-green-400/20' : isSelected ? 'border-rose-400 bg-rose-400/20' : 'border-white/20'}
                            `}>
                              {String.fromCharCode(65 + oIdx)}
                            </div>
                            <span className={isActualCorrect || isSelected ? 'font-medium' : 'text-white/70'}>{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="p-5 rounded-2xl bg-blue-900/20 border border-blue-500/20">
                      <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" /> Explanation
                      </p>
                      <p className="text-white/80 leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Button onClick={() => window.location.href = "/practice-lab"} size="lg" variant="outline" className="rounded-full">
                Back to Practice Lab
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ACTIVE TEST UI
  return (
    <Layout title="Live Test | Edunachal" hideNavbar hideFooter>
      <div className="flex flex-col h-screen bg-black overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 bg-black/50 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8 shrink-0 z-20">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <LayoutGrid className="w-5 h-5" />
            </Button>
            <div className="font-bold text-lg hidden sm:block">Edunachal Mock Test</div>
          </div>
          
          <div className="flex-1 overflow-x-auto no-scrollbar mx-4 hidden md:flex items-center justify-center gap-2">
            {SECTIONS.map(sec => (
              <button
                key={sec}
                onClick={() => navigateToSection(sec)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeSection === sec 
                    ? "bg-primary/20 text-primary border border-primary/30" 
                    : "text-muted-foreground hover:bg-white/5 border border-transparent"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-bold ${timeLeft < 300 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse' : 'bg-white/10 text-white'}`}>
              <Clock className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
            <Button onClick={handleSubmitTest} variant="destructive" className="rounded-full font-bold">
              Submit
            </Button>
          </div>
        </header>

        {/* Main Workspace */}
        <div className="flex flex-1 overflow-hidden relative">
          
          {/* Question Area */}
          <main className="flex-1 flex flex-col relative overflow-y-auto custom-scrollbar">
            {/* Mobile Sections dropdown/scroller */}
            <div className="md:hidden flex overflow-x-auto p-4 gap-2 border-b border-white/5 shrink-0 no-scrollbar">
              {SECTIONS.map(sec => (
                <button
                  key={sec}
                  onClick={() => navigateToSection(sec)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                    activeSection === sec ? "bg-primary/20 text-primary border border-primary/30" : "bg-white/5 text-muted-foreground"
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>

            <div className="flex-1 p-6 md:p-10 lg:p-16 max-w-4xl mx-auto w-full">
              <div className="flex items-center justify-between mb-8">
                <span className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
                  Question {currentIndex + 1} of {mockTestQuestions.length}
                </span>
                <span className="px-3 py-1 rounded bg-white/5 text-xs text-muted-foreground border border-white/10">
                  {currentQuestion.section}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-medium leading-relaxed mb-10 text-white/90">
                {currentQuestion.question}
              </h2>

              <div className="space-y-4">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = answers[currentQuestion.id] === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      className={`group relative p-5 rounded-2xl border cursor-pointer transition-all duration-200 overflow-hidden ${
                        isSelected 
                          ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(var(--primary),0.15)]" 
                          : "bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.05]"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                      )}
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold transition-colors ${
                          isSelected ? "bg-primary text-white border-primary" : "border-white/20 text-muted-foreground group-hover:border-white/50"
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className={`text-lg ${isSelected ? "text-white font-medium" : "text-white/80"}`}>{opt}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-auto border-t border-white/10 bg-black/80 backdrop-blur-lg p-4 md:p-6 flex items-center justify-between sticky bottom-0 z-10">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleMarkForReview} 
                  className={`rounded-xl gap-2 ${marked[currentQuestion.id] ? 'bg-purple-500/20 text-purple-400 border-purple-500/50 hover:bg-purple-500/30' : ''}`}
                >
                  <Flag className={`w-4 h-4 ${marked[currentQuestion.id] ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">Mark for Review</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => handleOptionSelect(undefined as any)} // Clear logic: if undefined it will break the score calculation later, let's actually delete the key
                  className="rounded-xl hidden md:flex"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Clear
                </Button>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="secondary" 
                  size="lg"
                  disabled={currentIndex === 0} 
                  onClick={() => setCurrentIndex(c => c - 1)}
                  className="rounded-xl"
                >
                  <ChevronLeft className="w-5 h-5 sm:mr-1" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>
                <Button 
                  size="lg"
                  onClick={() => {
                    if (currentIndex < mockTestQuestions.length - 1) {
                      setCurrentIndex(c => c + 1);
                    } else {
                      handleSubmitTest();
                    }
                  }}
                  className="rounded-xl bg-primary hover:bg-primary/90 text-white min-w-[120px]"
                >
                  {currentIndex === mockTestQuestions.length - 1 ? 'Submit' : (
                    <>
                      <span className="hidden sm:inline">Save & Next</span>
                      <span className="sm:hidden">Next</span>
                      <ChevronRight className="w-5 h-5 sm:ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className={`absolute lg:relative right-0 top-0 bottom-0 w-72 bg-zinc-950 border-l border-white/10 z-30 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/50">
                <span className="font-bold">Question Palette</span>
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="p-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground border-b border-white/5">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-500"></div> Answered</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded border border-white/20"></div> Not Answered</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-purple-500"></div> Marked</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white/20"></div> Not Visited</div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {SECTIONS.map(section => (
                  <div key={section} className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">{section}</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {mockTestQuestions.map((q, idx) => {
                        if (q.section !== section) return null;
                        
                        const isAns = answers[q.id] !== undefined;
                        const isMark = marked[q.id];
                        const isCur = currentIndex === idx;
                        
                        let bgClass = "border border-white/10 hover:border-white/40";
                        if (isMark) bgClass = "bg-purple-500 text-white border-purple-500";
                        else if (isAns) bgClass = "bg-green-500 text-white border-green-500";
                        
                        if (isCur) bgClass += " ring-2 ring-white ring-offset-2 ring-offset-black";

                        return (
                          <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${bgClass}`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          
          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div className="absolute inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MockTest;
