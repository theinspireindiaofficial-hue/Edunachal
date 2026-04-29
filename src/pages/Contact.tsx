import Layout from "@/components/Layout";
import { Mail, Phone, MapPin, Clock, MessageSquare, Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <Layout 
      title="Contact Us" 
      description="Get in touch with Edunachal. We'd love to hear from you!"
    >
      <div className="container pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs uppercase tracking-widest text-subtle-foreground mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" /> Get in touch
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight text-gradient mb-6">
              We’d love to <span className="text-gradient-brand">hear from you</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you have a question, need support, or want to explore collaboration, feel free to reach out.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="premium-panel ring-grad rounded-[2rem] p-8">
                <h3 className="font-display text-2xl font-bold mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  <ContactItem 
                    icon={<Phone className="w-5 h-5" />} 
                    title="Phone" 
                    value="+91 76289 28150" 
                    href="tel:+917628928150"
                  />
                  <ContactItem 
                    icon={<Mail className="w-5 h-5" />} 
                    title="Email" 
                    value="edunachalofficial@gmail.com" 
                    href="mailto:edunachalofficial@gmail.com"
                  />
                  <ContactItem 
                    icon={<MapPin className="w-5 h-5" />} 
                    title="Office Address" 
                    value="Edunachal / Tekhlym Private Limited, T 06, B - 10 Sector - 2 Noida india" 
                  />
                </div>
              </div>

              <div className="glass rounded-[2rem] p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Business Hours</h4>
                    <p className="text-sm text-muted-foreground">Monday — Saturday, 10 AM — 7 PM</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <h4 className="font-bold mb-4">Follow Us</h4>
                  <div className="flex items-center gap-3">
                    {[
                      { icon: Instagram, href: "https://www.instagram.com/edunachal/" },
                      { icon: Facebook, href: "https://www.facebook.com/edunachal/" },
                      { icon: Youtube, href: "https://www.youtube.com/@edunachalofficial" },
                      { icon: Linkedin, href: "https://www.linkedin.com/company/edunachal/" },
                    ].map((social, i) => (
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
              </div>
            </div>

            <div className="glass rounded-[2rem] p-8 md:p-10 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Quick Support</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Need immediate help with your course? Our support team is available via email and phone to assist you with any technical or academic queries.
              </p>
              
              <div className="grid gap-4">
                <Button asChild className="btn-glow rounded-full h-12 text-white border-0">
                  <a href="mailto:edunachalofficial@gmail.com">Email Support</a>
                </Button>
                <Button variant="outline" asChild className="rounded-full h-12 border-white/10 bg-white/5 hover:bg-white/10">
                  <a href="/book-call">Book a Strategy Call</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const ContactItem = ({ icon, title, value, href }: { icon: React.ReactNode; title: string; value: string; href?: string }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground shrink-0">
      {icon}
    </div>
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{title}</div>
      {href ? (
        <a href={href} className="text-lg font-medium hover:text-primary transition-colors">{value}</a>
      ) : (
        <p className="text-lg font-medium leading-tight">{value}</p>
      )}
    </div>
  </div>
);

export default Contact;
