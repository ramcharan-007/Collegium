import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Exam {
  id: string;
  name: string;
  type: "Online" | "Offline";
  participatingColleges: number;
  examDate: string;
  examLevel: string;
  logo?: string;
}

interface TopExamsProps {
  title?: string;
  exams?: Exam[];
  onExamClick?: (examId: string) => void;
  onApplicationProcess?: (examId: string) => void;
  onExamInfo?: (examId: string) => void;
}

const defaultExams: Exam[] = [
  {
    id: "cuet",
    name: "CUET",
    type: "Offline",
    participatingColleges: 549,
    examDate: "May 13, 2025",
    examLevel: "National",
  },
  {
    id: "neet",
    name: "NEET",
    type: "Offline",
    participatingColleges: 1370,
    examDate: "May 04, 2025",
    examLevel: "National",
  },
  {
    id: "jee-main",
    name: "JEE Main",
    type: "Online",
    participatingColleges: 2016,
    examDate: "January 22, 2026",
    examLevel: "National",
  },
  {
    id: "jee-advanced",
    name: "JEE Advanced",
    type: "Online",
    participatingColleges: 23,
    examDate: "May 18, 2025",
    examLevel: "National",
  },
  {
    id: "cat",
    name: "CAT",
    type: "Online",
    participatingColleges: 1200,
    examDate: "November 24, 2025",
    examLevel: "National",
  },
  {
    id: "gate",
    name: "GATE",
    type: "Online",
    participatingColleges: 900,
    examDate: "February 01, 2026",
    examLevel: "National",
  },
];

const TopExams: React.FC<TopExamsProps> = ({
  title = "Top Exams",
  exams = defaultExams,
  onExamClick,
  onApplicationProcess,
  onExamInfo,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getExamTypeColor = (type: "Online" | "Offline") => {
    return type === "Online" ? "text-blue-600" : "text-orange-500";
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
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="shrink-0 w-[260px] md:w-[280px] bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                style={{ scrollSnapAlign: "start" }}
                onClick={() => onExamClick?.(exam.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                      {exam.logo ? (
                        <img
                          src={exam.logo}
                          alt={exam.name}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <svg
                          className="w-6 h-6 text-green-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 12l2 2 4-4" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <span
                        className={`text-xs font-medium ${getExamTypeColor(
                          exam.type
                        )}`}
                      >
                        {exam.type} Exam
                      </span>
                      <h3 className="font-bold text-xl text-gray-800">
                        {exam.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-cyan-500">
                      Participating Colleges
                    </span>
                    <span className="font-semibold text-gray-800">
                      {exam.participatingColleges.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Exam Date</span>
                    <span className="font-medium text-gray-800">
                      {exam.examDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Exam Level</span>
                    <span className="font-medium text-gray-800">
                      {exam.examLevel}
                    </span>
                  </div>
                </div>

                {/* Action Links */}
                <div className="border-t pt-3 space-y-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onApplicationProcess?.(exam.id);
                    }}
                    className="w-full flex items-center justify-between text-sm text-gray-700 hover:text-blue-600 transition-colors py-1"
                  >
                    <span>Application Process</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onExamInfo?.(exam.id);
                    }}
                    className="w-full flex items-center justify-between text-sm text-gray-700 hover:text-blue-600 transition-colors py-1"
                  >
                    <span>Exam Info</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
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

export default TopExams;
