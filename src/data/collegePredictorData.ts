// College Predictor Modal Data
// This data will be used for the multi-step predictor modal

export interface Course {
  id: string;
  name: string;
  fullName: string;
}

export interface Exam {
  id: string;
  name: string;
  logo: string;
}

export interface Category {
  id: string;
  name: string;
  code: string;
}

// Available courses for this college
export const predictorCourses: Course[] = [
  {
    id: "be-btech",
    name: "BE/B.Tech",
    fullName: "Bachelor of Engineering / Bachelor of Technology"
  },
  {
    id: "mba-pgdm",
    name: "MBA/PGDM",
    fullName: "Master of Business Administration / Post Graduate Diploma in Management"
  },
  {
    id: "be-btech-lateral",
    name: "BE/B.Tech Lateral",
    fullName: "Bachelor of Engineering / Bachelor of Technology (Lateral Entry)"
  }
];

// BE/B.Tech specializations
export const beTechSpecializations: Course[] = [
  {
    id: "cse",
    name: "Computer Science and Engineering",
    fullName: "Bachelor of Engineering [BE] (Computer Science and Engineering)"
  },
  {
    id: "aiml",
    name: "Artificial Intelligence & Machine Learning",
    fullName: "Bachelor of Engineering [BE] (Artificial Intelligence & Machine Learning)"
  },
  {
    id: "me",
    name: "Mechanical Engineering",
    fullName: "Bachelor of Engineering [BE] (Mechanical Engineering)"
  },
  {
    id: "ise",
    name: "Information Science & Engineering",
    fullName: "Bachelor of Engineering [BE] (Information Science & Engineering)"
  },
  {
    id: "ds",
    name: "Data Science",
    fullName: "Bachelor of Engineering [BE] (Data Science)"
  },
  {
    id: "ece",
    name: "Electronics & Communication Engineering",
    fullName: "Bachelor of Engineering [BE] (Electronics & Communication Engineering)"
  },
  {
    id: "civil",
    name: "Civil Engineering",
    fullName: "Bachelor of Engineering [BE] (Civil Engineering)"
  },
  {
    id: "eee",
    name: "Electrical & Electronics Engineering",
    fullName: "Bachelor of Engineering [BE] (Electrical & Electronics Engineering)"
  }
];

// Available exams
export const predictorExams: Exam[] = [
  {
    id: "kcet",
    name: "KCET",
    logo: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&h=100&fit=crop"
  },
  {
    id: "comedk",
    name: "COMEDK-UGET",
    logo: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=100&h=100&fit=crop"
  },
  {
    id: "jee-main",
    name: "JEE Main",
    logo: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=100&h=100&fit=crop"
  },
  {
    id: "keam",
    name: "KEAM",
    logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&h=100&fit=crop"
  }
];

// Reservation categories
export const reservationCategories: Category[] = [
  {
    id: "gm",
    name: "General Merit",
    code: "GM"
  },
  {
    id: "2ag",
    name: "Category 2AG",
    code: "2AG"
  },
  {
    id: "3ak",
    name: "Category 3AK",
    code: "3AK"
  },
  {
    id: "scr",
    name: "Scheduled Caste (SC)",
    code: "SCR"
  },
  {
    id: "str",
    name: "Scheduled Tribe (ST)",
    code: "STR"
  },
  {
    id: "obc",
    name: "Other Backward Classes",
    code: "OBC"
  },
  {
    id: "ews",
    name: "Economically Weaker Section",
    code: "EWS"
  }
];

// Rank types based on exam
export const rankTypes: Record<string, string> = {
  kcet: "KCET Rank",
  comedk: "COMEDK Rank",
  "jee-main": "JEE Main Rank",
  keam: "KEAM Rank"
};

// Helper function to get specializations based on course
export const getSpecializationsByCourse = (courseId: string): Course[] => {
  if (courseId === "be-btech" || courseId === "be-btech-lateral") {
    return beTechSpecializations;
  }
  return [];
};

// Helper function to get rank type based on exam
export const getRankTypeByExam = (examId: string): string => {
  return rankTypes[examId] || "Rank";
};
