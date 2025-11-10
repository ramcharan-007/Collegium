import { useState, useRef, useEffect } from 'react';

interface ProfessionalExperienceProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface ExperienceEntry {
  id: string;
  organizationName: string;
  jobPosition: string;
  fromDate: string;
  toDate: string;
}

const ProfessionalExperience = ({ data, onUpdate, onNext, onPrev }: ProfessionalExperienceProps) => {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>(() => {
    // Ensure we always have at least one experience entry
    if (data.professionalExperience && data.professionalExperience.length > 0) {
      return data.professionalExperience;
    }
    return [{
      id: '1',
      organizationName: '',
      jobPosition: '',
      fromDate: '',
      toDate: ''
    }];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sample job positions - in real app, this would come from an API
  const jobPositions = [
    'Graduate Engineer Trainee',
    'Graduate Apprentice Engineers',
    'Assistant Engineer',
    'Scientist B',
    'Scientist Officer',
    'Engineering Executive Trainee',
    'Deputy Manager',
    'Executive Trainee',
    'Software Engineer',
    'Data Analyst',
    'Product Manager',
    'Business Analyst',
    'Marketing Executive',
    'HR Executive',
    'Finance Executive'
  ];

  // Filter job positions based on search term
  const filteredPositions = jobPositions.filter(position =>
    position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFieldChange = (id: string, field: keyof ExperienceEntry, value: string) => {
    const updatedExperiences = experiences.map(experience =>
      experience.id === id ? { ...experience, [field]: value } : experience
    );
    setExperiences(updatedExperiences);
    onUpdate({ professionalExperience: updatedExperiences });
  };

  const handlePositionSelect = (id: string, position: string) => {
    handleFieldChange(id, 'jobPosition', position);
    setActiveDropdown(null);
    setSearchTerm('');
  };

  const addMoreExperience = () => {
    const newExperience: ExperienceEntry = {
      id: Date.now().toString(),
      organizationName: '',
      jobPosition: '',
      fromDate: '',
      toDate: ''
    };
    const updatedExperiences = [...experiences, newExperience];
    setExperiences(updatedExperiences);
    onUpdate({ professionalExperience: updatedExperiences });
  };

  const removeExperience = (id: string) => {
    if (experiences.length > 1) {
      const updatedExperiences = experiences.filter(experience => experience.id !== id);
      setExperiences(updatedExperiences);
      onUpdate({ professionalExperience: updatedExperiences });
    }
  };

  const moveExperience = (id: string, direction: 'up' | 'down') => {
    const currentIndex = experiences.findIndex(experience => experience.id === id);
    if (
      (direction === 'up' && currentIndex > 0) ||
      (direction === 'down' && currentIndex < experiences.length - 1)
    ) {
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      const updatedExperiences = [...experiences];
      [updatedExperiences[currentIndex], updatedExperiences[newIndex]] = 
      [updatedExperiences[newIndex], updatedExperiences[currentIndex]];
      setExperiences(updatedExperiences);
      onUpdate({ professionalExperience: updatedExperiences });
    }
  };

  const handleSaveAndDone = () => {
    onUpdate({ professionalExperience: experiences });
    // This is the final step, so we might want to handle completion differently
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-8">
        <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-6 lg:mb-8">Companies you have worked for:</h3>
        
        <div className="space-y-4 lg:space-y-6">
          {experiences.length === 0 ? (
            // Fallback: Show one empty entry if experiences array is somehow empty
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold mt-2">
                1
              </div>
              <div className="flex-1 space-y-4">
                <div className="relative">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                      🏢
                    </span>
                    <input
                      type="text"
                      onClick={() => {
                        const newExperience = { id: '1', organizationName: '', jobPosition: '', fromDate: '', toDate: '' };
                        setExperiences([newExperience]);
                        onUpdate({ professionalExperience: [newExperience] });
                      }}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                      placeholder="Organization Name"
                    />
                  </div>
                </div>
                <div className="relative">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500">
                      💼
                    </span>
                    <input
                      type="text"
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                      placeholder="Job Position"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                        📅
                      </span>
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                        📅
                      </span>
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            experiences.map((experience, index) => (
              <div key={experience.id} className="flex flex-col sm:flex-row items-start gap-4">
                {/* Step Number */}
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold mt-2">
                  {index + 1}
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-4">
                  {/* Organization Name Field */}
                  <div className="relative">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                        🏢
                      </span>
                      <input
                        type="text"
                        value={experience.organizationName}
                        onChange={(e) => handleFieldChange(experience.id, 'organizationName', e.target.value)}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                        placeholder="Organization Name"
                      />
                      {experience.organizationName && (
                        <button
                          onClick={() => handleFieldChange(experience.id, 'organizationName', '')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Job Position Field */}
                  <div className="relative" ref={dropdownRef}>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500">
                        💼
                      </span>
                      <input
                        type="text"
                        value={experience.jobPosition}
                        onChange={(e) => {
                          handleFieldChange(experience.id, 'jobPosition', e.target.value);
                          setSearchTerm(e.target.value);
                          setActiveDropdown(experience.id);
                        }}
                        onFocus={() => setActiveDropdown(experience.id)}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                        placeholder="Job Position"
                      />
                      {experience.jobPosition && (
                        <button
                          onClick={() => handleFieldChange(experience.id, 'jobPosition', '')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Job Position Dropdown */}
                    {activeDropdown === experience.id && filteredPositions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredPositions.map((position, idx) => (
                          <button
                            key={idx}
                            onClick={() => handlePositionSelect(experience.id, position)}
                            className={`w-full text-left px-4 py-3 hover:bg-orange-50 border-b border-gray-100 last:border-b-0 ${
                              position === 'Graduate Apprentice Engineers' ? 'text-orange-600 hover:text-orange-700' : 'hover:text-orange-600'
                            }`}
                          >
                            {position}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Date Range Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                          📅
                        </span>
                        <input
                          type="date"
                          value={experience.fromDate}
                          onChange={(e) => handleFieldChange(experience.id, 'fromDate', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                          📅
                        </span>
                        <input
                          type="date"
                          value={experience.toDate}
                          onChange={(e) => handleFieldChange(experience.id, 'toDate', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Only show when there are multiple entries */}
                {experiences.length > 1 && (
                  <div className="flex sm:flex-col flex-row gap-2 mt-4 sm:mt-8 justify-center sm:justify-start">
                    {/* Delete Button */}
                    <button
                      onClick={() => removeExperience(experience.id)}
                      className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                      title="Delete"
                    >
                      🗑️
                    </button>
                    
                    {/* Move Up Button */}
                    {index > 0 && (
                      <button
                        onClick={() => moveExperience(experience.id, 'up')}
                        className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        title="Move Up"
                      >
                        ↑
                      </button>
                    )}
                    
                    {/* Move Down Button */}
                    {index < experiences.length - 1 && (
                      <button
                        onClick={() => moveExperience(experience.id, 'down')}
                        className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        title="Move Down"
                      >
                        ↓
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Add More Button - Outside the map, always visible */}
        <div className="mt-6 lg:mt-8">
          <button
            onClick={addMoreExperience}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium border border-orange-300 px-4 py-2 rounded-md hover:bg-orange-50 transition-colors w-full sm:w-auto justify-center sm:justify-start"
          >
            <span className="text-orange-600">+</span>
            Add More
          </button>
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
          onClick={handleSaveAndDone}
          className="px-8 lg:px-16 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors order-1 sm:order-2"
        >
          Save and Done
        </button>
      </div>
    </div>
  );
};

export default ProfessionalExperience;