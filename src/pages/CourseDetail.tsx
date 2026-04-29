import Layout from "@/components/Layout";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";

const CourseDetail = () => {
  const { slug } = useParams();
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    return <Navigate to="/#courses" replace />;
  }

  const Icon = course.icon;

  return (
    <Layout
      title={`${course.title} Preparation`}
      description={`${course.title} preparation with expert mentorship, mock tests, study material and structured guidance.`}
    >
      <div className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <div aria-hidden className="absolute -left-24 top-12 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div aria-hidden className="absolute -right-24 bottom-24 -z-10 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />

        <section className="container pt-32 pb-8 md:pt-40 md:pb-12">
          <div className="flex items-center justify-between mb-8">
            <Button asChild variant="ghost" className="rounded-full glass hover:bg-white/10">
              <a href="/#courses">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All courses
              </a>
            </Button>
          </div>

          <div className="grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs uppercase tracking-widest text-subtle-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" /> {course.tag}
              </span>
              <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.05] text-gradient md:text-6xl">
                {course.title} <span className="text-gradient-brand">Preparation</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{course.overview}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="btn-glow rounded-full border-0 px-7 text-white">
                  <Link to="/book-call">
                    Book Free Strategy Call <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="rounded-full glass hover:bg-white/10">
                  <a href="/#courses">Explore other courses</a>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="premium-panel ring-grad rounded-[2rem] p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-accent">Course Snapshot</div>
                    <h2 className="font-display text-2xl font-bold">{course.title}</h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Snapshot icon={<Clock3 className="h-4 w-4" />} title="Duration" text={course.duration} />
                  <Snapshot icon={<Layers3 className="h-4 w-4" />} title="Mode" text="Online live, offline classroom in select locations, and hybrid learning." />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 pb-20 lg:grid-cols-3">
            <InfoList title="Key Highlights" items={course.highlights} />
            <InfoList title="Course Structure" items={course.structure} />
            <InfoList title="Who Should Enroll" items={course.idealFor} />
          </div>
        </section>
      </div>
    </Layout>
  );
};

const Snapshot = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
    <div className="flex items-center gap-2 text-sm font-semibold">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-secondary">{icon}</span>
      {title}
    </div>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
  </div>
);

const InfoList = ({ title, items }: { title: string; items: string[] }) => (
  <div className="premium-panel rounded-3xl p-6">
    <h3 className="font-display text-xl font-bold">{title}</h3>
    <ul className="mt-4 grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default CourseDetail;
