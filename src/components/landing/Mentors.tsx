import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHead } from "./CoursesSection";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import aaravImage from "@/assets/mentors/mentor-aarav.svg";
import kavyaImage from "@/assets/mentors/mentor-kavya.svg";
import rohanImage from "@/assets/mentors/mentor-rohan.svg";
import riyaImage from "@/assets/mentors/mentor-riya.svg";

const mentors = [
  { name: "Dr. Aarav Mehta", role: "UPSC GS Faculty", exp: "12+ yrs", subj: "Polity & Governance", image: aaravImage },
  { name: "Prof. Kavya Iyer", role: "JEE Mathematics", exp: "10+ yrs", subj: "Calculus & Algebra", image: kavyaImage },
  { name: "Dr. Rohan Bhatt", role: "NEET Biology", exp: "9+ yrs", subj: "Botany & Genetics", image: rohanImage },
  { name: "Ms. Riya Kapoor", role: "Banking & SSC", exp: "8+ yrs", subj: "Quant & Reasoning", image: riyaImage },
  { name: "Prof. Neel Dutta", role: "Current Affairs", exp: "11+ yrs", subj: "Essay & Analysis", image: aaravImage },
  { name: "Dr. Meera Sen", role: "NEET Chemistry", exp: "9+ yrs", subj: "Organic Chemistry", image: kavyaImage },
  { name: "Mr. Arjun Rao", role: "SSC & Banking", exp: "10+ yrs", subj: "Reasoning Mastery", image: rohanImage },
  { name: "Prof. Tara Singh", role: "APSC Mentor", exp: "8+ yrs", subj: "State GS & Interview", image: riyaImage },
];

const Mentors = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const timer = window.setInterval(() => api.scrollNext(), 4200);
    return () => window.clearInterval(timer);
  }, [api]);

  return (
    <section id="mentors" className="relative py-28">
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            eyebrow="Mentors"
            title={<>Learn from <span className="text-gradient-brand">the best in the country</span></>}
            subtitle="Faculty who've cracked, taught and mentored thousands of selections."
            align="left"
          />

          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => api?.scrollPrev()}
              className="h-11 w-11 rounded-full glass hover:bg-white/10"
              aria-label="Previous mentor"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              onClick={() => api?.scrollNext()}
              className="btn-glow h-11 w-11 rounded-full border-0 text-white"
              aria-label="Next mentor"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true, dragFree: true }}
          className="mt-14"
        >
          <div className="relative">
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
            <CarouselContent className="-ml-5">
              {mentors.map((mentor, i) => (
                <CarouselItem key={mentor.name} className="pl-5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <MentorCard mentor={mentor} index={i} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

const MentorCard = ({ mentor, index }: { mentor: typeof mentors[number]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, delay: (index % 4) * 0.06 }}
    whileHover={{ y: -6 }}
    className="group premium-panel rounded-3xl p-5 ring-grad relative overflow-hidden"
  >
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
      <img
        src={mentor.image}
        alt={`${mentor.name}, ${mentor.role}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.6))]" />
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-white/80">{mentor.exp}</span>
        <span className="text-[10px] uppercase tracking-widest text-white/80">Mentor</span>
      </div>
      <motion.div
        initial={false}
        animate={{ x: ["-120%", "120%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
        className="absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 opacity-0 group-hover:opacity-100"
      />
    </div>
    <div className="mt-4">
      <div className="font-display font-bold">{mentor.name}</div>
      <div className="text-xs text-muted-foreground">{mentor.role}</div>
      <div className="text-xs mt-1 text-subtle-foreground">{mentor.subj}</div>
    </div>
  </motion.div>
);

export default Mentors;
