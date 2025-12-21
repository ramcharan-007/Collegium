import { useState, useEffect, useRef, useCallback } from "react";
import CollegeCard from "./CollegeCard";
import type { CollegeData } from "./CollegeCard";
import FilterBar from "./FilterBar";
import type { FilterConfig, ActiveFilter } from "./FilterBar";
import SortOptions from "./SortOptions";
import type { SortOption, ViewMode } from "./SortOptions";

// Skeleton loader for lazy loading
const CollegeCardSkeleton = ({ viewMode }: { viewMode: ViewMode }) => {
  if (viewMode === "grid") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="h-3 bg-gray-200 rounded w-1/3" />
          <div className="h-6 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="px-4 pb-4 flex gap-2">
          <div className="flex-1 h-8 bg-gray-200 rounded" />
          <div className="flex-1 h-8 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="flex gap-4">
        <div className="w-14 h-14 bg-gray-200 rounded-lg shrink-0" />
        <div className="flex-1 grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
          <div>
            <div className="h-5 bg-gray-200 rounded w-20 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-20" />
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-12 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Promo cards displayed between listings
const PromoCard = ({ type }: { type: "courseFinder" | "collegePredictor" }) => {
  if (type === "courseFinder") {
    return (
      <div className="bg-linear-to-r from-pink-500 to-orange-400 rounded-xl p-6 text-white flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Course Finder</h3>
          <p className="text-sm opacity-90">Explore 30K+ Courses</p>
          <button className="mt-3 px-4 py-2 bg-white text-pink-500 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Search Now →
          </button>
        </div>
        <div className="text-6xl opacity-80">📚</div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-r from-blue-600 to-blue-500 rounded-xl p-6 text-white flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold">College Predictor</h3>
        <p className="text-sm opacity-90">Know Your Odds of Admission</p>
        <button className="mt-3 px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
          Predict Now →
        </button>
      </div>
      <div className="text-6xl opacity-80">🎓</div>
    </div>
  );
};

// Default filter configurations
const defaultFilters: FilterConfig[] = [
  {
    id: "stream",
    label: "Stream",
    options: [
      { id: "engineering", label: "Engineering", count: 5420 },
      { id: "management", label: "Management", count: 3890 },
      { id: "medical", label: "Medical", count: 1250 },
      { id: "law", label: "Law", count: 890 },
      { id: "arts", label: "Arts", count: 2340 },
      { id: "commerce", label: "Commerce", count: 1890 },
    ],
  },
  {
    id: "state",
    label: "State",
    options: [
      { id: "delhi", label: "Delhi NCR", count: 1701 },
      { id: "maharashtra", label: "Maharashtra", count: 2450 },
      { id: "karnataka", label: "Karnataka", count: 1890 },
      { id: "tamil-nadu", label: "Tamil Nadu", count: 1650 },
      { id: "uttar-pradesh", label: "Uttar Pradesh", count: 2100 },
    ],
  },
  {
    id: "city",
    label: "City",
    options: [
      { id: "new-delhi", label: "New Delhi", count: 890 },
      { id: "mumbai", label: "Mumbai", count: 756 },
      { id: "bangalore", label: "Bangalore", count: 645 },
      { id: "chennai", label: "Chennai", count: 534 },
      { id: "kolkata", label: "Kolkata", count: 423 },
    ],
  },
  {
    id: "degree",
    label: "Degree",
    options: [
      { id: "btech", label: "B.Tech", count: 3420 },
      { id: "mba", label: "MBA", count: 2890 },
      { id: "mbbs", label: "MBBS", count: 890 },
      { id: "bcom", label: "B.Com", count: 1560 },
      { id: "ba", label: "BA", count: 1230 },
    ],
  },
  {
    id: "program-type",
    label: "Program Type",
    options: [
      { id: "full-time", label: "Full Time", count: 4500 },
      { id: "part-time", label: "Part Time", count: 890 },
      { id: "distance", label: "Distance", count: 1200 },
      { id: "online", label: "Online", count: 780 },
    ],
  },
  {
    id: "college-type",
    label: "Type Of College",
    options: [
      { id: "government", label: "Government", count: 1890 },
      { id: "private", label: "Private", count: 4560 },
      { id: "deemed", label: "Deemed", count: 890 },
      { id: "autonomous", label: "Autonomous", count: 1230 },
    ],
  },
  {
    id: "entrance-exam",
    label: "Entrance/Exam Accepted",
    options: [
      { id: "jee-main", label: "JEE Main", count: 2340 },
      { id: "jee-advanced", label: "JEE Advanced", count: 890 },
      { id: "neet", label: "NEET", count: 1560 },
      { id: "cat", label: "CAT", count: 1890 },
      { id: "gate", label: "GATE", count: 1230 },
    ],
  },
  {
    id: "avg-fee",
    label: "Avg Fee Per Year",
    options: [
      { id: "below-50k", label: "Below 50K", count: 2340 },
      { id: "50k-1l", label: "50K - 1 Lakh", count: 3450 },
      { id: "1l-3l", label: "1 - 3 Lakhs", count: 2890 },
      { id: "3l-5l", label: "3 - 5 Lakhs", count: 1560 },
      { id: "above-5l", label: "Above 5 Lakhs", count: 890 },
    ],
  },
  {
    id: "course-type",
    label: "Course Type",
    options: [
      { id: "ug", label: "Undergraduate", count: 4560 },
      { id: "pg", label: "Postgraduate", count: 3420 },
      { id: "diploma", label: "Diploma", count: 1890 },
      { id: "phd", label: "PhD", count: 890 },
    ],
  },
  {
    id: "agency",
    label: "Agency",
    options: [
      { id: "nirf", label: "NIRF", count: 890 },
      { id: "naac", label: "NAAC", count: 2340 },
      { id: "qs", label: "QS World", count: 234 },
      { id: "times", label: "Times", count: 345 },
    ],
  },
  {
    id: "affiliation",
    label: "Affiliation",
    options: [
      { id: "ugc", label: "UGC", count: 3450 },
      { id: "aicte", label: "AICTE", count: 2890 },
      { id: "mci", label: "MCI", count: 890 },
      { id: "bci", label: "BCI", count: 567 },
    ],
  },
];

// Mock data generator for demo
const generateMockColleges = (
  page: number,
  pageSize: number
): CollegeData[] => {
  const colleges: CollegeData[] = [];
  const startIndex = (page - 1) * pageSize;

  const sampleColleges = [
    {
      name: "All India Institute of Medical Sciences",
      shortName: "AIIMS",
      location: "New Delhi, Delhi NCR",
      approvals: ["MCI", "UGC Approved"],
      course: "MBBS",
      fees: "1,628",
      feesType: "Total Fees",
      rating: 4.3,
      reviewCount: 256,
      bestIn: "Best in Infrastructure",
      ranking: { position: 8, total: 200, agency: "NIRF", year: 2025 },
      additionalRankings: 6,
    },
    {
      name: "Vardhman Mahavir Medical College",
      shortName: "VMMC",
      location: "New Delhi, Delhi NCR",
      approvals: ["MCI", "MHRD Approved"],
      course: "MBBS",
      fees: "57,000",
      feesType: "1st Year Fees",
      rating: 4.4,
      reviewCount: 39,
      bestIn: "Best in Placements",
      ranking: { position: 2, total: 632, agency: "NIRF", year: 2025 },
      additionalRankings: 3,
    },
    {
      name: "IIT Delhi - Indian Institute of Technology",
      shortName: "IITD",
      location: "New Delhi, Delhi NCR",
      approvals: ["AICTE", "UGC"],
      course: "BE/B.Tech",
      fees: "2,27,750",
      feesType: "1st Year Fees",
      rating: 4.3,
      reviewCount: 993,
      bestIn: "Best in Social Life",
      placement: { averagePackage: "25,82,000", highestPackage: "2,00,00,000" },
      ranking: { position: 123, total: 1401, agency: "QS", year: 2026 },
      additionalRankings: 10,
      cdScore: 1605,
    },
    {
      name: "Hindu College",
      shortName: "HC",
      location: "New Delhi, Delhi NCR",
      approvals: ["UGC Approved"],
      course: "BA",
      fees: "28,670",
      feesType: "1st Year Fees",
      rating: 4.2,
      reviewCount: 386,
      bestIn: "Best in Social Life",
      placement: { averagePackage: "8,40,000", highestPackage: "36,50,000" },
      ranking: { position: 1, total: 300, agency: "NIRF", year: 2025 },
      additionalRankings: 2,
      cdScore: 1839,
      naacGrade: "A+",
    },
  ];

  for (let i = 0; i < pageSize; i++) {
    const index = startIndex + i;
    const template = sampleColleges[index % sampleColleges.length];
    colleges.push({
      id: `college-${index + 1}`,
      rank: index + 1,
      ...template,
    });
  }

  return colleges;
};

interface CollegeListingProps {
  title?: string;
  subtitle?: string;
  initialFilters?: ActiveFilter[];
  pageSize?: number;
  totalColleges?: number;
}

const CollegeListing: React.FC<CollegeListingProps> = ({
  title = "List of Colleges in Delhi NCR Based on 2025 Ranking",
  subtitle,
  initialFilters = [],
  pageSize = 10,
  totalColleges = 1701,
}) => {
  const [colleges, setColleges] = useState<CollegeData[]>([]);
  const [activeFilters, setActiveFilters] =
    useState<ActiveFilter[]>(initialFilters);
  const [sortOption, setSortOption] = useState<SortOption>("popularity");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [compareList, setCompareList] = useState<string[]>([]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Load initial data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const initialColleges = generateMockColleges(1, pageSize);
      setColleges(initialColleges);
      setIsLoading(false);
    }, 500);
  }, [pageSize]);

  // Load more data on scroll (Lazy Loading / Infinite Scroll)
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = page + 1;

    // Simulate API call with delay
    setTimeout(() => {
      const newColleges = generateMockColleges(nextPage, pageSize);

      if (colleges.length + newColleges.length >= totalColleges) {
        setHasMore(false);
      }

      setColleges((prev) => [...prev, ...newColleges]);
      setPage(nextPage);
      setIsLoading(false);
    }, 800);
  }, [isLoading, hasMore, page, pageSize, colleges.length, totalColleges]);

  // Setup Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, loadMore]);

  // Filter handlers
  const handleFilterChange = (
    filterId: string,
    optionId: string,
    isSelected: boolean
  ) => {
    const filter = defaultFilters.find((f) => f.id === filterId);
    const option = filter?.options.find((o) => o.id === optionId);

    if (isSelected && option) {
      setActiveFilters((prev) => [
        ...prev,
        { filterId, optionId, label: option.label },
      ]);
    } else {
      setActiveFilters((prev) =>
        prev.filter(
          (f) => !(f.filterId === filterId && f.optionId === optionId)
        )
      );
    }

    // Reset pagination when filters change
    setPage(1);
    setColleges([]);
    setHasMore(true);
  };

  const handleClearFilter = (filterId: string, optionId: string) => {
    setActiveFilters((prev) =>
      prev.filter((f) => !(f.filterId === filterId && f.optionId === optionId))
    );
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
    setPage(1);
    setColleges([]);
    setHasMore(true);
  };

  // Compare handlers
  const handleAddToCompare = (collegeId: string) => {
    setCompareList((prev) => {
      if (prev.includes(collegeId)) {
        return prev.filter((id) => id !== collegeId);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 colleges only");
        return prev;
      }
      return [...prev, collegeId];
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>🏠</span>
            <span>Delhi NCR Colleges</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-orange-500">
            {title}
          </h1>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>

      {/* Promo Cards */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PromoCard type="courseFinder" />
          <PromoCard type="collegePredictor" />
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-10">
        <FilterBar
          filters={defaultFilters}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearFilter={handleClearFilter}
          onClearAll={handleClearAllFilters}
        />
      </div>

      {/* Sort Options */}
      <SortOptions
        totalCount={totalColleges}
        currentSort={sortOption}
        currentView={viewMode}
        onSortChange={setSortOption}
        onViewChange={setViewMode}
      />

      {/* College Cards */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Table Header for List View */}
        {viewMode === "list" && colleges.length > 0 && (
          <div className="bg-orange-500 text-white rounded-t-lg overflow-hidden mb-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium w-20">
                      CD Rank
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium w-80">
                      Colleges
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium w-36">
                      Course Fees
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium w-36">
                      Placement
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium w-36">
                      User Reviews
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium w-40">
                      Ranking
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        )}

        {/* College Cards Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "space-y-3"
          }
        >
          {colleges.map((college) => (
            <CollegeCard
              key={college.id}
              college={college}
              viewMode={viewMode}
              isCompareSelected={compareList.includes(college.id)}
              onApplyNow={(id) => console.log("Apply:", id)}
              onDownloadBrochure={(id) => console.log("Brochure:", id)}
              onAddToCompare={handleAddToCompare}
              onCompareFees={(id) => console.log("Compare fees:", id)}
              onComparePlacement={(id) => console.log("Compare placement:", id)}
              onClick={(id) => console.log("College clicked:", id)}
            />
          ))}

          {/* Loading Skeletons */}
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <CollegeCardSkeleton
                key={`skeleton-${index}`}
                viewMode={viewMode}
              />
            ))}
        </div>

        {/* Load More Trigger (for Intersection Observer) */}
        <div
          ref={loadMoreRef}
          className="h-10 flex items-center justify-center mt-4"
        >
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <span>Loading more colleges...</span>
            </div>
          )}
          {!hasMore && colleges.length > 0 && (
            <p className="text-gray-500 text-sm">
              You've reached the end of the list
            </p>
          )}
        </div>
      </div>

      {/* Compare Floating Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {compareList.length} college(s) selected for comparison
              </span>
              <button
                onClick={() => setCompareList([])}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Clear All
              </button>
            </div>
            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
              Compare Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeListing;
