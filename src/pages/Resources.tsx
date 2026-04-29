import { useState } from "react";
import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Play, FileText, Brain, CheckCircle2, XCircle, ArrowRight, Download, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { quizzes, studyMaterials, videoResources, Quiz } from "@/data/resources";

const Resources = () => {
  const [activeTab, setActiveTab] = useState<'videos' | 'materials' | 'quizzes'>('videos');
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  return (
    <Layout 
      title="Resources" 
      description="Access premium study materials, videos, and practice quizzes for UPSC, JEE, NEET, and more."
    >
      <div className="container pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-gradient mb-6">Learning Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to master your exams. Updated regularly by our expert faculty.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-2xl glass border-white/5">
            <TabButton 
              active={activeTab === 'videos'} 
              onClick={() => setActiveTab('videos')} 
              icon={<Play className="w-4 h-4" />}
              label="Videos"
            />
            <TabButton 
              active={activeTab === 'materials'} 
              onClick={() => setActiveTab('materials')} 
              icon={<FileText className="w-4 h-4" />}
              label="Study Materials"
            />
            <TabButton 
              active={activeTab === 'quizzes'} 
              onClick={() => setActiveTab('quizzes')} 
              icon={<Brain className="w-4 h-4" />}
              label="Practice Quizzes"
            />
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'videos' && (
            <motion.div 
              key="videos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {videoResources.map((video) => (
                <div key={video.id} className="premium-panel rounded-3xl overflow-hidden group">
                  <div className="relative aspect-video">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-[10px] rounded text-white flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {video.duration}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{video.category}</span>
                    <h3 className="font-bold text-lg mt-1 group-hover:text-primary transition">{video.title}</h3>
                    <Button variant="link" className="p-0 h-auto mt-4 text-sm" asChild>
                      <a href={video.url} target="_blank" rel="noopener noreferrer">Watch on YouTube <ArrowRight className="w-4 h-4 ml-1" /></a>
                    </Button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'materials' && (
            <motion.div 
              key="materials"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {studyMaterials.map((material) => (
                <div key={material.id} className="glass rounded-3xl p-6 hover:bg-white/5 transition border-white/5 hover:border-primary/20">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{material.category} • {material.type}</span>
                  <h3 className="font-bold text-xl mt-2">{material.title}</h3>
                  <Button variant="outline" className="w-full mt-6 rounded-xl border-white/10 hover:bg-white/10" asChild>
                    <a href={material.url}><Download className="w-4 h-4 mr-2" /> Download Now</a>
                  </Button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'quizzes' && (
            <motion.div 
              key="quizzes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {!activeQuiz ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className="premium-panel ring-grad rounded-3xl p-6 flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                          <Brain className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-accent font-bold">{quiz.category}</span>
                        <h3 className="font-bold text-xl mt-2">{quiz.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{quiz.questions.length} Questions • Instant Results</p>
                      </div>
                      <Button onClick={() => setActiveQuiz(quiz)} className="w-full mt-8 rounded-xl btn-glow border-0 text-white">
                        Start Quiz
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <QuizInterface quiz={activeQuiz} onBack={() => setActiveQuiz(null)} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

const TabButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition ${
      active ? "bg-gradient-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-white"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const QuizInterface = ({ quiz, onBack }: { quiz: Quiz, onBack: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = quiz.questions[currentStep];

  const handleNext = () => {
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }

    if (currentStep < quiz.questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 premium-panel rounded-[2rem] p-10 ring-grad">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="font-display text-4xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-xl text-muted-foreground mb-8">
          You scored <span className="text-white font-bold">{score}</span> out of <span className="text-white font-bold">{quiz.questions.length}</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onBack} variant="outline" className="rounded-full px-8 h-12 border-white/10">Back to Resources</Button>
          <Button onClick={() => {
            setCurrentStep(0);
            setSelectedAnswer(null);
            setScore(0);
            setIsFinished(false);
          }} className="btn-glow rounded-full px-8 h-12 border-0 text-white">Restart Quiz</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Button onClick={onBack} variant="ghost" className="mb-6 rounded-full hover:bg-white/5">
        <ArrowRight className="w-4 h-4 rotate-180 mr-2" /> Back
      </Button>

      <div className="premium-panel rounded-[2rem] p-8 md:p-12 ring-grad">
        <div className="flex justify-between items-center mb-8">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Question {currentStep + 1} of {quiz.questions.length}</span>
          <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-primary transition-all duration-300" 
              style={{ width: `${((currentStep + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="font-display text-2xl font-bold mb-8">{question.question}</h3>

        <div className="grid gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              className={`p-5 rounded-2xl text-left transition border-2 ${
                selectedAnswer === index 
                  ? "border-primary bg-primary/5 text-white" 
                  : "border-white/5 bg-white/[0.02] hover:bg-white/5 text-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                  selectedAnswer === index ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </div>
            </button>
          ))}
        </div>

        <Button 
          onClick={handleNext} 
          disabled={selectedAnswer === null}
          className="w-full mt-12 h-14 rounded-2xl btn-glow border-0 text-white font-bold text-lg"
        >
          {currentStep === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
        </Button>
      </div>
    </div>
  );
};

export default Resources;
