import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import CoursesSection from "@/components/landing/CoursesSection";
import WhyUs from "@/components/landing/WhyUs";
import Results from "@/components/landing/Results";
import SmartLearning from "@/components/landing/SmartLearning";
import Mentors from "@/components/landing/Mentors";
import Resources from "@/components/landing/Resources";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Edunachal — Future-ready learning for serious aspirants";
    const desc = "Premium EdTech for UPSC, APSC, SSC, Banking, NEET & JEE. Mentorship, smart test series and an AI-grade analytics layer built for top ranks.";
    let m = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
    m.content = desc;
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = window.location.origin + "/";
  }, []);

  return (
    <main className="relative noise overflow-x-clip">
      <Navbar />
      <Hero />
      <SocialProof />
      <CoursesSection />
      <WhyUs />
      <Results />
      <SmartLearning />
      <Mentors />
      <Resources />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
