import { List, Grid3X3, AlignJustify } from "lucide-react";

export type SortOption = "popularity" | "rating" | "fees-high" | "fees-low";
export type ViewMode = "list" | "grid" | "compact";

interface SortOptionsProps {
  totalCount: number;
  currentSort: SortOption;
  currentView: ViewMode;
  onSortChange: (sort: SortOption) => void;
  onViewChange: (view: ViewMode) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({
  totalCount,
  currentSort,
  currentView,
  onSortChange,
  onViewChange,
}) => {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "popularity", label: "Popularity" },
    { value: "rating", label: "Rating" },
    { value: "fees-high", label: "Highest Fees" },
    { value: "fees-low", label: "Lowest Fees" },
  ];

  const viewOptions: { value: ViewMode; icon: React.ReactNode }[] = [
    { value: "list", icon: <AlignJustify className="w-4 h-4" /> },
    { value: "grid", icon: <Grid3X3 className="w-4 h-4" /> },
    { value: "compact", icon: <List className="w-4 h-4" /> },
  ];

  return (
    <div className="flex items-center justify-between py-4 px-4 bg-white border-b border-gray-200">
      {/* Results Count */}
      <div>
        <span className="text-gray-800 font-semibold">
          Found {totalCount.toLocaleString()} Colleges
        </span>
      </div>

      {/* Sort and View Options */}
      <div className="flex items-center gap-4">
        {/* Sort By */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort By</span>
          <div className="flex items-center gap-1">
            {sortOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-1 cursor-pointer"
              >
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={currentSort === option.value}
                  onChange={() => onSortChange(option.value)}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                />
                <span
                  className={`text-sm ${
                    currentSort === option.value
                      ? "text-gray-800 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          {viewOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onViewChange(option.value)}
              className={`p-2 transition-colors ${
                currentView === option.value
                  ? "bg-gray-100 text-gray-800"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
              title={`${option.value} view`}
            >
              {option.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortOptions;
