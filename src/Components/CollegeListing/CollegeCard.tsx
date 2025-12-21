import { memo } from "react";
import { Star, Download, GitCompare, ChevronRight, Check } from "lucide-react";

export interface CollegeData {
  id: string;
  rank: number;
  name: string;
  shortName?: string;
  location: string;
  approvals: string[];
  logo?: string;
  cdScore?: number;
  naacGrade?: string;
  course: string;
  fees: string;
  feesType: string;
  placement?: {
    averagePackage?: string;
    highestPackage?: string;
  };
  rating: number;
  reviewCount: number;
  bestIn?: string;
  ranking?: {
    position: number;
    total: number;
    agency: string;
    year: number;
  };
  additionalRankings?: number;
}

interface CollegeCardProps {
  college: CollegeData;
  onApplyNow?: (collegeId: string) => void;
  onDownloadBrochure?: (collegeId: string) => void;
  onAddToCompare?: (collegeId: string) => void;
  onCompareFees?: (collegeId: string) => void;
  onComparePlacement?: (collegeId: string) => void;
  onClick?: (collegeId: string) => void;
  isCompareSelected?: boolean;
  viewMode?: "list" | "grid" | "compact";
}

const CollegeCard = memo<CollegeCardProps>(
  ({
    college,
    onApplyNow,
    onDownloadBrochure,
    onAddToCompare,
    onCompareFees,
    onComparePlacement,
    onClick,
    isCompareSelected = false,
    viewMode = "list",
  }) => {
    const formatCurrency = (value: string) => {
      return value.startsWith("₹") ? value : `₹ ${value}`;
    };

    if (viewMode === "grid") {
      return (
        <div
          className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onClick?.(college.id)}
        >
          {/* Header with Logo and Score */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                  {college.logo ? (
                    <img
                      src={college.logo}
                      alt={college.name}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <span className="text-xs font-bold text-gray-500">
                      {college.shortName ||
                        college.name.substring(0, 3).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 hover:text-orange-500 transition-colors">
                    {college.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {college.location}
                  </p>
                </div>
              </div>
              {college.cdScore && (
                <div className="shrink-0 bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded">
                  {college.cdScore}/2000
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{college.course}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{college.rating}/5</span>
              </div>
            </div>

            <div>
              <span className="text-lg font-bold text-orange-500">
                {formatCurrency(college.fees)}
              </span>
              <span className="text-xs text-gray-500 block">
                {college.feesType}
              </span>
            </div>

            {college.ranking && (
              <div className="text-xs text-gray-600">
                #{college.ranking.position}
                <sup>th</sup>/{college.ranking.total} in India
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="px-4 pb-4 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onApplyNow?.(college.id);
              }}
              className="flex-1 text-xs text-orange-500 font-medium hover:bg-orange-50 py-2 rounded transition-colors"
            >
              Apply Now
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownloadBrochure?.(college.id);
              }}
              className="flex-1 text-xs text-gray-600 font-medium hover:bg-gray-50 py-2 rounded transition-colors"
            >
              Brochure
            </button>
          </div>
        </div>
      );
    }

    // List View (Default)
    return (
      <div
        className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        onClick={() => onClick?.(college.id)}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <tbody>
              <tr className="border-b border-gray-100 last:border-b-0">
                {/* Rank Column */}
                <td className="py-4 px-4 w-20">
                  <span className="text-gray-500 font-medium">
                    #{college.rank}
                  </span>
                </td>

                {/* College Info Column */}
                <td className="py-4 px-4 w-[320px]">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                      {college.logo ? (
                        <img
                          src={college.logo}
                          alt={college.name}
                          className="w-12 h-12 object-contain"
                        />
                      ) : (
                        <span className="text-sm font-bold text-gray-500">
                          {college.shortName ||
                            college.name.substring(0, 3).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-blue-600 hover:text-blue-700 cursor-pointer text-sm">
                        {college.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {college.location} | {college.approvals.join(", ")}
                      </p>

                      {/* Action Links */}
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onApplyNow?.(college.id);
                          }}
                          className="text-xs text-orange-500 font-medium hover:text-orange-600 flex items-center gap-1"
                        >
                          → Apply Now
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDownloadBrochure?.(college.id);
                          }}
                          className="text-xs text-blue-500 font-medium hover:text-blue-600 flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          Download Brochure
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCompare?.(college.id);
                          }}
                          className={`text-xs font-medium flex items-center gap-1 ${
                            isCompareSelected
                              ? "text-green-600"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {isCompareSelected ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <GitCompare className="w-3 h-3" />
                          )}
                          Add To Compare
                        </button>
                      </div>

                      {/* CD Score */}
                      {college.cdScore && (
                        <div className="mt-2 flex items-center gap-1">
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded font-medium">
                            CD Score: {college.cdScore}/2000
                          </span>
                          <span className="text-gray-400 text-xs">ⓘ</span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Course Fees Column */}
                <td className="py-4 px-4 w-[140px]">
                  <div>
                    <span className="text-lg font-bold text-orange-500">
                      {formatCurrency(college.fees)}
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {college.course}
                    </p>
                    <p className="text-xs text-gray-400">{college.feesType}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCompareFees?.(college.id);
                      }}
                      className="text-xs text-orange-500 mt-1 hover:text-orange-600 flex items-center gap-0.5"
                    >
                      <GitCompare className="w-3 h-3" />
                      Compare Fees
                    </button>
                  </div>
                </td>

                {/* Placement Column */}
                <td className="py-4 px-4 w-[150px]">
                  {college.placement ? (
                    <div>
                      {college.placement.averagePackage && (
                        <div>
                          <span className="text-sm font-semibold text-gray-800">
                            {formatCurrency(college.placement.averagePackage)}
                          </span>
                          <p className="text-xs text-gray-500">
                            Average Package
                          </p>
                        </div>
                      )}
                      {college.placement.highestPackage && (
                        <div className="mt-1">
                          <span className="text-sm font-semibold text-gray-800">
                            {formatCurrency(college.placement.highestPackage)}
                          </span>
                          <p className="text-xs text-gray-500">
                            Highest Package
                          </p>
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onComparePlacement?.(college.id);
                        }}
                        className="text-xs text-orange-500 mt-1 hover:text-orange-600 flex items-center gap-0.5"
                      >
                        <GitCompare className="w-3 h-3" />
                        Compare Placement
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400">--</span>
                  )}
                </td>

                {/* User Reviews Column */}
                <td className="py-4 px-4 w-[140px]">
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="font-medium text-gray-800">
                        {college.rating} / 5
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Based on {college.reviewCount} User Reviews
                    </p>
                    {college.bestIn && (
                      <span className="inline-flex items-center gap-1 text-xs text-green-600 mt-1 bg-green-50 px-2 py-0.5 rounded">
                        <Check className="w-3 h-3" />
                        {college.bestIn}
                      </span>
                    )}
                  </div>
                </td>

                {/* Ranking Column */}
                <td className="py-4 px-4 w-[160px]">
                  {college.ranking ? (
                    <div>
                      <div className="text-sm">
                        <span className="text-orange-500 font-semibold">
                          #{college.ranking.position}
                          <sup>th</sup>
                        </span>
                        <span className="text-gray-600">
                          /{college.ranking.total}
                        </span>
                        <span className="text-gray-600"> in India</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded font-medium">
                          {college.ranking.agency}
                        </span>
                        <span className="text-xs text-gray-500">
                          {college.ranking.year}
                        </span>
                      </div>
                      {college.additionalRankings &&
                        college.additionalRankings > 0 && (
                          <button className="text-xs text-orange-500 mt-1 flex items-center gap-0.5 hover:text-orange-600">
                            + {college.additionalRankings} More
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                    </div>
                  ) : (
                    <span className="text-gray-400">--</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

CollegeCard.displayName = "CollegeCard";

export default CollegeCard;
