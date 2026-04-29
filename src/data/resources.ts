export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  questions: QuizQuestion[];
}

export interface StudyMaterial {
  id: string;
  title: string;
  category: string;
  type: 'PDF' | 'E-Book' | 'Notes';
  url: string;
}

export interface VideoResource {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  url: string;
  duration: string;
}

export const quizzes: Quiz[] = [
  {
    id: 'neet-bio-1',
    title: 'NEET Biology - Cell Biology & Genetics',
    category: 'NEET UG',
    questions: [
      { id: 'q1', question: 'Which of the following is known as the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'], correctAnswer: 1 },
      { id: 'q2', question: 'The cell wall of plants is primarily composed of:', options: ['Chitin', 'Glycogen', 'Cellulose', 'Protein'], correctAnswer: 2 },
      { id: 'q3', question: 'Who proposed the fluid mosaic model of plasma membrane?', options: ['Watson and Crick', 'Singer and Nicolson', 'Robert Hooke', 'Schleiden and Schwann'], correctAnswer: 1 },
      { id: 'q4', question: 'The term "Genetics" was coined by:', options: ['Mendel', 'Bateson', 'Morgan', 'Punnett'], correctAnswer: 1 },
      { id: 'q5', question: 'Which organelle is responsible for protein synthesis?', options: ['Lysosome', 'Ribosome', 'Vacuole', 'Centrosome'], correctAnswer: 1 },
      { id: 'q6', question: 'Mendel conducted his experiments on which plant?', options: ['Rose', 'Wild Pea', 'Garden Pea', 'Sun Flower'], correctAnswer: 2 },
      { id: 'q7', question: 'The cross between F1 hybrid and its recessive parent is called:', options: ['Back cross', 'Test cross', 'Monohybrid cross', 'Dihybrid cross'], correctAnswer: 1 },
      { id: 'q8', question: 'Which nitrogenous base is absent in DNA?', options: ['Adenine', 'Guanine', 'Cytosine', 'Uracil'], correctAnswer: 3 },
      { id: 'q9', question: 'DNA replication occurs in which phase of the cell cycle?', options: ['G1 phase', 'S phase', 'G2 phase', 'M phase'], correctAnswer: 1 },
      { id: 'q10', question: 'Double fertilization is a characteristic feature of:', options: ['Algae', 'Fungi', 'Angiosperms', 'Gymnosperms'], correctAnswer: 2 }
    ]
  },
  {
    id: 'jee-phys-1',
    title: 'JEE Physics - Mechanics & Optics',
    category: 'IIT-JEE',
    questions: [
      { id: 'q1', question: 'What is the SI unit of Force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], correctAnswer: 2 },
      { id: 'q2', question: 'The rate of change of momentum is proportional to:', options: ['Applied Force', 'Mass', 'Velocity', 'Displacement'], correctAnswer: 0 },
      { id: 'q3', question: 'A body is in equilibrium when:', options: ['Net force is zero', 'Net torque is zero', 'Both net force and torque are zero', 'It is at rest only'], correctAnswer: 2 },
      { id: 'q4', question: 'The escape velocity from Earth’s surface is approximately:', options: ['9.8 km/s', '11.2 km/s', '7.9 km/s', '42 km/s'], correctAnswer: 1 },
      { id: 'q5', question: 'Work done by a centripetal force is always:', options: ['Positive', 'Negative', 'Zero', 'Infinite'], correctAnswer: 2 },
      { id: 'q6', question: 'The refractive index of diamond is approximately:', options: ['1.0', '1.33', '2.42', '1.5'], correctAnswer: 2 },
      { id: 'q7', question: 'Which mirror is used as a rear-view mirror in vehicles?', options: ['Plane', 'Concave', 'Convex', 'Cylindrical'], correctAnswer: 2 },
      { id: 'q8', question: 'The speed of light in vacuum is:', options: ['3x10^6 m/s', '3x10^7 m/s', '3x10^8 m/s', '3x10^9 m/s'], correctAnswer: 2 },
      { id: 'q9', question: 'Moment of inertia depends on:', options: ['Mass', 'Shape', 'Axis of rotation', 'All of these'], correctAnswer: 3 },
      { id: 'q10', question: 'Dimensional formula of Planck’s constant is:', options: ['[ML^2T^-1]', '[MLT^-2]', '[ML^2T^-2]', '[MLT^-1]'], correctAnswer: 0 }
    ]
  },
  {
    id: 'upsc-pol-1',
    title: 'UPSC Polity - Indian Constitution',
    category: 'UPSC',
    questions: [
      { id: 'q1', question: 'Which Article of the Indian Constitution deals with the Right to Equality?', options: ['Article 12', 'Article 14', 'Article 19', 'Article 21'], correctAnswer: 1 },
      { id: 'q2', question: 'Fundamental Rights are borrowed from the constitution of:', options: ['UK', 'USA', 'USSR', 'Canada'], correctAnswer: 1 },
      { id: 'q3', question: 'Who is the ex-officio chairman of Rajya Sabha?', options: ['President', 'Vice-President', 'Prime Minister', 'Speaker'], correctAnswer: 1 },
      { id: 'q4', question: 'The Directive Principles of State Policy are:', options: ['Justiciable', 'Non-justiciable', 'Mandatory', 'Absolute'], correctAnswer: 1 },
      { id: 'q5', question: 'How many schedules are there in the Indian Constitution?', options: ['8', '10', '12', '22'], correctAnswer: 2 },
      { id: 'q6', question: 'The 42nd Amendment Act added which word to the Preamble?', options: ['Sovereign', 'Socialist', 'Republic', 'Democratic'], correctAnswer: 1 },
      { id: 'q7', question: 'Who appoints the Governor of a State?', options: ['Prime Minister', 'Chief Minister', 'President', 'Chief Justice of India'], correctAnswer: 2 },
      { id: 'q8', question: 'The concept of "Single Citizenship" is inspired by:', options: ['USA', 'Britain', 'Ireland', 'Australia'], correctAnswer: 1 },
      { id: 'q9', question: 'Which body is known as the Guardian of the Constitution?', options: ['Parliament', 'President', 'Supreme Court', 'Election Commission'], correctAnswer: 2 },
      { id: 'q10', question: 'Minimum age to become the President of India is:', options: ['25 years', '30 years', '35 years', '40 years'], correctAnswer: 2 }
    ]
  },
  {
    id: 'ssc-quant-1',
    title: 'SSC Quant - Aptitude & Numbers',
    category: 'SSC',
    questions: [
      { id: 'q1', question: 'What is the smallest prime number?', options: ['0', '1', '2', '3'], correctAnswer: 2 },
      { id: 'q2', question: 'The LCM of 12, 15 and 20 is:', options: ['40', '60', '80', '120'], correctAnswer: 1 },
      { id: 'q3', question: 'If 20% of a number is 120, then 120% of that number will be:', options: ['240', '480', '720', '960'], correctAnswer: 2 },
      { id: 'q4', question: 'The average of first five prime numbers is:', options: ['5.0', '5.4', '5.6', '6.0'], correctAnswer: 2 },
      { id: 'q5', question: 'Find the simple interest on ₹5000 at 10% per annum for 2 years.', options: ['₹500', '₹1000', '₹1200', '₹1500'], correctAnswer: 1 },
      { id: 'q6', question: 'A can do a work in 10 days and B in 15 days. Together they do it in:', options: ['5 days', '6 days', '8 days', '9 days'], correctAnswer: 1 },
      { id: 'q7', question: 'The ratio of two numbers is 3:4 and their HCF is 4. Their LCM is:', options: ['12', '16', '24', '48'], correctAnswer: 3 },
      { id: 'q8', question: 'Price of sugar rises by 25%. By how much % should consumption be reduced?', options: ['20%', '25%', '30%', '50%'], correctAnswer: 0 },
      { id: 'q9', question: 'A train 100m long passes a bridge at 72 km/h in 25s. Length of bridge is:', options: ['300m', '400m', '500m', '600m'], correctAnswer: 1 },
      { id: 'q10', question: 'Square root of 0.09 is:', options: ['0.03', '0.3', '0.003', '3.0'], correctAnswer: 1 }
    ]
  }
];

export const studyMaterials: StudyMaterial[] = [
  { id: 'upsc-notes-1', title: 'UPSC Indian Polity - Handwritten Notes', category: 'UPSC', type: 'Notes', url: '#' },
  { id: 'apsc-prev-1', title: 'APSC GS Previous Year Paper (2023)', category: 'APSC', type: 'PDF', url: '#' }
];

export const videoResources: VideoResource[] = [
  { id: 'v1', title: 'How to Crack UPSC in First Attempt', category: 'Strategy', thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60', url: 'https://youtube.com', duration: '15:45' }
];
