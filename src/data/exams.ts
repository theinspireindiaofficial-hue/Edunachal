export interface ExamDetail {
  id: string;
  name: string;
  category: string;
  notificationDate: string;
  lastDateToApply: string;
  examDate: string;
  officialLink: string;
  description: string;
  eligibility: string[];
  pattern: string[];
  syllabus: string[];
}

export const exams: ExamDetail[] = [
  {
    id: 'upsc-cse-2026',
    name: 'UPSC Civil Services Examination 2026',
    category: 'UPSC',
    notificationDate: 'Feb 2026',
    lastDateToApply: 'Mar 2026',
    examDate: 'May 24, 2026 (Prelims)',
    officialLink: 'https://upsc.gov.in',
    description: 'The premier examination for recruitment to IAS, IPS, and IFS.',
    eligibility: [
      'Nationality: Citizen of India',
      'Age: 21-32 years',
      'Qualification: Graduate degree from a recognized university'
    ],
    pattern: [
      'Prelims: Objective (2 Papers)',
      'Mains: Subjective (9 Papers)',
      'Interview: Personality Test'
    ],
    syllabus: [
      'GS: History, Geography, Polity, Economy, Environment',
      'CSAT: Aptitude and Reasoning'
    ]
  },
  {
    id: 'ssc-cgl-2026',
    name: 'SSC CGL 2026 (Combined Graduate Level)',
    category: 'SSC',
    notificationDate: 'Apr 2026',
    lastDateToApply: 'May 2026',
    examDate: 'May-June 2026 (Tier 1)',
    officialLink: 'https://ssc.gov.in',
    description: 'Recruitment for Group B and C posts in various Ministries and Departments.',
    eligibility: [
      'Qualification: Bachelor Degree',
      'Age: 18-32 years'
    ],
    pattern: [
      'Tier 1: Computer Based Exam (Qualifying)',
      'Tier 2: Mathematical, Reasoning, English, GA, Computer'
    ],
    syllabus: [
      'Quantitative Aptitude, Reasoning, English, General Awareness'
    ]
  },
  {
    id: 'ibps-po-2026',
    name: 'IBPS PO/MT-XVI (Probationary Officers)',
    category: 'Banking',
    notificationDate: 'July 2026',
    lastDateToApply: 'Aug 2026',
    examDate: 'Aug 22-23, 2026 (Prelims)',
    officialLink: 'https://ibps.in',
    description: 'Recruitment of Probationary Officers in participating public sector banks.',
    eligibility: [
      'Qualification: Graduate in any discipline',
      'Age: 20-30 years'
    ],
    pattern: [
      'Prelims: Objective (3 Sections)',
      'Mains: Objective + Descriptive',
      'Interview'
    ],
    syllabus: [
      'English, Quant, Reasoning, Banking Awareness'
    ]
  },
  {
    id: 'upsc-capf-2026',
    name: 'UPSC CAPF (ACs) 2026',
    category: 'Defence',
    notificationDate: 'Apr 2026',
    lastDateToApply: 'May 2026',
    examDate: 'July 19, 2026',
    officialLink: 'https://upsc.gov.in',
    description: 'Central Armed Police Forces (Assistant Commandants) Examination.',
    eligibility: [
      'Qualification: Bachelor Degree',
      'Age: 20-25 years'
    ],
    pattern: [
      'Paper 1: General Ability & Intelligence',
      'Paper 2: General Studies, Essay & Comprehension',
      'Physical Standards/Efficiency Test'
    ],
    syllabus: [
      'GK, Science, Reasoning, Quantitative Aptitude',
      'Essay Writing, Precise Writing, Grammar'
    ]
  },
  {
    id: 'ibps-clerk-2026',
    name: 'IBPS Clerk-XVI (CRP Clerk XVI)',
    category: 'Banking',
    notificationDate: 'Aug 2026',
    lastDateToApply: 'Sept 2026',
    examDate: 'Oct 10-11, 2026 (Prelims)',
    officialLink: 'https://ibps.in',
    description: 'Recruitment for clerical cadre posts in participating public sector banks.',
    eligibility: [
      'Qualification: Graduate degree',
      'Age: 20-28 years'
    ],
    pattern: [
      'Prelims: Objective Exam',
      'Mains: Objective Exam'
    ],
    syllabus: [
      'English, Numerical Ability, Reasoning, Computer/Marketing'
    ]
  },
  {
    id: 'rrb-ntpc-2026',
    name: 'RRB NTPC 2026 (Non-Technical Categories)',
    category: 'Railways',
    notificationDate: 'Aug 2026',
    lastDateToApply: 'Sept 2026',
    examDate: 'Late 2026 / Early 2027',
    officialLink: 'https://indianrailways.gov.in',
    description: 'Recruitment for Station Master, Ticket Clerk, and other NTPC posts.',
    eligibility: [
      '12th Pass or Graduate',
      'Age: 18-33 years'
    ],
    pattern: [
      'CBT Stage 1: Common Exam',
      'CBT Stage 2: Post-specific',
      'Skill/Aptitude Test'
    ],
    syllabus: [
      'Mathematics, General Intelligence, General Awareness'
    ]
  },
  {
    id: 'upsc-nda-2-2026',
    name: 'UPSC NDA & NA (II) 2026',
    category: 'Defence',
    notificationDate: 'May 2026',
    lastDateToApply: 'June 2026',
    examDate: 'Sept 13, 2026',
    officialLink: 'https://upsc.gov.in',
    description: 'Entrance for Army, Navy, and Air Force wings of National Defence Academy.',
    eligibility: [
      'Age: 16.5 to 19.5 years',
      'Qualification: 12th Pass'
    ],
    pattern: [
      'Maths (300 Marks)',
      'GAT (600 Marks)',
      'SSB Interview'
    ],
    syllabus: [
      'Maths, English, Physics, Chem, History, Geography'
    ]
  },
  {
    id: 'ssc-chsl-2026',
    name: 'SSC CHSL 2026 (Combined Higher Secondary)',
    category: 'SSC',
    notificationDate: 'June 2026',
    lastDateToApply: 'July 2026',
    examDate: 'July-Sept 2026 (Tier 1)',
    officialLink: 'https://ssc.gov.in',
    description: 'Recruitment for LDC, JSA, and DEO posts in government offices.',
    eligibility: [
      'Qualification: 12th Standard Pass',
      'Age: 18-27 years'
    ],
    pattern: [
      'Tier 1: Objective Exam',
      'Tier 2: Mathematical, Reasoning, English, Computer'
    ],
    syllabus: [
      'English, Quant, Reasoning, General Awareness'
    ]
  }
];
