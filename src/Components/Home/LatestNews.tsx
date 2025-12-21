import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewsTab {
  id: string;
  label: string;
}

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  category: string;
}

interface LatestNewsProps {
  title?: string;
  tabs?: NewsTab[];
  articles?: NewsArticle[];
  onTabSelect?: (tabId: string) => void;
  onArticleClick?: (articleId: string) => void;
  onReadMore?: (articleId: string) => void;
}

const defaultTabs: NewsTab[] = [
  { id: "exam-alerts", label: "Exam Alerts" },
  { id: "college-alerts", label: "College Alerts" },
  { id: "admission-alerts", label: "Admission Alerts" },
];

const defaultArticles: NewsArticle[] = [
  {
    id: "1",
    title: "NEET 2023 Botany Question Paper with Solutions PDF G3",
    date: "Nov 29, 2025",
    excerpt:
      "NEET 2023 Botany Question Paper With Solutions PDF G3 Is Available For Download. NEET 2023 G3 Botany Question Paper Comprises...",
    category: "exam-alerts",
  },
  {
    id: "2",
    title: "NEET 2023 Botany Question Paper with Solutions PDF G2",
    date: "Nov 29, 2025",
    excerpt:
      "NEET 2023 Botany Question Paper With Solutions PDF G2 Is Available For Download. NEET 2023 G2 Botany Question Paper Comprises...",
    category: "exam-alerts",
  },
  {
    id: "3",
    title: "JEE Main 2024 question paper pdf with solutions- Download...",
    date: "Nov 29, 2025",
    excerpt:
      "JEE Main 2024 5 April Shift 2 Chemistry Question Paper With Solutions And Answers Pdf Is Available Here. NTA Conducted JE...",
    category: "exam-alerts",
  },
  {
    id: "4",
    title: "NEET 2023 Botany Question Paper with Solutions",
    date: "Nov 29, 2025",
    excerpt:
      "NEET 2023 Botany Question Paper With Solutions PDF Is Available For Download. NEET 2023 Botany Question Paper Comprises...",
    category: "exam-alerts",
  },
  {
    id: "5",
    title: "Top Engineering Colleges in India 2025 Rankings",
    date: "Nov 28, 2025",
    excerpt:
      "Check out the latest rankings of top engineering colleges in India for 2025. NIRF has released the updated rankings...",
    category: "college-alerts",
  },
  {
    id: "6",
    title: "MBA Admission 2025: Application Process Started",
    date: "Nov 27, 2025",
    excerpt:
      "Top B-schools have started their admission process for MBA 2025 batch. Check eligibility, deadlines, and application process...",
    category: "admission-alerts",
  },
];

const LatestNews: React.FC<LatestNewsProps> = ({
  title = "Latest News & Stories",
  tabs = defaultTabs,
  articles = defaultArticles,
  onTabSelect,
  onArticleClick,
  onReadMore,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabSelect?.(tabId);
  };

  const filteredArticles = articles.filter(
    (article) => article.category === activeTab
  );

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 px-4 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {title}
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-gray-800"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors hidden md:flex items-center justify-center"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 md:px-10"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="shrink-0 w-[280px] md:w-[300px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                style={{ scrollSnapAlign: "start" }}
                onClick={() => onArticleClick?.(article.id)}
              >
                {/* Image Placeholder */}
                <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-12 h-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{article.date}</p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReadMore?.(article.id);
                    }}
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <span>Read more</span>
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

export default LatestNews;
