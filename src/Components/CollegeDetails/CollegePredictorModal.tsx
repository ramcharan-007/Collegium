import React, { useState } from "react";
import {
  predictorCourses,
  predictorExams,
  reservationCategories,
  getSpecializationsByCourse,
  getRankTypeByExam,
  
} from "../../data/collegePredictorData";
import type { Course, Exam } from "../../data/collegePredictorData";

interface CollegePredictorModalProps {
  isOpen: boolean;
  onClose: () => void;
  collegeName: string;
  collegeLogo: string;
}

type Step = "course" | "exam" | "score";

const CollegePredictorModal: React.FC<CollegePredictorModalProps> = ({
  isOpen,
  onClose,
  collegeName,
  collegeLogo,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>("course");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<Course | null>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchExamQuery, setSearchExamQuery] = useState("");
  const [showSpecializations, setShowSpecializations] = useState(false);
  const [rankError, setRankError] = useState("");

  if (!isOpen) return null;

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    const specializations = getSpecializationsByCourse(course.id);
    if (specializations.length > 0) {
      setShowSpecializations(true);
      setSelectedSpecialization(null);
    } else {
      setShowSpecializations(false);
      setCurrentStep("exam");
    }
    setSearchQuery("");
  };

  const handleSpecializationSelect = (specialization: Course) => {
    setSelectedSpecialization(specialization);
    setCurrentStep("exam");
  };

  const handleExamSelect = (exam: Exam) => {
    setSelectedExam(exam);
    setCurrentStep("score");
    setSearchExamQuery("");
  };

  const handleBack = () => {
    if (currentStep === "exam") {
      if (showSpecializations) {
        setShowSpecializations(false);
        setSelectedSpecialization(null);
      } else {
        setCurrentStep("course");
        setSelectedCourse(null);
      }
    } else if (currentStep === "score") {
      setCurrentStep("exam");
      setSelectedExam(null);
      setRank("");
      setCategory("");
      setRankError("");
    }
  };

  const handleViewResult = () => {
    if (!rank.trim()) {
      setRankError("Field is required");
      return;
    }
    if (!category) {
      return;
    }
    // Here you would typically make an API call to get prediction results
    console.log({
      course: selectedCourse,
      specialization: selectedSpecialization,
      exam: selectedExam,
      rank,
      category,
    });
    // Navigate to results page or show results
    alert("Prediction results would be shown here!");
  };

  const getStepProgress = () => {
    const steps = { course: 1, exam: 2, score: 3 };
    return steps[currentStep];
  };

  const filteredCourses = predictorCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSpecializations = getSpecializationsByCourse(
    selectedCourse?.id || ""
  ).filter(
    (spec) =>
      spec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredExams = predictorExams.filter((exam) =>
    exam.name.toLowerCase().includes(searchExamQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full border-2 border-gray-300 hover:bg-gray-100 transition z-10"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <img
              src={collegeLogo}
              alt={collegeName}
              className="w-12 h-12 rounded-md object-contain"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {collegeName}
              </h2>
              <p className="text-sm text-gray-600">
                Predict Your Admission Chances
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 flex items-center">
            <div className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  getStepProgress() >= 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {getStepProgress() > 1 ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">1</span>
                )}
              </div>
              <div
                className={`flex-1 h-1 mx-2 ${
                  getStepProgress() >= 2 ? "bg-green-500" : "bg-gray-200"
                }`}
              />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  getStepProgress() >= 2
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {getStepProgress() > 2 ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">2</span>
                )}
              </div>
              <div
                className={`flex-1 h-1 mx-2 ${
                  getStepProgress() >= 3 ? "bg-green-500" : "bg-gray-200"
                }`}
              />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  getStepProgress() >= 3
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                <span className="text-sm font-medium">3</span>
              </div>
            </div>
          </div>

          {/* Step Labels */}
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Select Course</span>
            <span>Select Exam</span>
            <span>Select Score</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Course Selection */}
          {currentStep === "course" && (
            <div>
              {!showSpecializations ? (
                <>
                  <div className="mb-4">
                    <div className="relative">
                      <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search Courses"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    {predictorCourses.map((course) => (
                      <button
                        key={course.id}
                        onClick={() => handleCourseSelect(course)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                          selectedCourse?.id === course.id
                            ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                            : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        {course.name}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      {predictorCourses[0].name}
                    </h3>
                    <div className="space-y-2">
                      {filteredCourses.map((course) => (
                        <label
                          key={course.id}
                          className="flex items-center gap-3 p-3 border rounded-md hover:bg-blue-50 cursor-pointer transition"
                        >
                          <input
                            type="radio"
                            name="course"
                            checked={selectedCourse?.id === course.id}
                            onChange={() => handleCourseSelect(course)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-blue-600">
                            {course.fullName}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowSpecializations(false)}
                    className="mb-4 text-blue-600 text-sm flex items-center gap-1 hover:underline"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to Courses
                  </button>

                  <div className="mb-4">
                    <div className="relative">
                      <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search Courses"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-gray-900 mb-3">
                    {selectedCourse?.name}
                  </h3>
                  <div className="space-y-2">
                    {filteredSpecializations.map((spec) => (
                      <label
                        key={spec.id}
                        className="flex items-center gap-3 p-3 border rounded-md hover:bg-blue-50 cursor-pointer transition"
                      >
                        <input
                          type="radio"
                          name="specialization"
                          checked={selectedSpecialization?.id === spec.id}
                          onChange={() => handleSpecializationSelect(spec)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-blue-600">
                          {spec.fullName}
                        </span>
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 2: Exam Selection */}
          {currentStep === "exam" && (
            <div>
              <div className="mb-4">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search Exams"
                    value={searchExamQuery}
                    onChange={(e) => setSearchExamQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {filteredExams.map((exam) => (
                  <button
                    key={exam.id}
                    onClick={() => handleExamSelect(exam)}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center gap-3 transition ${
                      selectedExam?.id === exam.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <img
                      src={exam.logo}
                      alt={exam.name}
                      className="w-16 h-16 object-contain"
                    />
                    <span className="font-medium text-gray-900">
                      {exam.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Score Input */}
          {currentStep === "score" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Enter Your {getRankTypeByExam(selectedExam?.id || "")}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 border-r border-gray-300 pr-2 bg-transparent text-sm text-gray-600 outline-none"
                    defaultValue="rank"
                  >
                    <option value="rank">Rank</option>
                  </select>
                  <input
                    type="number"
                    placeholder={`Enter Your ${getRankTypeByExam(
                      selectedExam?.id || ""
                    )}*`}
                    value={rank}
                    onChange={(e) => {
                      setRank(e.target.value);
                      setRankError("");
                    }}
                    className={`w-full pl-24 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      rankError ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {rankError && (
                  <p className="text-xs text-red-500 mt-1">{rankError}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Select Reservation Category
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                  >
                    <option value="">Select Category</option>
                    {reservationCategories.map((cat) => (
                      <option key={cat.id} value={cat.code}>
                        {cat.code}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Category options dropdown (when opened) */}
                {category && (
                  <div className="mt-3 max-h-60 overflow-y-auto border border-gray-200 rounded-md">
                    {reservationCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setCategory(cat.code)}
                        className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 transition ${
                          category === cat.code ? "bg-blue-50" : ""
                        }`}
                      >
                        <span className="text-sm text-gray-700">
                          {cat.code}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="border-t p-6 flex gap-3">
          {currentStep !== "course" && (
            <button
              onClick={handleBack}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Back
            </button>
          )}
          {currentStep === "score" && (
            <button
              onClick={handleViewResult}
              className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition"
            >
              View Result
            </button>
          )}
          {currentStep !== "score" && (
            <button
              onClick={() => {
                if (currentStep === "course") {
                  if (
                    !selectedCourse ||
                    (showSpecializations && !selectedSpecialization)
                  ) {
                    return;
                  }
                  setCurrentStep("exam");
                } else if (currentStep === "exam") {
                  if (!selectedExam) return;
                  setCurrentStep("score");
                }
              }}
              disabled={
                (currentStep === "course" &&
                  (!selectedCourse ||
                    (showSpecializations && !selectedSpecialization))) ||
                (currentStep === "exam" && !selectedExam)
              }
              className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegePredictorModal;
