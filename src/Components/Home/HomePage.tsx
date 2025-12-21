import SelectStudyGoal from "./SelectStudyGoal";
import ExplorePrograms from "./ExplorePrograms";
import Top10Colleges from "./Top10Colleges";
import TopUniversities from "./TopUniversities";
import CollegeRanking from "./CollegeRanking";
import TopExams from "./TopExams";
import LatestNews from "./LatestNews";
import StudyAbroad from "./StudyAbroad";
import HeroBanner from "./HeroBanner";

const HomePage: React.FC = () => {
  // Event handlers - can be customized as needed
  const handleGoalSelect = (goalId: string) => {
    console.log("Selected goal:", goalId);
    // Navigate to goal-specific page or filter
  };

  const handleCourseSelect = (course: string) => {
    console.log("Selected course:", course);
    // Navigate to course-specific page
  };

  const handleFilterSelect = (filterId: string) => {
    console.log("Selected filter:", filterId);
  };

  const handleCollegeClick = (collegeId: string) => {
    console.log("Clicked college:", collegeId);
    // Navigate to college details page
  };

  const handleExamClick = (examId: string) => {
    console.log("Clicked exam:", examId);
    // Navigate to exam details page
  };

  const handleArticleClick = (articleId: string) => {
    console.log("Clicked article:", articleId);
    // Navigate to article page
  };

  const handleCountryClick = (countryId: string) => {
    console.log("Clicked country:", countryId);
    // Navigate to country-specific study abroad page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Banner Section */}
      <HeroBanner
        onSearch={(query) => console.log("Search:", query)}
      />

      {/* Select Your Study Goal Section */}
      <SelectStudyGoal
        onGoalSelect={handleGoalSelect}
        onCourseSelect={handleCourseSelect}
      />

      {/* Explore Programs Section */}
      <ExplorePrograms
        onFilterSelect={handleFilterSelect}
        onCardClick={(cardId) => console.log("Card clicked:", cardId)}
        onLinkClick={(cardId) => console.log("Link clicked:", cardId)}
      />

      {/* Top 10 Colleges Section */}
      <Top10Colleges
        onFilterSelect={handleFilterSelect}
        onCollegeClick={handleCollegeClick}
      />

      {/* Top Universities/Colleges Carousel */}
      <TopUniversities
        onUniversityClick={handleCollegeClick}
        onViewCourses={(id) => console.log("View courses:", id)}
        onDownloadBrochure={(id) => console.log("Download brochure:", id)}
        onCompare={(id) => console.log("Compare:", id)}
      />

      {/* College Ranking Section */}
      <CollegeRanking
        onYearChange={(year) => console.log("Year changed:", year)}
        onAgencySelect={(agencyId) => console.log("Agency selected:", agencyId)}
        onCollegeClick={handleCollegeClick}
        onViewAllClick={() => console.log("View all colleges")}
      />

      {/* Top Exams Section */}
      <TopExams
        onExamClick={handleExamClick}
        onApplicationProcess={(examId) =>
          console.log("Application process:", examId)
        }
        onExamInfo={(examId) => console.log("Exam info:", examId)}
      />

      {/* Latest News & Stories Section */}
      <LatestNews
        onTabSelect={(tabId) => console.log("Tab selected:", tabId)}
        onArticleClick={handleArticleClick}
        onReadMore={(articleId) => console.log("Read more:", articleId)}
      />

      {/* Study Abroad Section */}
      <StudyAbroad
        onCountryClick={handleCountryClick}
        onGuideClick={(countryId, guideTitle) =>
          console.log("Guide clicked:", countryId, guideTitle)
        }
        onCheckColleges={(countryId) =>
          console.log("Check colleges:", countryId)
        }
      />
    </div>
  );
};

export default HomePage;
