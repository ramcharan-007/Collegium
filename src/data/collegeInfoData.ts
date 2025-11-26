// src/data/collegeInfoData.ts
export const collegeInfoContent = {
  about: {
    title: "About AIET, Mangalore",
    description:
      "Alva's Institute of Engineering and Technology (AIET) is a premier autonomous institution established in 2008, affiliated to Visvesvaraya Technological University (VTU), Belagavi. It offers undergraduate and postgraduate programs in engineering, management, and allied sciences. The institute emphasizes academic excellence, innovation, and strong industry collaboration, making it one of the top engineering colleges in Karnataka.",
  },
  highlights: {
    title: "AIET Highlights 2025",
    items: [
      { label: "Established", value: "2008" },
      { label: "Institute Type", value: "Private" },
      { label: "Approved By", value: "AICTE" },
      { label: "Campus Area", value: "144 Acres" },
      { label: "Popular Courses", value: "B.Tech, M.Tech, MBA" },
      { label: "Official Website", value: "www.aietmangalore.edu.in" },
    ],
  },
  additionalInfo: {
    title: "Why Choose AIET?",
    description:
      "AIET stands out for its cutting-edge infrastructure, experienced faculty, strong placement network, and active student clubs. It has consistently achieved high placement rates and fosters innovation through research and entrepreneurship programs.",
  },
};

// Courses & Fees Data
export const coursesFeesData = {
  undergraduate: [
    {
      course: "B.Tech Computer Science",
      duration: "4 Years",
      fees: "₹4,00,000",
      eligibility: "10+2 with 60% in PCM",
      seats: 120,
    },
    {
      course: "B.Tech Mechanical Engineering",
      duration: "4 Years",
      fees: "₹3,50,000",
      eligibility: "10+2 with 60% in PCM",
      seats: 90,
    },
    {
      course: "B.Tech Electronics & Communication",
      duration: "4 Years",
      fees: "₹3,80,000",
      eligibility: "10+2 with 60% in PCM",
      seats: 90,
    },
    {
      course: "B.Tech Civil Engineering",
      duration: "4 Years",
      fees: "₹3,20,000",
      eligibility: "10+2 with 60% in PCM",
      seats: 60,
    },
  ],
  postgraduate: [
    {
      course: "M.Tech Computer Science",
      duration: "2 Years",
      fees: "₹2,50,000",
      eligibility: "B.Tech/BE with 60%",
      seats: 18,
    },
    {
      course: "MBA",
      duration: "2 Years",
      fees: "₹3,00,000",
      eligibility: "Graduation with 50%",
      seats: 60,
    },
  ],
};

// Admission Data
export const admissionData = {
  process: [
    {
      step: 1,
      title: "Register Online",
      description: "Fill the application form on the official website",
    },
    {
      step: 2,
      title: "Entrance Exam",
      description: "Appear for KCET/COMEDK/JEE Main",
    },
    {
      step: 3,
      title: "Counselling",
      description: "Attend counselling based on rank",
    },
    {
      step: 4,
      title: "Document Verification",
      description: "Submit all required documents",
    },
    {
      step: 5,
      title: "Fee Payment",
      description: "Pay the admission fees",
    },
  ],
  importantDates: [
    { event: "Application Start", date: "March 1, 2025" },
    { event: "Application Deadline", date: "June 15, 2025" },
    { event: "Entrance Exam", date: "April 20-25, 2025" },
    { event: "Counselling Starts", date: "July 1, 2025" },
    { event: "Classes Begin", date: "August 1, 2025" },
  ],
  eligibility: {
    btech:
      "Candidates must have passed 10+2 with Physics, Chemistry, and Mathematics with a minimum of 60% marks (55% for reserved categories). Valid KCET/COMEDK/JEE Main score required.",
    mtech:
      "Bachelor's degree in Engineering/Technology with minimum 60% marks (55% for reserved categories). Valid GATE score preferred.",
    mba:
      "Bachelor's degree in any discipline with minimum 50% marks. Valid score in KMAT/CAT/MAT/CMAT.",
  },
};

