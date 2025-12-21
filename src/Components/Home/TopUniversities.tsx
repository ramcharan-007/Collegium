import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface University {
  id: string;
  name: string;
  shortName?: string;
  location: string;
  accreditation: string[];
  image?: string;
  program: string;
  rating: number;
  reviewCount: number;
  fees: string;
  feesType: string;
  ranking?: string;
  cdScore?: number;
}

interface TopUniversitiesProps {
  title?: string;
  universities?: University[];
  onUniversityClick?: (universityId: string) => void;
  onViewCourses?: (universityId: string) => void;
  onDownloadBrochure?: (universityId: string) => void;
  onCompare?: (universityId: string) => void;
}

const defaultUniversities: University[] = [
  {
    id: "1",
    name: "IIMA - Indian Institute of Management",
    location: "Ahmedabad, Gujarat",
    accreditation: ["UGC"],
    program: "MBA/PGDM",
    rating: 4.5,
    reviewCount: 58,
    fees: "27.50 Lacs",
    feesType: "Total Fees",
    ranking: "Ranked 428 out of 2000 CWUR",
    cdScore: 10,
  },
  {
    id: "2",
    name: "IIT Bombay - Indian Institute of Technology",
    shortName: "IITB",
    location: "Mumbai, Maharashtra",
    accreditation: ["AICTE", "UGC"],
    program: "ME/M.Tech",
    rating: 4.4,
    reviewCount: 402,
    fees: "72.00 K",
    feesType: "First Year Fees",
    ranking: "Ranked 129 out of 1401 QS",
    cdScore: 10,
  },
  {
    id: "3",
    name: "Chandigarh University",
    shortName: "CU",
    location: "Mohali, Punjab",
    accreditation: ["NCTE", "AICTE"],
    program: "MBA/PGDM",
    rating: 4.4,
    reviewCount: 3778,
    fees: "3.83 Lacs",
    feesType: "Total Fees",
    ranking: "Ranked 32 out of 200 NIRF, Ranked 27 out of 103 I",
    cdScore: 10,
  },
  {
    id: "4",
    name: "Shri Ram College of Commerce",
    shortName: "SRCC",
    location: "New Delhi, Delhi NCR",
    accreditation: ["AICTE"],
    program: "BA",
    rating: 4.3,
    reviewCount: 333,
    fees: "32.42 K",
    feesType: "First Year Fees",
    ranking: "Ranked 18 out of 300 NIRF",
    cdScore: 10,
  },
  {
    id: "5",
    name: "Institute of Hotel Management, Catering and Nutrition",
    shortName: "IHM",
    location: "New Delhi, Delhi NCR",
    accreditation: ["NCHMCT"],
    program: "Diploma in Hotel Management",
    rating: 4.1,
    reviewCount: 113,
    fees: "99.70 K",
    feesType: "Total Fees",
    ranking: "Ranked 1 out of 130 Collegedunia, Ranked 1 out of",
    cdScore: 10,
  },
  {
    id: "6",
    name: "NALSAR University of Law",
    shortName: "NALSAR",
    location: "Hyderabad, Telangana",
    accreditation: ["AICTE", "BCI"],
    program: "MBA/PGDM",
    rating: 4.5,
    reviewCount: 40,
    fees: "2.20 Lacs",
    feesType: "First Year Fees",
    ranking: "Ranked 2 out of 98 Collegedunia, Ranked 2 out of",
    cdScore: 10,
  },
];

const TopUniversities: React.FC<TopUniversitiesProps> = ({
  title = "Top Universities/Colleges",
  universities = defaultUniversities,
  onUniversityClick,
  onViewCourses,
  onDownloadBrochure,
  onCompare,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          {title}
        </h2>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors hidden md:flex items-center justify-center"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 md:px-10"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {universities.map((university) => (
              <div
                key={university.id}
                className="shrink-0 w-[300px] md:w-[340px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                style={{ scrollSnapAlign: "start" }}
                onClick={() => onUniversityClick?.(university.id)}
              >
                {/* Image Section */}
                <div className="relative h-40 bg-gradient-to-br from-gray-700 to-gray-900">
                  {university.image ? (
                    <img
                      src={university.image}
                      alt={university.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-4xl font-bold opacity-30">
                        {university.shortName ||
                          university.name.substring(0, 3).toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* CD Score Badge */}
                  {university.cdScore && (
                    <div className="absolute top-3 right-3 bg-cyan-400 text-white text-xs font-bold px-2 py-1 rounded">
                      <span className="text-[10px]">cd</span>{" "}
                      {university.cdScore}/10
                    </div>
                  )}

                  {/* University Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-gray-600">
                          {university.shortName ||
                            university.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm line-clamp-2">
                          {university.name}
                        </h3>
                        <p className="text-gray-300 text-xs">
                          {university.location} |{" "}
                          {university.accreditation.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-blue-600 font-medium text-sm">
                      {university.program}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {university.rating}/5
                      </span>
                      <span className="text-xs text-gray-500">
                        {university.reviewCount} reviews
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="text-cyan-500 font-semibold">
                      {university.fees}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      {university.feesType}
                    </span>
                  </div>

                  {university.ranking && (
                    <p className="text-xs text-gray-500 mb-4 line-clamp-1">
                      {university.ranking}
                    </p>
                  )}

                  {/* Action Links */}
                  <div className="space-y-2 border-t pt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewCourses?.(university.id);
                      }}
                      className="w-full flex items-center justify-between text-sm text-gray-700 hover:text-blue-600 transition-colors py-1"
                    >
                      <span>View All Courses and fees</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownloadBrochure?.(university.id);
                      }}
                      className="w-full flex items-center justify-between text-sm text-gray-700 hover:text-blue-600 transition-colors py-1"
                    >
                      <span>Download Brochure</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCompare?.(university.id);
                      }}
                      className="w-full flex items-center justify-between text-sm text-gray-700 hover:text-blue-600 transition-colors py-1"
                    >
                      <span>Compare</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors hidden md:flex items-center justify-center"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopUniversities;
