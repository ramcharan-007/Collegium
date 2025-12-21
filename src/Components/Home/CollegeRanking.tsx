import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface RankingAgency {
  id: string;
  name: string;
}

interface RankedCollege {
  id: string;
  name: string;
  shortName?: string;
  location: string;
  logo?: string;
  ranking: string;
  totalColleges: number;
  stream: string;
}

interface CollegeRankingProps {
  title?: string;
  year?: number;
  years?: number[];
  agencies?: RankingAgency[];
  colleges?: RankedCollege[];
  onYearChange?: (year: number) => void;
  onAgencySelect?: (agencyId: string) => void;
  onCollegeClick?: (collegeId: string) => void;
  onViewAllClick?: () => void;
}

const defaultAgencies: RankingAgency[] = [
  { id: "collegedunia", name: "Collegedunia" },
  { id: "indiatoday", name: "Indiatoday" },
  { id: "theweek", name: "The Week" },
  { id: "nirf", name: "NIRF" },
  { id: "outlook", name: "Outlook" },
  { id: "iirf", name: "IIRF" },
  { id: "times", name: "TOI" },
];

const defaultColleges: RankedCollege[] = [
  {
    id: "1",
    name: "Sam Higginbottom University of Agriculture Technology and Sciences",
    shortName: "SHUATS",
    location: "Allahabad",
    ranking: "1",
    totalColleges: 53,
    stream: "Agriculture",
  },
  {
    id: "2",
    name: "Indian Agricultural Research Institute",
    shortName: "IARI",
    location: "New Delhi",
    ranking: "2",
    totalColleges: 53,
    stream: "Agriculture",
  },
  {
    id: "3",
    name: "National Dairy Research Institute",
    shortName: "NDRI",
    location: "Karnal",
    ranking: "3",
    totalColleges: 53,
    stream: "Agriculture",
  },
  {
    id: "4",
    name: "Punjab Agricultural University",
    shortName: "PAU",
    location: "Ludhiana",
    ranking: "4",
    totalColleges: 53,
    stream: "Agriculture",
  },
  {
    id: "5",
    name: "Banaras Hindu University",
    shortName: "BHU",
    location: "Varanasi",
    ranking: "5",
    totalColleges: 53,
    stream: "Agriculture",
  },
  {
    id: "6",
    name: "Indian Veterinary Research Institute",
    shortName: "IVRI",
    location: "Bareilly",
    ranking: "6",
    totalColleges: 53,
    stream: "Agriculture",
  },
];

const CollegeRanking: React.FC<CollegeRankingProps> = ({
  title = "College Ranking",
  year = 2025,
  years = [2025, 2024, 2023, 2022],
  agencies = defaultAgencies,
  colleges = defaultColleges,
  onYearChange,
  onAgencySelect,
  onCollegeClick,
  onViewAllClick,
}) => {
  const [selectedYear, setSelectedYear] = useState(year);
  const [activeAgency, setActiveAgency] = useState(agencies[0]?.id || "");
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const agencyScrollRef = useRef<HTMLDivElement>(null);

  const handleYearChange = (newYear: number) => {
    setSelectedYear(newYear);
    setIsYearDropdownOpen(false);
    onYearChange?.(newYear);
  };

  const handleAgencyClick = (agencyId: string) => {
    setActiveAgency(agencyId);
    onAgencySelect?.(agencyId);
  };

  const scrollAgencies = (direction: "left" | "right") => {
    if (agencyScrollRef.current) {
      const scrollAmount = 150;
      agencyScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {title} {selectedYear}
          </h2>
          <button
            onClick={onViewAllClick}
            className="text-orange-500 hover:text-orange-600 font-medium text-sm"
          >
            View all Colleges
          </button>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Year Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-600">Ranking:</span>
              <span className="font-medium">{selectedYear}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isYearDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isYearDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => handleYearChange(y)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      selectedYear === y ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Agencies */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Agencies:</span>
            <div className="relative flex-1">
              <button
                onClick={() => scrollAgencies("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-50 hidden md:flex"
              >
                <ChevronLeft className="w-3 h-3 text-gray-600" />
              </button>

              <div
                ref={agencyScrollRef}
                className="flex gap-2 overflow-x-auto scrollbar-hide px-1 md:px-6"
              >
                {agencies.map((agency) => (
                  <button
                    key={agency.id}
                    onClick={() => handleAgencyClick(agency.id)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeAgency === agency.id
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {agency.name}
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollAgencies("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-50 hidden md:flex"
              >
                <ChevronRight className="w-3 h-3 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  College
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Ranking
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Streams
                </th>
              </tr>
            </thead>
            <tbody>
              {colleges.map((college, index) => (
                <tr
                  key={college.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                  onClick={() => onCollegeClick?.(college.id)}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        {college.logo ? (
                          <img
                            src={college.logo}
                            alt={college.name}
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <span className="text-xs font-bold text-gray-400">
                            {college.shortName?.substring(0, 2) ||
                              college.name.substring(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 text-sm">
                          {college.name}
                          {college.shortName && ` - [${college.shortName}]`}
                          {college.location && `, ${college.location}`}
                        </h3>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-orange-500 font-medium">
                      {college.ranking} out of {college.totalColleges}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">
                      {college.stream}
                    </span>
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

export default CollegeRanking;
