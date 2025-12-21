import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProgramFilter {
  id: string;
  label: string;
}

interface RankingItem {
  name: string;
  count: number;
}

interface CollegeComparison {
  college1: { name: string; program: string; logo?: string };
  college2: { name: string; program: string; logo?: string };
}

interface ProgramCard {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  bgColor: string;
  items?: string[];
  rankings?: RankingItem[];
  comparisons?: CollegeComparison[];
  linkText: string;
  linkUrl?: string;
}

interface ExploreProgramsProps {
  filters?: ProgramFilter[];
  cards?: ProgramCard[];
  onFilterSelect?: (filterId: string) => void;
  onCardClick?: (cardId: string) => void;
  onLinkClick?: (cardId: string) => void;
}

const defaultFilters: ProgramFilter[] = [
  { id: "all", label: "All" },
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

const defaultCards: ProgramCard[] = [
  {
    id: "ranking",
    title: "Ranking",
    subtitle: "College ranked based on real data",
    bgColor: "bg-orange-50",
    rankings: [
      { name: "Collegedunia", count: 2932 },
      { name: "Indiatoday", count: 1813 },
      { name: "IIRF", count: 1754 },
      { name: "Outlook", count: 1381 },
    ],
    linkText: "Top Ranked Colleges in India",
  },
  {
    id: "find-colleges",
    title: "Find Colleges",
    subtitle: "Discover 19000+ colleges via preferences",
    bgColor: "bg-blue-50",
    items: ["Best MBA colleges in India", "Best BTech colleges in India"],
    linkText: "Discover Top Colleges in India",
  },
  {
    id: "compare-colleges",
    title: "Compare Colleges",
    subtitle: "Compare on the basis of rank, fees, etc.",
    bgColor: "bg-green-50",
    comparisons: [
      {
        college1: { name: "IIT Madras", program: "BE/B.Tech" },
        college2: { name: "IIT Delhi", program: "BE/B.Tech" },
      },
      {
        college1: { name: "IIT Madras", program: "BE/B.Tech" },
        college2: { name: "IIT Bombay", program: "BE/B.Tech" },
      },
    ],
    linkText: "Compare Colleges",
  },
  {
    id: "exams",
    title: "Exams",
    subtitle: "Know more about your exams",
    bgColor: "bg-yellow-50",
    items: [
      "B.Com",
      "B.Sc",
      "B.Sc (Nursing)",
      "BA",
      "BBA/BMS",
      "BCA",
      "BE/B.Tech",
    ],
    linkText: "Check All Entrance Exams in India",
  },
  {
    id: "college-predictor",
    title: "College Predictor",
    subtitle: "Know your college admission chances",
    bgColor: "bg-purple-50",
    items: [
      "CUET",
      "NEET",
      "JEE Main",
      "AYUSH NEET Counselling",
      "JEE Advanced",
    ],
    linkText: "Find Where you may get Admission",
  },
  {
    id: "course-finder",
    title: "Course Finder",
    subtitle: "Discover top courses in Indian Colleges 2025",
    bgColor: "bg-pink-50",
    rankings: [
      { name: "BE/B.Tech", count: 960 },
      { name: "MBA/PGDM", count: 1092 },
      { name: "ME/M.Tech", count: 1233 },
      { name: "B.Sc", count: 1043 },
    ],
    linkText: "Get Top Courses in Indian Colleges",
  },
];

const ExplorePrograms: React.FC<ExploreProgramsProps> = ({
  filters = defaultFilters,
  cards = defaultCards,
  onFilterSelect,
  onCardClick,
  onLinkClick,
}) => {
  const [activeFilter, setActiveFilter] = useState("all");
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

  const renderCardContent = (card: ProgramCard) => {
    if (card.rankings) {
      return (
        <div className="space-y-2">
          {card.rankings.map((ranking, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-gray-700">{ranking.name}</span>
              <span className="text-gray-500">- {ranking.count}</span>
            </div>
          ))}
        </div>
      );
    }

    if (card.comparisons) {
      return (
        <div className="space-y-3">
          {card.comparisons.map((comparison, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                <div>
                  <span className="text-gray-800">
                    {comparison.college1.name}
                  </span>
                  <span className="text-orange-500 text-xs block">
                    {comparison.college1.program}
                  </span>
                </div>
              </div>
              <span className="text-gray-400 text-xs">vs</span>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                <div>
                  <span className="text-gray-800">
                    {comparison.college2.name}
                  </span>
                  <span className="text-orange-500 text-xs block">
                    {comparison.college2.program}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (card.items) {
      return (
        <div className="flex flex-wrap gap-2">
          {card.items.slice(0, 5).map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200 hover:border-blue-400 cursor-pointer transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Explore Programs
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${card.bgColor} rounded-xl p-5 cursor-pointer hover:shadow-lg transition-shadow`}
              onClick={() => onCardClick?.(card.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600">{card.subtitle}</p>
                </div>
                <div className="w-16 h-16 bg-white/50 rounded-lg flex items-center justify-center">
                  {/* Placeholder for illustration */}
                  <svg
                    className="w-10 h-10 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              </div>

              <div className="mb-4 min-h-[80px]">{renderCardContent(card)}</div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLinkClick?.(card.id);
                }}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {card.linkText}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExplorePrograms;
