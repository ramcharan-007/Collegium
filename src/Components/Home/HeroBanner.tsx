import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroBannerProps {
  onSearch?: (query: string) => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Background images for the carousel
  const backgroundImages = [
    "/images/10797638.webp",
    "/images/2.jpg",
    "/images/10797638.webp",
  ];

  // University names for each slide
  const universityNames = [
    "Amity University, Noida",
    "VIT University, Vellore",
    "SRM University, Chennai",
  ];

  // Recent visits data
  const recentVisits = [
    "MAHE Manipal, Manipal",
    "IISc Bangalore, Bangalore",
    "DMS IISC Bangalore, Bangalore",
    "IIM Ahmedabad, Ahmedabad",
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
      {/* Background Image Carousel */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`College ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8">
          Find Over 4 Lakh Reviews in India
        </h1>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-3xl flex items-center bg-white rounded-lg overflow-hidden shadow-lg mb-6"
        >
          <div className="flex-1 flex items-center px-4">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for colleges, exams, courses and more.."
              className="w-full py-4 text-gray-700 text-sm md:text-base outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 md:px-10 py-4 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Recent Visits and Need Counselling */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          {/* Recent Visits */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-white font-medium text-sm">
              Your Recent Visits
            </span>
            {recentVisits.map((visit, index) => (
              <button
                key={index}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs md:text-sm px-3 py-1.5 rounded-full transition-colors border border-white/30"
              >
                {visit}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* University Name and Slide Indicator */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-3">
        <a
          href="#"
          className="text-white text-sm underline hover:text-orange-300 transition-colors"
        >
          {universityNames[currentSlide]}
        </a>
        <span className="text-white text-sm">
          {currentSlide + 1} / {backgroundImages.length}
        </span>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
