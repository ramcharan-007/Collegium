import React, { useState, useEffect, useRef } from "react";

interface CollegeNavbarProps {
  activeSection?: string;
}

const CollegeNavbar: React.FC<CollegeNavbarProps> = ({ activeSection = "info" }) => {
  const menuItems = [
    { label: "Info", id: "info" },
    { label: "Courses & Fees", id: "courses-fees" },
    { label: "Admission 2025", id: "admission" },
    { label: "Reviews", id: "reviews" },
    { label: "CutOff", id: "cutoff" },
    { label: "Placement", id: "placement" },
    { label: "Ranking", id: "ranking" },
    { label: "Gallery", id: "gallery" },
    { label: "Scholarship", id: "scholarship" },
    { label: "Hostel", id: "hostel" },
    { label: "FAQ", id: "faq" },
  ];

  const [isSticky, setIsSticky] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const scrollRef = useRef<HTMLUListElement | null>(null);

  // ✅ Detect when to stick & compute offset below bottom navbar dynamically
  useEffect(() => {
    const calculateOffset = () => {
      const header = document.querySelector("header");
      const bottomNavbar = document.querySelector(".main-bottom-navbar");

      let headerHeight = header ? header.getBoundingClientRect().height : 0;
      let bottomNavHeight = bottomNavbar
        ? bottomNavbar.getBoundingClientRect().height
        : 0;

      setTopOffset(headerHeight + bottomNavHeight);
    };

    calculateOffset();
    window.addEventListener("resize", calculateOffset);

    const handleScroll = () => {
      const bannerHeight =
        document.querySelector(".college-banner")?.clientHeight || 0;
      const headerHeight =
        document.querySelector("header")?.clientHeight || 0;
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > bannerHeight - headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateOffset);
    };
  }, []);

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = document.querySelector("header")?.clientHeight || 0;
      const navHeight = document.querySelector("nav")?.clientHeight || 0;
      const offset = headerHeight + navHeight + 20;

      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`w-full bg-white border-b border-gray-200 transition-all duration-300 ${
        isSticky ? "fixed shadow-md z-40" : ""
      }`}
      style={{ top: isSticky ? `${topOffset}px` : "unset" }}
    >
      {/* === Responsive Container === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-[4rem] relative">
        <ul
          ref={scrollRef}
          tabIndex={-1}
          className="flex overflow-x-auto scrollbar-hide whitespace-nowrap text-[0.75rem] sm:text-[0.85rem] md:text-[0.9rem] font-normal text-gray-700"
        >
          {menuItems.map((tab) => (
            <li
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`cursor-pointer px-3 sm:px-4 py-2 sm:py-3 border-b-2 transition-all flex-shrink-0 ${
                activeSection === tab.id
                  ? "border-blue-600 text-blue-600 font-medium"
                  : "border-transparent hover:text-gray-900 text-gray-600"
              }`}
            >
              {tab.label}
            </li>
          ))}
        </ul>

        {/* Scroll Right Button (hidden on small screens) */}
        <button
          onClick={handleScrollRight}
          className="absolute right-2 top-2 sm:top-2.5 bg-white border border-gray-300 rounded-md shadow-sm p-1 hover:bg-gray-100 transition hidden md:block"
          aria-label="Scroll right"
        >
          <i className="fa-solid fa-chevron-right text-gray-600 text-sm"></i>
        </button>
      </div>
    </nav>
  );
};

export default CollegeNavbar;
