import { useState } from "react";
import Layout from "@/components/Layout";
import { exams, ExamDetail } from "@/data/exams";
import { Bell, Calendar, ExternalLink, ArrowRight, Search, Filter, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

const ExamNotifications = () => {
  const [selectedExam, setSelectedExam] = useState<ExamDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(exams.map(exam => exam.category)));

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? exam.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout 
      title="Exam Notifications" 
      description="Stay updated with the latest government exam notifications, application dates, and exam schedules across India."
    >
      <div className="container pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs uppercase tracking-widest text-secondary mb-6">
            <Bell className="w-3.5 h-3.5 animate-ring" /> Live Exam Alerts
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-gradient mb-8">
            Never miss an <span className="text-gradient-brand">Opportunity</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real-time updates on UPSC, State PSCs, Banking, Railways, and other major government exams across India.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-5xl mx-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search for exam name or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-11 rounded-2xl bg-white/5 border-white/10"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 rounded-2xl border-white/10 px-6 gap-2 glass hover:bg-white/10">
                <Filter className="w-4 h-4" /> 
                {selectedCategory || "Filter by Category"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass-strong border-white/10 text-foreground">
              <DropdownMenuLabel>Exam Categories</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem 
                onClick={() => setSelectedCategory(null)}
                className="hover:bg-white/10 cursor-pointer"
              >
                All Categories
              </DropdownMenuItem>
              {categories.map((cat) => (
                <DropdownMenuItem 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="hover:bg-white/10 cursor-pointer"
                >
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Exam List */}
        <div className="grid gap-6 max-w-5xl mx-auto">
          {filteredExams.map((exam) => (
            <div key={exam.id} className="premium-panel ring-grad rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 group">
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                    {exam.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 text-secondary" /> Posted on {exam.notificationDate}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold group-hover:text-primary transition">{exam.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{exam.description}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2">
                  <DateBox label="Last Date" date={exam.lastDateToApply} variant="danger" />
                  <DateBox label="Exam Date" date={exam.examDate} variant="success" />
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-[200px]">
                <Button className="btn-glow rounded-full h-12 border-0 text-white gap-2" asChild>
                  <a href={exam.officialLink} target="_blank" rel="noopener noreferrer">
                    Official Notice <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedExam(exam)}
                  className="rounded-full h-12 hover:bg-white/5 group-hover:translate-x-1 transition-transform"
                >
                  Full Details <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
          {filteredExams.length === 0 && (
            <div className="text-center py-20 glass rounded-3xl">
              <p className="text-muted-foreground">No exams found matching your search.</p>
            </div>
          )}
        </div>
        
      </div>

      {/* Exam Details Modal */}
      <AnimatePresence>
        {selectedExam && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExam(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto premium-panel ring-grad rounded-[2.5rem] bg-slate-950 p-8 md:p-12 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedExam(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-10">
                <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                  {selectedExam.category}
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-extrabold text-gradient mt-6 mb-4">
                  {selectedExam.name}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {selectedExam.description}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="glass p-6 rounded-2xl">
                  <h4 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Eligibility</h4>
                  <ul className="space-y-3">
                    {selectedExam.eligibility.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass p-6 rounded-2xl">
                  <h4 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Exam Pattern</h4>
                  <ul className="space-y-3">
                    {selectedExam.pattern.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass p-6 rounded-2xl">
                  <h4 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Syllabus Highlights</h4>
                  <ul className="space-y-3">
                    {selectedExam.syllabus.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-glow rounded-full px-8 text-white border-0 flex-1" asChild>
                  <a href={selectedExam.officialLink} target="_blank" rel="noopener noreferrer">
                    Visit Official Portal <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" onClick={() => setSelectedExam(null)} className="rounded-full px-8 border-white/10 flex-1">
                  Close Details
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

const DateBox = ({ label, date, variant }: { label: string, date: string, variant: 'default' | 'danger' | 'success' }) => (
  <div>
    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
    <div className={`text-sm font-bold ${
      variant === 'danger' ? "text-red-400" : variant === 'success' ? "text-emerald-400" : "text-white"
    }`}>
      {date}
    </div>
  </div>
);

export default ExamNotifications;
