import Navbar from "./landing/Navbar";
import Footer from "./landing/Footer";
import WhatsAppButton from "./WhatsAppButton";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ children, title, description }: LayoutProps) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Edunachal`;
    }
    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [title, description]);

  return (
    <main className="relative noise overflow-x-clip min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Layout;
