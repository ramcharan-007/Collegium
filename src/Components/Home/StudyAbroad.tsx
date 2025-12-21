import { useRef } from "react";
import { ChevronLeft, ChevronRight, Globe, DollarSign } from "lucide-react";

interface Guide {
  title: string;
  link?: string;
}

interface Country {
  id: string;
  name: string;
  flag?: string;
  collegeCount: number;
  avgStudyCost: string;
  currency: string;
  guides: Guide[];
}

interface StudyAbroadProps {
  title?: string;
  countries?: Country[];
  onCountryClick?: (countryId: string) => void;
  onGuideClick?: (countryId: string, guideTitle: string) => void;
  onCheckColleges?: (countryId: string) => void;
}

const defaultCountries: Country[] = [
  {
    id: "usa",
    name: "Study in USA",
    collegeCount: 1019,
    avgStudyCost: "34 K",
    currency: "USD/Year",
    guides: [
      { title: "Why Study in the USA?" },
      { title: "SOP for USA" },
      { title: "Exams for Studying in USA" },
      { title: "Post Study Opportunities in USA" },
    ],
  },
  {
    id: "uk",
    name: "Study in UK",
    collegeCount: 175,
    avgStudyCost: "22.37 K",
    currency: "USD/Year",
    guides: [
      { title: "Why Study in UK?" },
      { title: "SOP for UK" },
      { title: "UK Student VISA" },
      { title: "Cost to Study in UK" },
    ],
  },
  {
    id: "canada",
    name: "Study in Canada",
    collegeCount: 223,
    avgStudyCost: "25.5 K",
    currency: "USD/Year",
    guides: [
      { title: "Why Study in Canada" },
      { title: "Top Universities to study" },
      { title: "SOP for Canada" },
      { title: "Work Study in Canada" },
    ],
  },
  {
    id: "australia",
    name: "Study in Australia",
    collegeCount: 156,
    avgStudyCost: "28 K",
    currency: "USD/Year",
    guides: [
      { title: "Why Study in Australia?" },
      { title: "Top Universities" },
      { title: "Student VISA Process" },
      { title: "Cost of Living" },
    ],
  },
  {
    id: "germany",
    name: "Study in Germany",
    collegeCount: 210,
    avgStudyCost: "15 K",
    currency: "USD/Year",
    guides: [
      { title: "Why Study in Germany?" },
      { title: "Free Education in Germany" },
      { title: "German Language Requirements" },
      { title: "Work Opportunities" },
    ],
  },
];

const getCountryIcon = (countryId: string) => {
  switch (countryId) {
    case "usa":
      return (
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
          <span className="text-2xl">🗽</span>
        </div>
      );
    case "uk":
      return (
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <span className="text-2xl">🏰</span>
        </div>
      );
    case "canada":
      return (
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
          <span className="text-2xl">🍁</span>
        </div>
      );
    case "australia":
      return (
        <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
          <span className="text-2xl">🦘</span>
        </div>
      );
    case "germany":
      return (
        <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
          <span className="text-2xl">🏛️</span>
        </div>
      );
    default:
      return (
        <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
          <Globe className="w-6 h-6 text-gray-400" />
        </div>
      );
  }
};

const StudyAbroad: React.FC<StudyAbroadProps> = ({
  title = "Study Abroad",
  countries = defaultCountries,
  onCountryClick,
  onGuideClick,
  onCheckColleges,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
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
            {countries.map((country) => (
              <div
                key={country.id}
                className="shrink-0 w-[320px] md:w-[360px] bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                style={{ scrollSnapAlign: "start" }}
                onClick={() => onCountryClick?.(country.id)}
              >
                {/* Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    {getCountryIcon(country.id)}
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {country.name}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCheckColleges?.(country.id);
                        }}
                        className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                      >
                        Check {country.collegeCount} Colleges
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Globe className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">No. Of Colleges</p>
                        <p className="font-semibold text-gray-800">
                          {country.collegeCount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Avg. Study Cost</p>
                        <p className="font-semibold text-gray-800">
                          {country.avgStudyCost}{" "}
                          <span className="text-xs font-normal text-gray-500">
                            {country.currency}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guides */}
                <div className="p-5">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Guides
                  </h4>
                  <div className="space-y-2">
                    {country.guides.map((guide, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          onGuideClick?.(country.id, guide.title);
                        }}
                        className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 transition-colors py-1"
                      >
                        <span>{guide.title}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ))}
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

export default StudyAbroad;
