import { Link } from "react-router-dom";
import { Instagram, Youtube, Linkedin, Facebook, ArrowRight } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/edunachal/" },
  { icon: Facebook, href: "https://www.facebook.com/edunachal/" },
  { icon: Youtube, href: "https://www.youtube.com/@edunachalofficial" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/edunachal/" },
];
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logoMark from "@/assets/edunachal-mark.png";

const cols = [
  { 
    title: "Courses", 
    links: [
      { name: "UPSC", path: "/courses/upsc-cse" },
      { name: "APSC", path: "/courses/state-psc" },
      { name: "SSC", path: "/courses/ssc" },
      { name: "Banking", path: "/courses/banking" },
      { name: "NEET", path: "/courses/neet-ug" },
      { name: "IIT-JEE", path: "/courses/iit-jee" }
    ] 
  },
  { 
    title: "Company", 
    links: [
      { name: "About", path: "/about" },
      { name: "Mentors", path: "/#mentors" },
      { name: "Careers", path: "/careers" },
      { name: "Resources", path: "/resources" },
      { name: "Exam Alerts", path: "/exam-notifications" }
    ] 
  },
  { 
    title: "Support", 
    links: [
      { name: "Help center", path: "#" },
      { name: "Contact", path: "/contact" },
      { name: "Refund policy", path: "/terms-and-conditions" },
      { name: "Terms", path: "/terms-and-conditions" },
      { name: "Privacy", path: "/privacy-policy" }
    ] 
  },
];

const Footer = () => (
  <footer className="relative pt-20 pb-10 border-t border-white/5">
    <div className="container">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg">
            <img src={logoMark} alt="Edunachal" className="w-9 h-9 object-contain drop-shadow-[0_0_12px_hsl(262_83%_58%/0.5)]" />
            Edunachal
          </Link>
          <p className="mt-4 text-muted-foreground max-w-md">
            The future of competitive exam prep, built with mentorship, intelligence and obsessive design.
          </p>
          <form className="mt-6 flex items-center gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="you@aspirant.in"
              className="h-12 rounded-full bg-white/5 border-white/10 placeholder:text-muted-foreground"
            />
            <Button type="submit" className="btn-glow rounded-full h-12 px-5 text-white border-0">
              Subscribe <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 grid place-items-center rounded-full glass hover:bg-white/10 transition"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{c.title}</div>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.name}>
                    {(l.path.startsWith("/") && !l.path.includes("#")) ? (
                      <Link to={l.path} className="text-sm text-foreground/85 hover:text-foreground transition">{l.name}</Link>
                    ) : (
                      <a href={l.path} className="text-sm text-foreground/85 hover:text-foreground transition">{l.name}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Edunachal. All rights reserved.</div>
        <div className="text-xs text-muted-foreground">Crafted with intent in India.</div>
      </div>
    </div>
  </footer>
);

export default Footer;
