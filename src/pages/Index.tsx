import Layout from "@/components/Layout";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import CoursesSection from "@/components/landing/CoursesSection";
import WhyUs from "@/components/landing/WhyUs";
import Results from "@/components/landing/Results";
import SmartLearning from "@/components/landing/SmartLearning";
import Mentors from "@/components/landing/Mentors";
import CTA from "@/components/landing/CTA";

const Index = () => {
  return (
    <Layout
      title="Future-ready learning for serious aspirants"
      description="Premium EdTech for UPSC, State PCS, SSC, Banking, NEET & JEE. Mentorship, smart test series and an AI-grade analytics layer built for top ranks."
    >
      <Hero />
      <SocialProof />
      <CoursesSection />
      <WhyUs />
      <Results />
      <SmartLearning />
      <Mentors />
      <CTA />
    </Layout>
  );
};

export default Index;