// Reviews Data
export const reviewsData = {
  overall: 3.9,
  totalReviews: 128,
  breakdown: [
    { category: "Academics", rating: 4.2 },
    { category: "Infrastructure", rating: 4.5 },
    { category: "Faculty", rating: 4.0 },
    { category: "Placements", rating: 3.8 },
    { category: "Campus Life", rating: 4.1 },
  ],
  reviews: [
    {
      id: 1,
      name: "Rahul Sharma",
      course: "B.Tech CSE, Batch 2024",
      rating: 4.5,
      date: "15 Jan 2025",
      title: "Great Infrastructure and Faculty",
      review:
        "The college has excellent infrastructure with modern labs and well-equipped classrooms. Faculty members are highly qualified and supportive. Placement cell is very active.",
      likes: 24,
      verified: true,
    },
    {
      id: 2,
      name: "Priya Desai",
      course: "B.Tech ECE, Batch 2023",
      rating: 4.0,
      date: "10 Jan 2025",
      title: "Good College with Decent Placements",
      review:
        "Overall good experience. Placements are decent with many companies visiting campus. Campus life is vibrant with many clubs and events. Hostel facilities need improvement.",
      likes: 18,
      verified: true,
    },
    {
      id: 3,
      name: "Amit Kumar",
      course: "B.Tech Mechanical, Batch 2024",
      rating: 3.5,
      date: "5 Jan 2025",
      title: "Average Experience",
      review:
        "The college is good for academics but placements for core branches could be better. Faculty is supportive but some labs need equipment upgrades.",
      likes: 12,
      verified: false,
    },
  ],
};

// Cutoff Data
export const cutoffData = {
  kcet2024: [
    { course: "B.Tech Computer Science", general: 4520, obc: 5234, sc: 8456 },
    { course: "B.Tech Electronics & Communication", general: 6789, obc: 7234, sc: 10234 },
    { course: "B.Tech Mechanical Engineering", general: 12345, obc: 14567, sc: 18234 },
    { course: "B.Tech Civil Engineering", general: 15678, obc: 17890, sc: 22345 },
  ],
  comedk2024: [
    { course: "B.Tech Computer Science", rank: 3456 },
    { course: "B.Tech Electronics & Communication", rank: 5678 },
    { course: "B.Tech Mechanical Engineering", rank: 8901 },
    { course: "B.Tech Civil Engineering", rank: 11234 },
  ],
};

// Placement Data
export const placementData = {
  stats2024: {
    averagePackage: "₹6.5 LPA",
    highestPackage: "₹24 LPA",
    placementRate: "85%",
    totalCompanies: 150,
    totalOffers: 520,
  },
  topRecruiters: [
    "Microsoft", "Amazon", "Google", "Infosys", "Wipro", 
    "TCS", "Cognizant", "Accenture", "IBM", "Oracle",
    "Bosch", "Mercedes Benz", "L&T", "Mahindra", "Samsung"
  ],
  branchWisePlacements: [
    { branch: "Computer Science", avgPackage: "₹8.5 LPA", highestPackage: "₹24 LPA", placed: "95%" },
    { branch: "Electronics & Communication", avgPackage: "₹6.2 LPA", highestPackage: "₹18 LPA", placed: "88%" },
    { branch: "Mechanical Engineering", avgPackage: "₹5.5 LPA", highestPackage: "₹15 LPA", placed: "75%" },
    { branch: "Civil Engineering", avgPackage: "₹4.8 LPA", highestPackage: "₹12 LPA", placed: "70%" },
  ],
};

// Ranking Data
export const rankingData = [
  { organization: "NIRF", year: 2024, rank: 145, category: "Engineering" },
  { organization: "India Today", year: 2024, rank: 52, category: "Top Private Engineering Colleges" },
  { organization: "The Week", year: 2024, rank: 68, category: "Engineering Colleges" },
  { organization: "Outlook", year: 2024, rank: 75, category: "Top Engineering Colleges in South India" },
];

