// Sidebar data for college details page
// This will be replaced with API data later

export interface CourseData {
  id: string;
  name: string;
  duration: string;
  fees: string;
  type: string; // "Full Time" | "Part Time"
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
}

export interface RelatedCourse {
  id: string;
  name: string;
}

export interface RelatedCollege {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  program: string;
  fees: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  alt: string;
}

// Sample data for Alva's Institute
export const topCoursesData: CourseData[] = [
  {
    id: "1",
    name: "BE Computer Science and Engineering",
    duration: "4 Years",
    fees: "₹220000",
    type: "Full Time"
  },
  {
    id: "2",
    name: "MBA Financial Management",
    duration: "2 Years",
    fees: "₹57750",
    type: "Full Time"
  },
  {
    id: "3",
    name: "BE Artificial Intelligence & Machine Learning",
    duration: "4 Years",
    fees: "₹220000",
    type: "Full Time"
  }
];

export const newsData: NewsArticle[] = [
  {
    id: "1",
    title: "CAT Diversity at IIM: Benefits for Non-Engineers and Female candidates",
    date: "Sep 25, 2025",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop"
  },
  {
    id: "2",
    title: "CAT LR Preparation 2025: Practice Questions on Cubes",
    date: "Sep 25, 2025",
    thumbnail: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&h=300&fit=crop"
  },
  {
    id: "3",
    title: "Tricks to solve QA Questions for CAT 2025 in less than 1 minute",
    date: "Sep 25, 2025",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop"
  },
  {
    id: "4",
    title: "How to Prepare for CAT 2025 Using Arun Sharma Books",
    date: "Sep 25, 2025",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop"
  }
];

export const facultiesData: Faculty[] = [
  {
    id: "1",
    name: "Mr. Manjunath Kotari",
    designation: "Assistant Professor",
    department: "Department of Computer Science & Engineering"
  },
  {
    id: "2",
    name: "Mr. Venkatesh",
    designation: "Assistant Professor",
    department: "Department of Computer Science & Engineering"
  },
  {
    id: "3",
    name: "Mr. Mahesh Prasanna",
    designation: "Assistant Professor",
    department: "Department of Information Science and Technology"
  }
];

export const relatedCoursesData: RelatedCourse[] = [
  {
    id: "1",
    name: "BE Computer Science and Engineering"
  },
  {
    id: "2",
    name: "MBA Financial Management"
  },
  {
    id: "3",
    name: "BE Mechanical Engineering"
  },
  {
    id: "4",
    name: "BE Information Science & Engineering"
  },
  {
    id: "5",
    name: "MBA Human Resource Management"
  }
];

export const relatedCollegesData: RelatedCollege[] = [
  {
    id: "1",
    name: "Sahyadri College of Engineering and Management",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop",
    rating: 4.1,
    reviews: 108,
    program: "BE/B.Tech - Bachelor of Technology",
    fees: "₹301100"
  },
  {
    id: "2",
    name: "SDM College of Engineering and Technology",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop",
    rating: 4.2,
    reviews: 271,
    program: "BE/B.Tech - Bachelor of Technology",
    fees: "₹311710"
  },
  {
    id: "3",
    name: "Adichunchanagiri Institute of Technology",
    logo: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=100&h=100&fit=crop",
    rating: 3.5,
    reviews: 54,
    program: "BE/B.Tech - Bachelor of Technology",
    fees: "₹206111"
  },
  {
    id: "4",
    name: "Shree Devi Institute of Technology",
    logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=100&h=100&fit=crop",
    rating: 3.7,
    reviews: 36,
    program: "BE/B.Tech - Bachelor of Technology",
    fees: "₹200000"
  }
];

export const photosData: PhotoItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    alt: "College Campus View"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
    alt: "College Building"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    alt: "Computer Lab"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    alt: "Sunset View"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    alt: "College Ground"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=400&h=100&fit=crop",
    alt: "Library"
  }
];
