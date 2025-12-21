import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface CourseFilter {
  id: string;
  label: string;
}

interface College {
  id: string;
  rank: number;
  name: string;
  shortName?: string;
  location: string;
  rating: number;
  logo?: string;
  nirfRanking?: string;
  cutoff: string;
  cutoffExam: string;
  applicationDeadline: string;
  fees: string;
  feesType: string;
}

interface Top10CollegesProps {
  title?: string;
  filters?: CourseFilter[];
  colleges?: College[];
  onFilterSelect?: (filterId: string) => void;
  onCollegeClick?: (collegeId: string) => void;
}

const defaultFilters: CourseFilter[] = [
  { id: "be-btech", label: "BE/B.Tech" },
  { id: "mba-pgdm", label: "MBA/PGDM" },
  { id: "mbbs", label: "MBBS" },
  { id: "me-mtech", label: "ME/M.Tech" },
  { id: "bsc", label: "B.Sc" },
  { id: "ba", label: "BA" },
  { id: "bcom", label: "B.Com" },
  { id: "bca", label: "BCA" },
  { id: "bba-bms", label: "BBA/BMS" },
  { id: "bsc-nursing", label: "B.Sc (Nursing)" },
];

const defaultColleges: College[] = [
  {
    id: "1",
    rank: 1,
    name: "IIMA - Indian Institute of Management",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    nirfRanking: "#2 out of 50 in India 2019",
    cutoff: "CAT 2024 Cut off 99",
    cutoffExam: "CAT",
    applicationDeadline: "7 July - 08 Sept 2025",
    fees: "₹1,38,060",
    feesType: "Total Fees",
  },
  {
    id: "2",
    rank: 2,
    name: "IIT Bombay - Indian Institute of Technology",
    shortName: "IITB",
    location: "Mumbai, Maharashtra",
    rating: 5,
    nirfRanking: "#2 out of 50 in India 2025",
    cutoff: "JEE-Advanced 2025 Cut off 66",
    cutoffExam: "JEE-Advanced",
    applicationDeadline: "1 Oct - 05 Nov 2025",
    fees: "₹2,36,000",
    feesType: "1st Year Fees",
  },
  {
    id: "3",
    rank: 3,
    name: "All India Institute of Medical Sciences",
    shortName: "AIIMS",
    location: "New Delhi, Delhi NCR",
    rating: 4.9,
    nirfRanking: "#8 out of 200 in India 2025",
    cutoff: "NEET 2025 Cut off 48",
    cutoffExam: "NEET",
    applicationDeadline: "8 Apr - 07 May 2025",
    fees: "₹1,805",
    feesType: "1st Year Fees",
  },
  {
    id: "4",
    rank: 4,
    name: "National Law School of India University",
    shortName: "NLSIU",
    location: "Bangalore, Karnataka",
    rating: 4.9,
    cutoff: "CLAT 2025 Cut off 112",
    cutoffExam: "CLAT",
    applicationDeadline: "15 Nov - 23 Mar 2026",
    fees: "₹5,00,000",
    feesType: "Total Fees",
  },
  {
    id: "5",
    rank: 5,
    name: "Vardhman Mahavir Medical College",
    shortName: "VMMC",
    location: "New Delhi, Delhi NCR",
    rating: 4.9,
    cutoff: "NEET 2025 Cut off 132",
    cutoffExam: "NEET",
    applicationDeadline: "1 Feb - 15 May 2024",
    fees: "-",
    feesType: "",
  },
  {
    id: "6",
    rank: 6,
    name: "IIT Delhi - Indian Institute of Technology",
    shortName: "IITD",
    location: "New Delhi, Delhi NCR",
    rating: 4.9,
    nirfRanking: "#3 out of 50 in India 2025",
    cutoff: "JEE-Advanced 2025 Cut off 355",
    cutoffExam: "JEE-Advanced",
    applicationDeadline: "1 Oct - 05 Nov 2025",
    fees: "₹2,27,750",
    feesType: "1st Year Fees",
  },
  {
    id: "7",
    rank: 7,
    name: "IIMC - Indian Institute of Management",
    location: "Kolkata, West Bengal",
    rating: 4.9,
    nirfRanking: "#99 out of 200 in India 2023",
    cutoff: "CAT 2024 Cut off 99",
    cutoffExam: "CAT",
    applicationDeadline: "16 Oct - 26 Nov 2025",
    fees: "₹13,50,000",
    feesType: "Total Fees",
  },
  {
    id: "8",
    rank: 8,
    name: "Hindu College",
    location: "New Delhi, Delhi NCR",
    rating: 4.9,
    nirfRanking: "#1 out of 300 in India 2025",
    cutoff: "CUET 2025 Cut off 448",
    cutoffExam: "CUET",
    applicationDeadline: "17 June - 10 Aug 2025",
    fees: "₹28,670",
    feesType: "1st Year Fees",
  },
];

const Top10Colleges: React.FC<Top10CollegesProps> = ({
  title = "Top 10 Colleges",
  filters = defaultFilters,
  colleges = defaultColleges,
  onFilterSelect,
  onCollegeClick,
}) => {
  const [activeFilter, setActiveFilter] = useState(filters[0]?.id || "");
  const filterScrollRef = useRef<HTMLDivElement>(null);

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterSelect?.(filterId);
  };

  const scrollFilters = (direction: "left" | "right") => {
    if (filterScrollRef.current) {
      const scrollAmount = 200;
      filterScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm text-gray-600">{rating}/5</span>
      </div>
    );
  };

  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          {title}
        </h2>

        {/* Filters */}
        <div className="relative mb-6">
          <button
            onClick={() => scrollFilters("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-50 hidden md:flex"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          <div
            ref={filterScrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide px-2 md:px-8"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollFilters("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-50 hidden md:flex"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Rank
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  College
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Ranking
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Cutoff
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Application Deadline
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Fees
                </th>
              </tr>
            </thead>
            <tbody>
              {colleges.map((college) => (
                <tr
                  key={college.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onCollegeClick?.(college.id)}
                >
                  <td className="py-4 px-4">
                    <span className="text-gray-500 font-medium">
                      #{college.rank}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        {college.logo ? (
                          <img
                            src={college.logo}
                            alt={college.name}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <span className="text-xs font-bold text-gray-400">
                            {college.shortName ||
                              college.name.substring(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                          {college.name}
                          {college.shortName && ` - [${college.shortName}]`}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">
                            {college.location}
                          </span>
                          <span className="text-gray-300">|</span>
                          {renderStars(college.rating)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {college.nirfRanking ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded font-medium">
                          NIRF
                        </span>
                        <span className="text-sm text-gray-600">
                          {college.nirfRanking}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <span className="text-sm text-gray-800">
                        {college.cutoff}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">
                      {college.applicationDeadline}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <span className="text-sm font-semibold text-orange-500">
                        {college.fees}
                      </span>
                      {college.feesType && (
                        <span className="text-xs text-gray-500 block">
                          {college.feesType}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Top10Colleges;