// Scholarship Data
export const scholarshipData = [
  {
    name: "Merit Scholarship",
    eligibility: "Students scoring above 90% in 10+2",
    amount: "₹50,000 per year",
    type: "Merit-based",
  },
  {
    name: "Sports Scholarship",
    eligibility: "State/National level sports participants",
    amount: "₹30,000 per year",
    type: "Sports-based",
  },
  {
    name: "Need-based Scholarship",
    eligibility: "Family income below ₹2 LPA",
    amount: "Up to 100% fee waiver",
    type: "Need-based",
  },
  {
    name: "Girl Child Scholarship",
    eligibility: "All female students",
    amount: "₹20,000 per year",
    type: "Gender-based",
  },
];

// Hostel Data
export const hostelData = {
  boysHostel: {
    available: true,
    capacity: 500,
    fees: "₹80,000 per year",
    facilities: [
      "24/7 Wi-Fi",
      "Gym & Sports Complex",
      "Mess with Nutritious Food",
      "24/7 Security & CCTV",
      "Medical Room",
      "Reading Room & Library",
      "Hot Water Facility",
      "Laundry Service",
    ],
  },
  girlsHostel: {
    available: true,
    capacity: 300,
    fees: "₹80,000 per year",
    facilities: [
      "24/7 Wi-Fi",
      "Gym & Yoga Room",
      "Mess with Nutritious Food",
      "24/7 Security & CCTV",
      "Medical Room",
      "Reading Room & Library",
      "Hot Water Facility",
      "Laundry Service",
    ],
  },
  rules: [
    "No ragging policy strictly enforced",
    "Visitors allowed only during specified hours",
    "Curfew timings: 9:00 PM for boys, 8:00 PM for girls",
    "No alcohol or smoking in hostel premises",
  ],
};

// Gallery Data (would typically have actual images)
export const galleryData = {
  categories: ["Campus", "Infrastructure", "Events", "Sports", "Labs", "Hostel"],
  images: [
    { id: 1, category: "Campus", title: "Main Building", url: "https://via.placeholder.com/400x300" },
    { id: 2, category: "Infrastructure", title: "Library", url: "https://via.placeholder.com/400x300" },
    { id: 3, category: "Labs", title: "Computer Lab", url: "https://via.placeholder.com/400x300" },
    { id: 4, category: "Events", title: "Annual Day", url: "https://via.placeholder.com/400x300" },
    { id: 5, category: "Sports", title: "Sports Complex", url: "https://via.placeholder.com/400x300" },
    { id: 6, category: "Hostel", title: "Boys Hostel", url: "https://via.placeholder.com/400x300" },
  ],
};

// FAQ Data
export const faqData = [
  {
    question: "What is the admission process for B.Tech?",
    answer:
      "Admission to B.Tech programs is done through KCET/COMEDK/JEE Main scores. Candidates need to register online, appear for the entrance exam, and participate in counselling based on their rank.",
  },
  {
    question: "Does the college provide hostel facilities?",
    answer:
      "Yes, the college provides separate hostel facilities for both boys and girls with modern amenities including Wi-Fi, mess, gym, and 24/7 security.",
  },
  {
    question: "What is the average placement package?",
    answer:
      "The average placement package for 2024 was ₹6.5 LPA with the highest package being ₹24 LPA. The overall placement rate was 85%.",
  },
  {
    question: "Are scholarships available for students?",
    answer:
      "Yes, the college offers various scholarships including merit-based, sports-based, need-based, and girl child scholarships. Eligible students can apply during admission.",
  },
  {
    question: "Is the college AICTE approved?",
    answer:
      "Yes, AIET is approved by AICTE and affiliated to Visvesvaraya Technological University (VTU), Belagavi. It also has NAAC Grade A accreditation.",
  },
  {
    question: "What entrance exams are accepted?",
    answer:
      "For B.Tech: KCET, COMEDK, JEE Main. For M.Tech: GATE score is preferred. For MBA: KMAT, CAT, MAT, CMAT scores are accepted.",
  },
];
