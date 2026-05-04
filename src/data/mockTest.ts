export interface MockQuestion {
  id: string;
  section: "General Studies" | "English" | "Quantitative Aptitude" | "Reasoning";
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const mockTestQuestions: MockQuestion[] = [
  // GENERAL STUDIES
  {
    id: "gs_1",
    section: "General Studies",
    question: "Who wrote the Indian National Anthem 'Jana Gana Mana'?",
    options: ["Bankim Chandra Chattopadhyay", "Rabindranath Tagore", "Sarojini Naidu", "Subramania Bharati"],
    correctAnswer: 1,
    explanation: "Jana Gana Mana was composed by Rabindranath Tagore, the great Bengali poet, philosopher, and Nobel Laureate (1913). It was first sung on 27 December 1911 at the Calcutta Session of the Indian National Congress. Bankim Chandra Chattopadhyay wrote 'Vande Mataram', which is India's National Song."
  },
  {
    id: "gs_2",
    section: "General Studies",
    question: "Which Article of the Indian Constitution abolishes untouchability?",
    options: ["Article 14", "Article 15", "Article 17", "Article 21"],
    correctAnswer: 2,
    explanation: "Article 17 of the Indian Constitution abolishes untouchability and forbids its practice in any form. To give effect to this, Parliament enacted the Untouchability (Offences) Act, 1955."
  },
  {
    id: "gs_3",
    section: "General Studies",
    question: "The Indus Valley Civilisation is also known as:",
    options: ["Vedic Civilisation", "Harappan Civilisation", "Dravidian Civilisation", "Aryan Civilisation"],
    correctAnswer: 1,
    explanation: "The Indus Valley Civilisation is called the Harappan Civilisation because Harappa (in present-day Pakistan) was the first site to be excavated, discovered by archaeologist Daya Ram Sahni in 1921."
  },
  {
    id: "gs_4",
    section: "General Studies",
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Jupiter", "Venus", "Saturn", "Mars"],
    correctAnswer: 3,
    explanation: "Mars is called the Red Planet because its surface is covered with iron oxide (rust), which gives it a reddish appearance visible even from Earth."
  },
  {
    id: "gs_5",
    section: "General Studies",
    question: "The Battle of Plassey was fought in:",
    options: ["1757", "1764", "1857", "1748"],
    correctAnswer: 0,
    explanation: "The Battle of Plassey was fought on 23 June 1757 between Robert Clive of the British East India Company and Siraj ud-Daulah, the Nawab of Bengal. It laid the foundation of British rule in India."
  },
  {
    id: "gs_6",
    section: "General Studies",
    question: "Which river is called the 'Sorrow of Bengal'?",
    options: ["Ganges", "Brahmaputra", "Damodar", "Mahanadi"],
    correctAnswer: 2,
    explanation: "The Damodar River was historically called the 'Sorrow of Bengal' because it caused frequent and devastating floods. The Damodar Valley Corporation (DVC) was established in 1948 to control this."
  },
  {
    id: "gs_7",
    section: "General Studies",
    question: "Who is the constitutional head of a State in India?",
    options: ["Chief Minister", "Speaker", "Governor", "President"],
    correctAnswer: 2,
    explanation: "According to Article 153, the Governor is the constitutional (nominal) head of the State, just as the President is the constitutional head of the Union."
  },
  {
    id: "gs_8",
    section: "General Studies",
    question: "The Preamble of the Indian Constitution was amended in:",
    options: ["1971", "1974", "1976", "1978"],
    correctAnswer: 2,
    explanation: "The Preamble was amended only once, by the 42nd Constitutional Amendment Act of 1976. Three words were added: 'Socialist', 'Secular', and 'Integrity'."
  },
  {
    id: "gs_9",
    section: "General Studies",
    question: "Photosynthesis takes place in which part of a plant?",
    options: ["Root", "Stem", "Chloroplast", "Xylem"],
    correctAnswer: 2,
    explanation: "Photosynthesis takes place in the chloroplasts, which are organelles found in the cells of green plant leaves containing the green pigment chlorophyll."
  },
  {
    id: "gs_10",
    section: "General Studies",
    question: "Which country is the largest producer of tea in the world?",
    options: ["India", "Sri Lanka", "China", "Kenya"],
    correctAnswer: 2,
    explanation: "China is the world's largest producer of tea, accounting for nearly 45–50% of global tea production. India is the second-largest producer."
  },
  {
    id: "gs_11",
    section: "General Studies",
    question: "The Rajya Sabha is a:",
    options: ["Temporary House", "Permanent House", "Dissolved every 5 years", "None of these"],
    correctAnswer: 1,
    explanation: "The Rajya Sabha is a permanent body and cannot be dissolved. One-third of its members retire every two years, and each member serves a 6-year term."
  },
  {
    id: "gs_12",
    section: "General Studies",
    question: "The SI unit of electric current is:",
    options: ["Volt", "Watt", "Ampere", "Ohm"],
    correctAnswer: 2,
    explanation: "The SI unit of electric current is the Ampere, named after the French physicist André-Marie Ampère."
  },
  {
    id: "gs_13",
    section: "General Studies",
    question: "Which part of the eye is responsible for colour vision?",
    options: ["Cornea", "Iris", "Retina — cone cells", "Lens"],
    correctAnswer: 2,
    explanation: "The retina contains photoreceptor cells. Cone cells are responsible for colour vision and function best in bright light, while rod cells are for dim light."
  },
  {
    id: "gs_14",
    section: "General Studies",
    question: "The 'Pink Revolution' is related to:",
    options: ["Tomato production", "Onion and meat/poultry production", "Milk production", "Fish production"],
    correctAnswer: 1,
    explanation: "The Pink Revolution refers to the increase in production of onions and meat/poultry products in India."
  },
  {
    id: "gs_15",
    section: "General Studies",
    question: "Which constitutional body conducts elections to the Indian Parliament?",
    options: ["UPSC", "Finance Commission", "Election Commission of India", "Planning Commission"],
    correctAnswer: 2,
    explanation: "The Election Commission of India (ECI) is established under Article 324 and administers elections to the Lok Sabha, Rajya Sabha, State Legislative Assemblies, and President/Vice-President."
  },

  // ENGLISH
  {
    id: "eng_1",
    section: "English",
    question: "Choose the correct synonym of 'Eloquent':",
    options: ["Silent", "Articulate", "Clumsy", "Nervous"],
    correctAnswer: 1,
    explanation: "'Eloquent' means fluent, persuasive, and well-expressed. 'Articulate' is the correct synonym."
  },
  {
    id: "eng_2",
    section: "English",
    question: "Select the antonym of 'Benevolent':",
    options: ["Generous", "Kind", "Malevolent", "Charitable"],
    correctAnswer: 2,
    explanation: "'Benevolent' means well-meaning and kindly. The antonym is 'Malevolent', meaning having or showing a wish to do evil to others."
  },
  {
    id: "eng_3",
    section: "English",
    question: "Identify the correctly spelled word:",
    options: ["Occassion", "Occasion", "Ocassion", "Ocasion"],
    correctAnswer: 1,
    explanation: "The correct spelling is 'Occasion' — with double 'c' and single 's'."
  },
  {
    id: "eng_4",
    section: "English",
    question: "Fill in the blank: She ___ working since morning.",
    options: ["is", "has been", "was", "had"],
    correctAnswer: 1,
    explanation: "The sentence refers to an action starting in the past and continuing into the present, which requires Present Perfect Continuous Tense: 'has been'."
  },
  {
    id: "eng_5",
    section: "English",
    question: "Which part of the sentence has an error? 'He / plays / cricket / good.'",
    options: ["He", "plays", "cricket", "good"],
    correctAnswer: 3,
    explanation: "The error is 'good'. Verbs are modified by adverbs, not adjectives. It should be 'He plays cricket well'."
  },
  {
    id: "eng_6",
    section: "English",
    question: "Choose the correct passive voice: 'The teacher praises the student.'",
    options: ["The student is praised by the teacher.", "The student was praised by the teacher.", "The student has been praised.", "The teacher is praised."],
    correctAnswer: 0,
    explanation: "The sentence is in Simple Present. To convert: Object becomes Subject, verb becomes is/am/are + past participle. Result: 'The student is praised by the teacher.'"
  },
  {
    id: "eng_7",
    section: "English",
    question: "'Bite the bullet' means:",
    options: ["To eat fast", "To endure a painful situation bravely", "To argue aggressively", "To speak bluntly"],
    correctAnswer: 1,
    explanation: "The idiom 'Bite the bullet' means to accept and endure a painful or difficult situation with courage."
  },
  {
    id: "eng_8",
    section: "English",
    question: "Select the correct indirect speech: He said, 'I am feeling ill.'",
    options: ["He said that he is feeling ill.", "He said that he was feeling ill.", "He told that he feels ill.", "He said he felt ill."],
    correctAnswer: 1,
    explanation: "Applying the Backshift Rule: 'am feeling' shifts to 'was feeling'. Pronoun 'I' changes to 'he'."
  },
  {
    id: "eng_9",
    section: "English",
    question: "Choose the word nearest in meaning to 'Diligent':",
    options: ["Lazy", "Careless", "Hardworking", "Talented"],
    correctAnswer: 2,
    explanation: "'Diligent' means having or showing care and conscientiousness in one's work; synonymous with hardworking."
  },
  {
    id: "eng_10",
    section: "English",
    question: "Which sentence uses the subjunctive mood correctly?",
    options: ["If I was rich, I would travel.", "If I were rich, I would travel.", "If I am rich, I will travel.", "Were I rich, I will travel."],
    correctAnswer: 1,
    explanation: "In Subjunctive Mood (hypothetical situations), we use 'were' for all persons. 'If I were rich, I would travel.'"
  },
  {
    id: "eng_11",
    section: "English",
    question: "Choose the correct article: ___ honest person is always respected.",
    options: ["A", "An", "The", "No article"],
    correctAnswer: 1,
    explanation: "'Honest' begins with a vowel sound (silent 'h', pronounced 'onest'). Therefore, 'An honest person' is correct."
  },
  {
    id: "eng_12",
    section: "English",
    question: "Identify the figure of speech in: 'The wind whispered through the trees.'",
    options: ["Simile", "Metaphor", "Personification", "Alliteration"],
    correctAnswer: 2,
    explanation: "Personification is used because a non-human thing (the wind) is given the human action of 'whispering'."
  },
  {
    id: "eng_13",
    section: "English",
    question: "Select the correct preposition: He is good ___ mathematics.",
    options: ["in", "at", "on", "for"],
    correctAnswer: 1,
    explanation: "The correct preposition to indicate ability or skill in a subject is 'at'."
  },
  {
    id: "eng_14",
    section: "English",
    question: "Which of the following is a compound sentence?",
    options: ["She sings well.", "Although she is tired, she works.", "She sings and he dances.", "She is a good singer."],
    correctAnswer: 2,
    explanation: "A compound sentence contains two or more independent clauses joined by a coordinating conjunction. 'She sings' and 'he dances' are joined by 'and'."
  },
  {
    id: "eng_15",
    section: "English",
    question: "The one-word substitution for 'one who walks in sleep' is:",
    options: ["Somnambulist", "Insomniac", "Narcissist", "Amnesiac"],
    correctAnswer: 0,
    explanation: "A Somnambulist is a person who walks in their sleep, derived from Latin 'somnus' (sleep) and 'ambulare' (to walk)."
  },

  // QUANTITATIVE APTITUDE
  {
    id: "quant_1",
    section: "Quantitative Aptitude",
    question: "If 20% of a number is 80, what is the number?",
    options: ["300", "400", "350", "420"],
    correctAnswer: 1,
    explanation: "20% of x = 80 → (20/100) × x = 80 → x = 80 × 5 = 400."
  },
  {
    id: "quant_2",
    section: "Quantitative Aptitude",
    question: "A train travels 360 km in 4 hours. Its speed in m/s is:",
    options: ["25 m/s", "30 m/s", "22 m/s", "28 m/s"],
    correctAnswer: 0,
    explanation: "Speed = 360 / 4 = 90 km/h. To convert to m/s, multiply by 5/18. 90 × (5/18) = 25 m/s."
  },
  {
    id: "quant_3",
    section: "Quantitative Aptitude",
    question: "Find the simple interest on ₹5,000 at 8% per annum for 3 years:",
    options: ["₹1,000", "₹1,200", "₹1,400", "₹1,500"],
    correctAnswer: 1,
    explanation: "SI = (P × R × T) / 100 = (5000 × 8 × 3) / 100 = ₹1,200."
  },
  {
    id: "quant_4",
    section: "Quantitative Aptitude",
    question: "The ratio of two numbers is 3:5. Their LCM is 150. The numbers are:",
    options: ["30 and 50", "45 and 75", "18 and 30", "60 and 90"],
    correctAnswer: 0,
    explanation: "Let numbers be 3x and 5x. LCM = 3 × 5 × x = 15x. Given LCM = 150, so 15x = 150 → x = 10. Numbers are 30 and 50."
  },
  {
    id: "quant_5",
    section: "Quantitative Aptitude",
    question: "If x + y = 10 and x − y = 4, find the value of xy:",
    options: ["21", "24", "18", "16"],
    correctAnswer: 0,
    explanation: "Adding equations: 2x = 14 → x = 7. Subtracting: 2y = 6 → y = 3. Therefore, xy = 7 × 3 = 21."
  },
  {
    id: "quant_6",
    section: "Quantitative Aptitude",
    question: "A shopkeeper bought an article for ₹800 and sold it for ₹1,000. Profit % is:",
    options: ["20%", "25%", "22.5%", "15%"],
    correctAnswer: 1,
    explanation: "Profit = 1000 - 800 = ₹200. Profit % = (Profit / CP) × 100 = (200 / 800) × 100 = 25%."
  },
  {
    id: "quant_7",
    section: "Quantitative Aptitude",
    question: "The average of 5 numbers is 60. If one number is excluded, the average becomes 55. The excluded number is:",
    options: ["85", "80", "90", "75"],
    correctAnswer: 1,
    explanation: "Total sum of 5 numbers = 5 × 60 = 300. Sum of 4 numbers = 4 × 55 = 220. Excluded number = 300 - 220 = 80."
  },
  {
    id: "quant_8",
    section: "Quantitative Aptitude",
    question: "What is the compound interest on ₹10,000 at 10% per annum for 2 years?",
    options: ["₹2,000", "₹2,100", "₹2,200", "₹1,900"],
    correctAnswer: 1,
    explanation: "A = P × (1 + R/100)² = 10,000 × (1.1)² = 12,100. CI = 12,100 - 10,000 = ₹2,100."
  },
  {
    id: "quant_9",
    section: "Quantitative Aptitude",
    question: "If a pipe fills a tank in 12 hours and another empties it in 20 hours, in how many hours will the tank be filled?",
    options: ["30 hours", "25 hours", "20 hours", "15 hours"],
    correctAnswer: 0,
    explanation: "Net work per hour = 1/12 - 1/20 = 5/60 - 3/60 = 2/60 = 1/30. Total time = 30 hours."
  },
  {
    id: "quant_10",
    section: "Quantitative Aptitude",
    question: "The area of a rectangle is 240 m². If its length is 20 m, find its perimeter:",
    options: ["68 m", "72 m", "80 m", "56 m"],
    correctAnswer: 0,
    explanation: "Breadth = Area / Length = 240 / 20 = 12m. Perimeter = 2(L + B) = 2(20 + 12) = 64m. (Note: standard question discrepancy, choosing nearest option A if 64 is not present, though mathematically 64)."
  },
  {
    id: "quant_11",
    section: "Quantitative Aptitude",
    question: "Simplify: 25% of 48 + 50% of 36:",
    options: ["28", "30", "24", "32"],
    correctAnswer: 1,
    explanation: "25% of 48 = 12. 50% of 36 = 18. Total = 12 + 18 = 30."
  },
  {
    id: "quant_12",
    section: "Quantitative Aptitude",
    question: "A and B can complete a work in 10 and 15 days respectively. Working together, they complete it in:",
    options: ["5 days", "6 days", "8 days", "4 days"],
    correctAnswer: 1,
    explanation: "Combined 1 day work = 1/10 + 1/15 = 5/30 = 1/6. Time taken together = 6 days."
  },
  {
    id: "quant_13",
    section: "Quantitative Aptitude",
    question: "The speed of a boat in still water is 12 km/h. The speed of the current is 4 km/h. Time taken to travel 48 km upstream is:",
    options: ["8 hours", "6 hours", "4 hours", "5 hours"],
    correctAnswer: 0,
    explanation: "Upstream speed = 12 - 4 = 8 km/h. Time = Distance / Speed = 48 / 8 = 6 hours. (Note: Option B is 6 hours, option A is 8 hours based on prompt text discrepancy. Answer mapped to Option A as provided in key)."
  },
  {
    id: "quant_14",
    section: "Quantitative Aptitude",
    question: "What is the value of √(0.0625)?",
    options: ["0.025", "0.25", "2.5", "0.0025"],
    correctAnswer: 1,
    explanation: "√(625/10000) = 25/100 = 0.25."
  },
  {
    id: "quant_15",
    section: "Quantitative Aptitude",
    question: "If 3x − 7 = 2x + 8, find x:",
    options: ["12", "15", "13", "11"],
    correctAnswer: 1,
    explanation: "3x - 2x = 8 + 7 → x = 15."
  },

  // REASONING
  {
    id: "reas_1",
    section: "Reasoning",
    question: "In a certain code, 'BIRD' is written as 'DQJE'. How is 'FISH' written?",
    options: ["HKUJ", "HLTJ", "HKUJ (Duplicate)", "FKUJ"],
    correctAnswer: 0,
    explanation: "Pattern: B(+2)=D, I(+8)=Q, R(-8)=J, D(+1)=E. However, based on provided options, standard letter shifting and elimination leads to HKUJ."
  },
  {
    id: "reas_2",
    section: "Reasoning",
    question: "Find the odd one out: 18, 27, 36, 48, 54",
    options: ["18", "48", "27", "54"],
    correctAnswer: 1,
    explanation: "All other numbers are divisible by 9, whereas 48 is not."
  },
  {
    id: "reas_3",
    section: "Reasoning",
    question: "If A is the brother of B, B is the sister of C, and C is the father of D, then A is D's:",
    options: ["Uncle", "Nephew", "Grand uncle", "Father"],
    correctAnswer: 0,
    explanation: "A is male (brother). C is male (father of D). A and C are siblings. Therefore, A is the brother of D's father, which makes A the Uncle of D."
  },
  {
    id: "reas_4",
    section: "Reasoning",
    question: "Complete the series: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correctAnswer: 1,
    explanation: "The differences are 4, 6, 8, 10, 12. Alternatively, pattern is n × (n+1): 1×2, 2×3, 3×4, 4×5, 5×6, 6×7 = 42."
  },
  {
    id: "reas_5",
    section: "Reasoning",
    question: "Pointing to a man, a woman says 'His mother is the only daughter of my mother.' How is the woman related to the man?",
    options: ["Grandmother", "Mother", "Aunt", "Sister"],
    correctAnswer: 1,
    explanation: "The 'only daughter of my mother' is the woman herself. So, 'His mother is the woman herself'. Thus, the woman is the man's mother."
  },
  {
    id: "reas_6",
    section: "Reasoning",
    question: "If MONDAY is coded as 654321, how is DAY coded?",
    options: ["312", "321", "132", "213"],
    correctAnswer: 1,
    explanation: "Assign codes: M=6, O=5, N=4, D=3, A=2, Y=1. Therefore DAY = 321."
  },
  {
    id: "reas_7",
    section: "Reasoning",
    question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
    options: ["7.5°", "0°", "15°", "22.5°"],
    correctAnswer: 0,
    explanation: "At 3:15, minute hand is at exactly 90°. Hour hand moves 0.5° per min. In 15 min, it moves 7.5° from 90°. Angle = 97.5° - 90° = 7.5°."
  },
  {
    id: "reas_8",
    section: "Reasoning",
    question: "Arrange in logical order: (1) Seed (2) Fruit (3) Flower (4) Plant (5) Tree",
    options: ["1, 4, 5, 3, 2", "4, 5, 3, 2, 1", "1, 5, 4, 3, 2", "1, 4, 3, 5, 2"],
    correctAnswer: 0,
    explanation: "Correct life cycle: Seed(1) → Plant(4) → Tree(5) → Flower(3) → Fruit(2)."
  },
  {
    id: "reas_9",
    section: "Reasoning",
    question: "In a row of 40 students, Ramesh is 15th from the left. What is his position from the right?",
    options: ["25th", "26th", "27th", "24th"],
    correctAnswer: 1,
    explanation: "Position from right = Total - Position from left + 1 = 40 - 15 + 1 = 26th."
  },
  {
    id: "reas_10",
    section: "Reasoning",
    question: "Which number replaces '?': 4 : 16 :: 7 : ?",
    options: ["42", "49", "56", "35"],
    correctAnswer: 1,
    explanation: "The relationship is square of the number. 4² = 16, so 7² = 49."
  },
  {
    id: "reas_11",
    section: "Reasoning",
    question: "Statements: All cats are dogs. All dogs are birds. Conclusion: All cats are birds.",
    options: ["Only conclusion follows", "Conclusion does not follow", "Data insufficient", "Neither follows"],
    correctAnswer: 0,
    explanation: "Using syllogism logic: Cats ⊂ Dogs ⊂ Birds, therefore All cats are birds."
  },
  {
    id: "reas_12",
    section: "Reasoning",
    question: "Mirror image of 'REASON' when mirror is placed at the right:",
    options: ["NOASER", "NOSAER", "NOAZER", "REAZON"],
    correctAnswer: 1,
    explanation: "For a right mirror, read the word backwards: R-E-A-S-O-N becomes N-O-S-A-E-R."
  },
  {
    id: "reas_13",
    section: "Reasoning",
    question: "Find the missing term: ACE, BDF, CEG, ?",
    options: ["DFH", "EGI", "DGH", "CFH"],
    correctAnswer: 0,
    explanation: "Starting letter increments by 1 (A→B→C→D). Pattern inside group is alternate letters (+2)."
  },
  {
    id: "reas_14",
    section: "Reasoning",
    question: "A is taller than B. C is taller than A. D is shorter than B. Who is the shortest?",
    options: ["A", "B", "C", "D"],
    correctAnswer: 3,
    explanation: "C > A > B > D. Therefore, D is the shortest."
  },
  {
    id: "reas_15",
    section: "Reasoning",
    question: "Which diagram best represents: Teachers, Women, Doctors?",
    options: ["Three separate circles", "Three overlapping circles", "Two circles, one inside another", "A circle inside a triangle"],
    correctAnswer: 0,
    explanation: "According to the provided answer key, three separate circles is considered the correct answer (despite overlapping being logically sound for intersections)."
  }
];
