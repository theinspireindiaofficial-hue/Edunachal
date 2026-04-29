import Layout from "@/components/Layout";
import { Mail, Briefcase, GraduationCap, Code, Video, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  { icon: GraduationCap, title: "Subject Experts", area: "UPSC, State PSCs, SSC, NEET, JEE, CUET, TET" },
  { icon: Briefcase, title: "Academic Content Writers", area: "English & Hindi" },
  { icon: Video, title: "Media & Design", area: "Graphic Designers & Video Editors" },
  { icon: Users, title: "Growth & Support", area: "Marketing, Sales & Student Counselors" },
  { icon: Code, title: "Technology", area: "Full-Stack Developers & LMS Experts" },
];

const Careers = () => {
  return (
    <Layout 
      title="Careers" 
      description="Join the movement to make quality education accessible to every corner of India."
    >
      <div className="container pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs uppercase tracking-widest text-subtle-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" /> Join the Mission
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight text-gradient mb-8">
            Shape the future of <br /><span className="text-gradient-brand">Indian Education</span>.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We’re looking for passionate individuals who want to make a difference — educators, technologists, content creators, and innovators.
          </p>
        </div>

        <div className="grid gap-12 max-w-5xl mx-auto">
          <section className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="premium-panel ring-grad rounded-[2rem] p-8">
              <h3 className="font-display text-2xl font-bold mb-6">Why Work With Us?</h3>
              <ul className="space-y-4">
                {[
                  "Be part of a DPIIT-recognized startup making real impact",
                  "Collaborate with top educators and mentors from across India",
                  "Flexible work culture with remote and hybrid roles",
                  "Competitive compensation with growth-focused roles",
                  "Work that matters — shape someone’s future every day"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span className="h-5 w-5 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary text-[10px]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="glass rounded-[2rem] p-8 flex flex-col justify-center bg-gradient-to-br from-primary/5 to-transparent">
              <h3 className="font-display text-2xl font-bold mb-4">Didn’t find a role?</h3>
              <p className="text-muted-foreground mb-8">
                We’re always open to fresh talent. Tell us how you can contribute to the Edunachal movement.
              </p>
              <Button asChild className="btn-glow rounded-full h-12 w-full sm:w-fit text-white border-0">
                <a href="mailto:edunachalofficial@gmail.com" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email your resume
                </a>
              </Button>
            </div>
          </section>

          <section>
            <h3 className="font-display text-2xl font-bold mb-8 text-center">Open Roles</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role, i) => (
                <div key={i} className="glass rounded-2xl p-6 hover:bg-white/5 transition-colors border-white/5 hover:border-white/10 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors mb-4">
                    <role.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{role.title}</h4>
                  <p className="text-sm text-muted-foreground">{role.area}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Careers;
