import React, { useEffect, useState } from "react";
import Header from "../Header";
import CollegeBanner from "./CollegeBanner";
import CollegeNavbar from "./CollegeNavbar";
import CollegeInfoSection from "./CollegeInfoSection";
import CoursesFeesSection from "./CoursesFeesSection";
import AdmissionSection from "./AdmissionSection";
import ReviewsSection from "./ReviewsSection";
import CutoffSection from "./CutoffSection";
import PlacementSection from "./PlacementSection";
import {
  RankingSection,
  GallerySection,
  ScholarshipSection,
  HostelSection,
  FAQSection,
} from "./AdditionalSections";
import RightSidebar from "./RightSidebar";

const CollegeDetailsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("Info");

  // Scroll to section when clicking nav items
  useEffect(() => {
    const handleNavClick = () => {
      const navItems = document.querySelectorAll("[data-section]");
      navItems.forEach((item) => {
        item.addEventListener("click", (e) => {
          const target = e.target as HTMLElement;
          const sectionId = target.getAttribute("data-section");
          if (sectionId) {
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
          }
        });
      });
    };

    handleNavClick();
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "info",
        "courses-fees",
        "admission",
        "reviews",
        "cutoff",
        "placement",
        "ranking",
        "gallery",
        "scholarship",
        "hostel",
        "faq",
      ];

      const headerHeight = document.querySelector("header")?.clientHeight || 0;
      const navHeight = document.querySelector("nav")?.clientHeight || 0;
      const offset = headerHeight + navHeight + 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* College Banner Section */}
      <CollegeBanner />

      {/* Sticky Navbar */}
      <CollegeNavbar activeSection={activeSection} />

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-[4rem] py-8 md:py-10 grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8">
        
        {/* Left Column: All Sections */}
        <div className="min-w-0">
          <CollegeInfoSection />
          <CoursesFeesSection />
          <AdmissionSection />
          <ReviewsSection />
          <CutoffSection />
          <PlacementSection />
          <RankingSection />
          <GallerySection />
          <ScholarshipSection />
          <HostelSection />
          <FAQSection />
        </div>

        {/* Right Column: Sticky Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default CollegeDetailsPage;
