import { Landmark, Banknote, Stethoscope, Atom, MapPin, Scale, ShieldCheck } from "lucide-react";

export const courses = [
  {
    slug: "upsc-cse",
    icon: Landmark,
    title: "UPSC CSE",
    desc: "IAS, IPS, IFS and IRS preparation from Prelims to Interview.",
    tag: "Flagship",
    overview:
      "The UPSC Civil Services Examination opens doors to India’s most prestigious services. Our program guides aspirants through Prelims, Mains and Personality Test preparation with strategy, mentorship and rigorous practice.",
    highlights: ["Complete GS, CSAT, Essay, Optional and Interview coverage", "Experienced educators, subject experts and retired civil servants", "Current affairs analysis, editorial reviews and updated notes", "Prelims and Mains mock tests with performance analysis"],
    structure: ["Prelims: foundation classes, current affairs and test series", "Mains: advanced classes, answer writing and subject notes", "Optional subjects: Public Administration, Sociology, History, Geography and more", "Interview: mock panels and personality development"],
    idealFor: ["Fresh graduates", "Working professionals", "Serious repeat aspirants", "Final-year students starting early"],
    duration: "Flexible programs from 3 months to 1 year",
  },
  {
    slug: "state-psc",
    icon: MapPin,
    title: "APSC / State PSC",
    desc: "State administrative services with state-specific strategy.",
    tag: "Regional",
    overview:
      "State PSC exams recruit candidates for respected administrative roles such as Deputy Collector, DSP, BDO and Tehsildar. Our program combines general studies, state-specific knowledge and current affairs.",
    highlights: ["State-specific syllabus coverage", "Mentors familiar with state history, culture and administration", "Prelims and Mains tests aligned with latest patterns", "State and national current affairs masterclasses"],
    structure: ["Prelims: State GK, current affairs and test series", "Mains: state-specific topics and answer writing practice", "Optional subject guidance", "Interview preparation with state-focused mock panels"],
    idealFor: ["Graduates targeting state services", "Aspirants preparing for Deputy Collector, DSP, BDO and related roles", "Working professionals seeking a government career", "Final-year students"],
    duration: "Flexible 3-month to 1-year options",
  },
  {
    slug: "neet-ug",
    icon: Stethoscope,
    title: "NEET UG",
    desc: "Physics, Chemistry and Biology coaching for medical aspirants.",
    tag: "Medical",
    overview:
      "NEET UG is the gateway to MBBS, BDS, AYUSH and other medical courses. Our program focuses on conceptual clarity, NCERT mastery, regular practice and confidence for the exam hall.",
    highlights: ["Physics, Chemistry, Botany and Zoology syllabus coverage", "NCERT-focused learning for maximum question coverage", "Topic-wise, unit-wise and full-length tests", "Daily doubts, concept boosters and personalized reports"],
    structure: ["Foundation course for Class 11 students", "Target course for Class 12 students", "Crash course for repeaters and revision", "Dedicated test series for final preparation"],
    idealFor: ["Class 11 and 12 medical aspirants", "NEET repeaters", "Students targeting top medical colleges", "Students needing structured concept clarity"],
    duration: "2-year, 1-year and 4-month crash course options",
  },
  {
    slug: "iit-jee",
    icon: Atom,
    title: "IIT-JEE",
    desc: "JEE Main and Advanced preparation with problem-first learning.",
    tag: "Engineering",
    overview:
      "IIT-JEE demands deep conceptual understanding, analytical thinking, speed and accuracy. Our program builds from NCERT fundamentals to advanced problem solving for JEE Main and Advanced.",
    highlights: ["Complete Physics, Chemistry and Mathematics coverage", "Faculty from IIT/NIT backgrounds and experienced subject experts", "NCERT basics plus Advanced-level practice", "Chapter-wise and full-length mock tests with analysis"],
    structure: ["2-year foundation course for Class 11", "1-year target course for Class 12", "Crash course for repeaters", "Test series for self-assessment and performance tracking"],
    idealFor: ["Class 11 and 12 engineering aspirants", "Students targeting IITs, NITs and IIITs", "Repeaters aiming for a better rank", "Students needing structured practice"],
    duration: "2-year, 1-year and 3-4 month crash course options",
  },
  {
    slug: "ssc",
    icon: Scale,
    title: "SSC",
    desc: "CGL, CHSL, MTS, CPO, GD and Stenographer preparation.",
    tag: "Govt Jobs",
    overview:
      "SSC exams require mastery of Reasoning, Quantitative Aptitude, English and General Awareness with speed and accuracy. Our SSC program covers major exams with disciplined practice.",
    highlights: ["Coverage for Maths, Reasoning, English and General Awareness", "Exam-oriented shortcuts, tricks and previous year analysis", "Sectional, full-length and all-India mock tests", "Speed, accuracy and daily current affairs focus"],
    structure: ["Foundation course from basics to advanced", "Target batch for upcoming exams", "Crash course for exam-focused revision", "Standalone mock test series"],
    idealFor: ["12th pass students targeting CHSL, MTS and GD", "Graduates targeting CGL, CPO and Stenographer", "Working professionals seeking stable government jobs", "Aspirants needing regular practice"],
    duration: "Flexible 3-month to 1-year programs",
  },
  {
    slug: "banking",
    icon: Banknote,
    title: "Banking",
    desc: "IBPS, SBI, RBI, NABARD and banking interview preparation.",
    tag: "Banking",
    overview:
      "Banking careers offer stability, growth and strong opportunities. Our program trains aspirants in Quant, Reasoning, English, General Awareness and interview readiness.",
    highlights: ["IBPS PO/Clerk, SBI PO/Clerk, RBI Assistant, RBI Grade B and NABARD coverage", "Speed tests, sectional tests and full-length mocks", "Banking awareness, financial news and RBI policy updates", "Descriptive writing and mock interview support"],
    structure: ["Foundation course for Prelims and Mains", "RBI Grade B and NABARD special course", "Crash course for last-minute revision", "Prelims and Mains mock test series"],
    idealFor: ["Graduates aiming for banking careers", "Final-year students", "Working professionals seeking a career shift", "Aspirants needing structured preparation"],
    duration: "6-month, 1-year and crash course options",
  },
  {
    slug: "defence",
    icon: ShieldCheck,
    title: "Defence",
    desc: "NDA, CDS, AFCAT, CAPF and SSB interview guidance.",
    tag: "Uniform",
    overview:
      "Defence careers demand courage, intelligence, physical fitness and strong analytical ability. Our program covers written exams, SSB interview training and fitness guidance.",
    highlights: ["NDA, CDS, AFCAT, CAPF, Coast Guard, Navy and Air Force exam support", "Defence experts, ex-servicemen and subject specialists", "SSB interview preparation with psychological tests and group tasks", "Defence-focused current affairs and physical fitness guidance"],
    structure: ["NDA course for Maths, English, GK, Science and SSB", "CDS course for IMA, OTA, AFA and Naval Academy", "AFCAT course for English, Reasoning, Awareness and Numerical Ability", "5-day SSB interview training and fitness plan"],
    idealFor: ["12th pass NDA aspirants", "Graduates preparing for CDS, AFCAT and CAPF", "Students dreaming of serving in uniform", "Aspirants needing written plus SSB preparation"],
    duration: "6-month, 1-year and crash course options",
  },
];

export type Course = typeof courses[number];
