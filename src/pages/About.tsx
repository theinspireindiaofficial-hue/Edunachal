import Layout from "@/components/Layout";
import { ArrowRight, Target, Globe, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <Layout 
      title="About Us" 
      description="Edunachal is a pioneering EdTech platform reshaping education across Northeast India and beyond."
    >
      <div className="container pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs uppercase tracking-widest text-subtle-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" /> Our Story
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight text-gradient mb-8">
            Empowering the next generation of <span className="text-gradient-brand">India's leaders</span>.
          </h1>
          
          <div className="grid gap-12">
            <section className="premium-panel ring-grad rounded-[2rem] p-8 md:p-12 shadow-soft">
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6">
                Edunachal is a pioneering EdTech platform launched by <span className="text-foreground font-semibold">Tekhlym Pvt. Ltd.</span>, a DPIIT-recognized startup under the Government of India. What began as a bold initiative from the hills of Arunachal Pradesh has grown into a movement reshaping education across Northeast India — and now, expanding pan India.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                Founded with the vision of bridging the learning gap in remote and underrepresented regions, Edunachal empowers students by offering affordable, accessible, and high-quality education for a wide range of competitive exams including UPSC, State PSCs, SSC, Banking, TET, UGC-NET, CUET, NEET, JEE, and more.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass rounded-[2rem] p-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To combine expert faculty, AI-driven test platforms, and personalized mentorship to cater to diverse learner needs across the country.
                </p>
              </div>
              <div className="glass rounded-[2rem] p-8">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">Pan-India Presence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Headquartered in Nehru Place, New Delhi, we bridge the gap between grassroots talent and national-level excellence.
                </p>
              </div>
            </div>

            <section className="text-center py-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Beyond just exams</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                At Edunachal, we’re not just preparing students for exams — we’re building a generation of confident, capable, and future-ready youth from the grassroots to the national stage.
              </p>
              <div className="inline-flex items-center gap-4 p-1 rounded-full glass border-white/10">
                <span className="px-6 py-2 text-sm font-medium">Ready to start?</span>
                <a href="/#courses" className="btn-glow px-6 py-2 rounded-full text-sm font-bold text-white flex items-center gap-2">
                  Explore Courses <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
