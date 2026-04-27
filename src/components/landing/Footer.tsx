import { Twitter, Instagram, Youtube, Linkedin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logoMark from "@/assets/edunachal-mark.png";

const cols = [
  { title: "Courses", links: ["UPSC", "APSC", "SSC", "Banking", "NEET", "IIT-JEE"] },
  { title: "Company", links: ["About", "Mentors", "Careers", "Press", "Partners"] },
  { title: "Support", links: ["Help center", "Contact", "Refund policy", "Terms", "Privacy"] },
];

const Footer = () => (
  <footer className="relative pt-20 pb-10 border-t border-white/5">
    <div className="container">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <a href="#home" className="flex items-center gap-2.5 font-display font-bold text-lg">
            <img src={logoMark} alt="Edunachal" className="w-9 h-9 object-contain drop-shadow-[0_0_12px_hsl(262_83%_58%/0.5)]" />
            Edunachal
          </a>
          <p className="mt-4 text-muted-foreground max-w-md">
            The future of competitive exam prep — built with mentorship, intelligence and obsessive design.
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
            {[Twitter, Instagram, Youtube, Linkedin].map((I, i) => (
              <a key={i} href="#" className="w-10 h-10 grid place-items-center rounded-full glass hover:bg-white/10 transition">
                <I className="w-4 h-4" />
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
                  <li key={l}>
                    <a href="#" className="text-sm text-foreground/85 hover:text-foreground transition">{l}</a>
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
