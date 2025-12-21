import { useState, useRef } from "react";
import {
  Filter,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterConfig {
  id: string;
  label: string;
  options: FilterOption[];
  multiSelect?: boolean;
}

export interface ActiveFilter {
  filterId: string;
  optionId: string;
  label: string;
}

interface FilterBarProps {
  filters: FilterConfig[];
  activeFilters: ActiveFilter[];
  onFilterChange: (
    filterId: string,
    optionId: string,
    isSelected: boolean
  ) => void;
  onClearAll: () => void;
  onClearFilter: (filterId: string, optionId: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  onClearFilter,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = (filterId: string) => {
    setOpenDropdown(openDropdown === filterId ? null : filterId);
  };

  const handleOptionSelect = (filterId: string, optionId: string) => {
    const isSelected = activeFilters.some(
      (f) => f.filterId === filterId && f.optionId === optionId
    );
    onFilterChange(filterId, optionId, !isSelected);
    setOpenDropdown(null);
  };

  const scrollFilters = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const isFilterActive = (filterId: string) => {
    return activeFilters.some((f) => f.filterId === filterId);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Filter Dropdowns Row */}
      <div className="relative py-3 px-4">
        <div className="flex items-center gap-2">
          {/* All Filter Button */}
          <button className="shrink-0 flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">All Filter</span>
          </button>

          {/* Scrollable Filters */}
          <button
            onClick={() => scrollFilters("left")}
            className="shrink-0 p-1 hover:bg-gray-100 rounded hidden md:flex"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide flex-1"
          >
            {filters.map((filter) => (
              <div key={filter.id} className="relative shrink-0">
                <button
                  onClick={() => handleDropdownToggle(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isFilterActive(filter.id)
                      ? "bg-orange-500 text-white"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{filter.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openDropdown === filter.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {openDropdown === filter.id && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                    {filter.options.map((option) => {
                      const isSelected = activeFilters.some(
                        (f) =>
                          f.filterId === filter.id && f.optionId === option.id
                      );
                      return (
                        <button
                          key={option.id}
                          onClick={() =>
                            handleOptionSelect(filter.id, option.id)
                          }
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between ${
                            isSelected
                              ? "bg-orange-50 text-orange-600"
                              : "text-gray-700"
                          }`}
                        >
                          <span>{option.label}</span>
                          {option.count !== undefined && (
                            <span className="text-gray-400 text-xs">
                              ({option.count})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollFilters("right")}
            className="shrink-0 p-1 hover:bg-gray-100 rounded hidden md:flex"
          >
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Active Filters Tags */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 px-4 pb-3 flex-wrap">
          {activeFilters.map((filter) => (
            <span
              key={`${filter.filterId}-${filter.optionId}`}
              className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm"
            >
              {filter.label}
              <button
                onClick={() => onClearFilter(filter.filterId, filter.optionId)}
                className="hover:bg-orange-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={onClearAll}
            className="text-sm text-gray-500 hover:text-gray-700 ml-2"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
