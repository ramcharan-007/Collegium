import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StudyGoal {
  id: string;
  title: string;
  collegeCount: number;
  icon: React.ReactNode;
  courses: string[];
}

interface SelectStudyGoalProps {
  goals?: StudyGoal[];
  onGoalSelect?: (goalId: string) => void;
  onCourseSelect?: (course: string) => void;
}

const defaultGoals: StudyGoal[] = [
  {
    id: "engineering",
    title: "Engineering",
    collegeCount: 6352,
    icon: (
      <svg
        className="w-8 h-8 text-blue-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
        <rect x="8" y="4" width="8" height="4" rx="1" />
      </svg>
    ),
    courses: ["BE/B.Tech", "Diploma in Engineering", "ME/M.Tech"],
  },
  {
    id: "management",
    title: "Management",
    collegeCount: 7977,
    icon: (
      <svg
        className="w-8 h-8 text-blue-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 3v18h18" />
        <path d="M7 16l4-4 4 4 5-6" />
      </svg>
    ),
    courses: ["MBA/PGDM", "BBA/BMS", "Executive MBA"],
  },
  {
    id: "commerce",
    title: "Commerce",
    collegeCount: 5058,
    icon: (
      <svg
        className="w-8 h-8 text-blue-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    courses: ["B.Com", "M.Com"],
  },
  {
    id: "arts",
    title: "Arts",
    collegeCount: 5710,
    icon: (
      <svg
        className="w-8 h-8 text-blue-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    courses: ["BA", "MA", "BFA", "BSW"],
  },
  {
    id: "medical",
    title: "Medical",
    collegeCount: 4520,
    icon: (
      <svg
        className="w-8 h-8 text-blue-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    courses: ["MBBS", "BDS", "BAMS", "BHMS"],
  },
  {
    id: "science",
    title: "Science",
    collegeCount: 4890,
    icon: (
      <svg
        className="w-8 h-8 text-blue-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 3h6v2H9V3z" />
        <path d="M8 5v6l-4 8h16l-4-8V5" />
        <circle cx="12" cy="15" r="2" />
      </svg>
    ),
    courses: ["B.Sc", "M.Sc", "B.Sc (Nursing)"],
  },
  {
    id: "law",
    title: "Law",
    collegeCount: 2340,
    icon: (
      <svg
        className="w-8 h-8 text-blue-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    courses: ["LLB", "LLM", "BA LLB"],
  },
];

const SelectStudyGoal: React.FC<SelectStudyGoalProps> = ({
  goals = defaultGoals,
  onGoalSelect,
  onCourseSelect,
}) => {
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null);
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

  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Select Your Study Goal
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

          {/* Goals Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 md:px-10"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="flex-shrink-0 w-[200px] md:w-[220px] border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer bg-white"
                style={{ scrollSnapAlign: "start" }}
                onMouseEnter={() => setHoveredGoal(goal.id)}
                onMouseLeave={() => setHoveredGoal(null)}
                onClick={() => onGoalSelect?.(goal.id)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {goal.collegeCount.toLocaleString()} Colleges
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {goal.courses.map((course) => (
                    <button
                      key={course}
                      onClick={(e) => {
                        e.stopPropagation();
                        onCourseSelect?.(course);
                      }}
                      className={`block w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                        hoveredGoal === goal.id
                          ? "text-blue-600 hover:bg-blue-50"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {course}
                    </button>
                  ))}
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

export default SelectStudyGoal;
