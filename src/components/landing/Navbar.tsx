import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoMark from "@/assets/edunachal-mark.png";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Courses", href: "/#courses" },
  { label: "Resources", href: "/resources" },
  { label: "Practice Lab", href: "/practice-lab" },
  { label: "Exam Alerts", href: "/exam-notifications" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-soft" : "bg-white/[0.02] border border-white/[0.04]"
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg">
            <span className="relative grid place-items-center w-9 h-9 rounded-xl">
              <span aria-hidden className="absolute inset-0 rounded-xl bg-gradient-primary opacity-40 blur-md" />
              <img src={logoMark} alt="Edunachal" className="relative w-9 h-9 object-contain drop-shadow-[0_0_12px_hsl(262_83%_58%/0.6)]" />
            </span>
            <span className="tracking-tight">Edunachal</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                {(link.href.startsWith("/") && !link.href.includes("#")) ? (
                  <Link
                    to={link.href}
                    className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Button asChild className="btn-glow rounded-full px-5 text-white border-0">
              <Link to="/book-call">Book Call</Link>
            </Button>
          </div>

          <button
            className="lg:hidden grid place-items-center w-10 h-10 rounded-xl glass"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden mt-3 glass-strong rounded-2xl p-4"
            >
              <ul className="flex flex-col">
                {links.map((l) => (
                  <li key={l.href}>
                    {(l.href.startsWith("/") && !l.href.includes("#")) ? (
                      <Link
                        to={l.href}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-3 text-base text-subtle-foreground hover:bg-white/5 rounded-xl"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-3 text-base text-subtle-foreground hover:bg-white/5 rounded-xl"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
                <li className="mt-2">
                  <Button asChild className="btn-glow w-full rounded-full text-white border-0">
                    <Link to="/book-call" onClick={() => setOpen(false)}>Book Call</Link>
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
