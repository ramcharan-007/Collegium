import { useState } from 'react';

interface EducationDetailsProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const EducationDetails = ({ data, onUpdate, onNext, onPrev }: EducationDetailsProps) => {
  const [formData, setFormData] = useState({
    // Graduation Details
    instituteName: data.instituteName || '',
    gradPassingYear: data.gradPassingYear || '',
    gradGradingSystem: data.gradGradingSystem || 'Percentage',
    gradPercentage: data.gradPercentage || '',
    gradCourse: data.gradCourse || '',

    // 12th Details
    twelfthSchoolName: data.twelfthSchoolName || '',
    twelfthCity: data.twelfthCity || '',
    twelfthPassingYear: data.twelfthPassingYear || '',
    twelfthGradingSystem: data.twelfthGradingSystem || 'Percentage',
    twelfthPercentage: data.twelfthPercentage || '',
    twelfthBoard: data.twelfthBoard || '',
    streamOfStudy: data.streamOfStudy || '',

    // 10th Details
    tenthSchoolName: data.tenthSchoolName || '',
    tenthCity: data.tenthCity || '',
    tenthPassingYear: data.tenthPassingYear || '',
    tenthGradingSystem: data.tenthGradingSystem || 'Percentage',
    tenthPercentage: data.tenthPercentage || '',
    tenthBoard: data.tenthBoard || '',
    sameAs12th: data.sameAs12th || false,

    // Entrance Exam
    hasEntranceExam: data.hasEntranceExam || '',
    examType: data.examType || '',
    totalScore: data.totalScore || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Add validation logic here if needed
    return true;
  };

  const handleSaveAndNext = () => {
    if (validateForm()) {
      onUpdate(formData);
      onNext();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Graduation Educational Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-4 lg:mb-6">Graduation Educational Details</h3>

            <div className="space-y-6">
              {/* Institute Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institute Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                    🏫
                  </span>
                  <input
                    type="text"
                    name="instituteName"
                    value={formData.instituteName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    placeholder="Enter institute name"
                  />
                </div>
              </div>

              {/* Graduation Passing Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grad Passing Year
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                    📅
                  </span>
                  <input
                    type="text"
                    name="gradPassingYear"
                    value={formData.gradPassingYear}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    placeholder="Enter passing year"
                  />
                </div>
              </div>

              {/* Grading System */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grading System
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                      📊
                    </span>
                    <select
                      name="gradGradingSystem"
                      value={formData.gradGradingSystem}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    >
                      <option value="Percentage">Percentage</option>
                      <option value="CGPA">CGPA</option>
                      <option value="Grade">Grade</option>
                    </select>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                      📈
                    </span>
                    <input
                      type="text"
                      name="gradPercentage"
                      value={formData.gradPercentage}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                      placeholder="Percentage/Grade"
                    />
                  </div>
                </div>
              </div>

              {/* Graduation Course */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation Course
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                    🎓
                  </span>
                  <input
                    type="text"
                    name="gradCourse"
                    value={formData.gradCourse}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    placeholder="Enter graduation course"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 10th Educational Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-4 lg:mb-6">10th Educational Details</h3>

            <div className="space-y-6">
              {/* School Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                    🏫
                  </span>
                  <input
                    type="text"
                    name="tenthSchoolName"
                    value={formData.tenthSchoolName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    placeholder="Enter school name"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
                    📍
                  </span>
                  <input
                    type="text"
                    name="tenthCity"
                    value={formData.tenthCity}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    placeholder="Enter city"
                  />
                </div>
              </div>

              {/* 10th Passing Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  10th Passing Year
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                    📅
                  </span>
                  <input
                    type="text"
                    name="tenthPassingYear"
                    value={formData.tenthPassingYear}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    placeholder="Enter passing year"
                  />
                </div>
              </div>

              {/* Grading System */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grading System
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                      📊
                    </span>
                    <select
                      name="tenthGradingSystem"
                      value={formData.tenthGradingSystem}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    >
                      <option value="Percentage">Percentage</option>
                      <option value="CGPA">CGPA</option>
                      <option value="Grade">Grade</option>
                    </select>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                      📈
                    </span>
                    <input
                      type="text"
                      name="tenthPercentage"
                      value={formData.tenthPercentage}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                      placeholder="Percentage/Grade"
                    />
                  </div>
                </div>
              </div>

              {/* Board */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Board
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                    📋
                  </span>
                  <input
                    type="text"
                    name="tenthBoard"
                    value={formData.tenthBoard}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    placeholder="Enter board name"
                  />
                </div>
              </div>

              {/* Same as 12th Standard Checkbox */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="sameAs12th"
                    checked={formData.sameAs12th}
                    onChange={(e) => setFormData(prev => ({ ...prev, sameAs12th: e.target.checked }))}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Same as 12th Standard</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* 12th Educational Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-4 lg:mb-6">12th Educational Details</h3>

            <div className="space-y-6">
              {/* School Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                    🏫
                  </span>
                  <input
                    type="text"
                    name="twelfthSchoolName"
                    value={formData.twelfthSchoolName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    placeholder="Enter school name"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500">
                    📍
                  </span>
                  <input
                    type="text"
                    name="twelfthCity"
                    value={formData.twelfthCity}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    placeholder="Enter city"
                  />
                </div>
              </div>

              {/* 12th Passing Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  12th Passing Year
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                    📅
                  </span>
                  <input
                    type="text"
                    name="twelfthPassingYear"
                    value={formData.twelfthPassingYear}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    placeholder="Enter passing year"
                  />
                </div>
              </div>

              {/* Grading System */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grading System
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                      📊
                    </span>
                    <select
                      name="twelfthGradingSystem"
                      value={formData.twelfthGradingSystem}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    >
                      <option value="Percentage">Percentage</option>
                      <option value="CGPA">CGPA</option>
                      <option value="Grade">Grade</option>
                    </select>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                      📈
                    </span>
                    <input
                      type="text"
                      name="twelfthPercentage"
                      value={formData.twelfthPercentage}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                      placeholder="Percentage/Grade"
                    />
                  </div>
                </div>
              </div>

              {/* Board */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Board
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                    📋
                  </span>
                  <input
                    type="text"
                    name="twelfthBoard"
                    value={formData.twelfthBoard}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    placeholder="Enter board name"
                  />
                </div>
              </div>

              {/* Stream of Study */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stream of Study
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                    📚
                  </span>
                  <input
                    type="text"
                    name="streamOfStudy"
                    value={formData.streamOfStudy}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    placeholder="Enter stream of study"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Entrance Exam Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-blue-500">❓</span>
              <h3 className="text-lg font-medium text-gray-800">Have you appeared or scheduled for any entrance exams?</h3>
            </div>

            <div className="space-y-6">
              {/* Radio Options */}
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasEntranceExam"
                    value="Yes"
                    checked={formData.hasEntranceExam === 'Yes'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasEntranceExam"
                    value="No"
                    checked={formData.hasEntranceExam === 'No'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasEntranceExam"
                    value="Booked"
                    checked={formData.hasEntranceExam === 'Booked'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Booked</span>
                </label>
              </div>

              {/* Exam Type Buttons - Always show after selecting Yes */}
              {formData.hasEntranceExam === 'Yes' && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, examType: 'GATE' }))}
                      className={`px-6 py-2 rounded-md text-sm font-medium border transition-colors ${formData.examType === 'GATE'
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white border-orange-300 text-orange-600 hover:bg-orange-50'
                        }`}
                    >
                      GATE
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, examType: 'GRE' }))}
                      className={`px-6 py-2 rounded-md text-sm font-medium border transition-colors ${formData.examType === 'GRE'
                        ? 'bg-gray-600 text-white border-gray-600'
                        : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      GRE
                    </button>
                  </div>

                  {/* Total Score Field - Show when exam type is selected */}
                  {formData.examType && (
                    <div className="max-w-md">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          📊
                        </span>
                        <input
                          type="text"
                          name="totalScore"
                          value={formData.totalScore}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                          placeholder="Total Score (0-100)"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 lg:mt-8">
        <button
          onClick={onPrev}
          className="px-6 lg:px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1"
        >
          Previous
        </button>
        <button
          onClick={handleSaveAndNext}
          className="px-8 lg:px-16 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors order-1 sm:order-2"
        >
          Save and Next
        </button>
      </div>
    </div>
  );
};

export default EducationDetails;