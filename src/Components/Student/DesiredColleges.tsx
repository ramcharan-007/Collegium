import { useState, useRef, useEffect } from 'react';

interface DesiredCollegesProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface CollegeEntry {
  id: string;
  college: string;
  status: string;
}

const DesiredColleges = ({ data, onUpdate, onNext, onPrev }: DesiredCollegesProps) => {
  const [colleges, setColleges] = useState<CollegeEntry[]>(() => {
    // Ensure we always have at least one college entry
    if (data.desiredColleges && data.desiredColleges.length > 0) {
      return data.desiredColleges;
    }
    return [{
      id: '1',
      college: '',
      status: ''
    }];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sample college data - in real app, this would come from an API
  const collegeList = [
    'Amity University',
    'Anna University',
    'Banaras Hindu University',
    'Birla Institute of Technology',
    'Delhi University',
    'Dr. A.P.J. Abdul Kalam Technical University - [AKTU], Lucknow, India',
    'Indian Institute of Technology - Delhi',
    'Indian Institute of Technology - Mumbai',
    'Jawaharlal Nehru University',
    'Manipal University',
    'Pune University',
    'Vellore Institute of Technology'
  ];

  const statusOptions = ['Applied', 'Interested', 'Awaiting Result'];

  // Filter colleges based on search term
  const filteredColleges = collegeList.filter(college =>
    college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setShowStatusDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCollegeChange = (id: string, value: string) => {
    const updatedColleges = colleges.map(college =>
      college.id === id ? { ...college, college: value } : college
    );
    setColleges(updatedColleges);
    onUpdate({ desiredColleges: updatedColleges });
  };

  const handleStatusChange = (id: string, value: string) => {
    const updatedColleges = colleges.map(college =>
      college.id === id ? { ...college, status: value } : college
    );
    setColleges(updatedColleges);
    onUpdate({ desiredColleges: updatedColleges });
    setShowStatusDropdown(null);
  };

  const handleCollegeSelect = (id: string, collegeName: string) => {
    handleCollegeChange(id, collegeName);
    setActiveDropdown(null);
    setSearchTerm('');
  };

  const addMoreCollege = () => {
    const newCollege: CollegeEntry = {
      id: Date.now().toString(),
      college: '',
      status: ''
    };
    const updatedColleges = [...colleges, newCollege];
    setColleges(updatedColleges);
    onUpdate({ desiredColleges: updatedColleges });
  };

  const removeCollege = (id: string) => {
    if (colleges.length > 1) {
      const updatedColleges = colleges.filter(college => college.id !== id);
      setColleges(updatedColleges);
      onUpdate({ desiredColleges: updatedColleges });
    }
  };

  const moveCollege = (id: string, direction: 'up' | 'down') => {
    const currentIndex = colleges.findIndex(college => college.id === id);
    if (
      (direction === 'up' && currentIndex > 0) ||
      (direction === 'down' && currentIndex < colleges.length - 1)
    ) {
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      const updatedColleges = [...colleges];
      [updatedColleges[currentIndex], updatedColleges[newIndex]] =
        [updatedColleges[newIndex], updatedColleges[currentIndex]];
      setColleges(updatedColleges);
      onUpdate({ desiredColleges: updatedColleges });
    }
  };

  const handleSaveAndNext = () => {
    onUpdate({ desiredColleges: colleges });
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-8">
        <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-6 lg:mb-8">Colleges You Applied/Applying To:</h3>

        <div className="space-y-4 lg:space-y-6">
          {colleges.length === 0 ? (
            // Fallback: Show one empty entry if colleges array is somehow empty
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold mt-2">
                1
              </div>
              <div className="flex-1 space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select College
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                      🎓
                    </span>
                    <input
                      type="text"
                      onClick={() => {
                        const newCollege = { id: '1', college: '', status: '' };
                        setColleges([newCollege]);
                        onUpdate({ desiredColleges: [newCollege] });
                      }}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                      placeholder="Search and select college"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-orange-600 mb-2">
                    Status
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500">
                      📊
                    </span>
                    <button className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-left">
                      Select status
                    </button>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ▼
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            colleges.map((college, index) => (
              <div key={college.id} className="flex flex-col sm:flex-row items-start gap-4">
                {/* Step Number */}
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold mt-2">
                  {index + 1}
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-4">
                  {/* Select College Field */}
                  <div className="relative" ref={dropdownRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select College
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                        🎓
                      </span>
                      <input
                        type="text"
                        value={college.college}
                        onChange={(e) => {
                          handleCollegeChange(college.id, e.target.value);
                          setSearchTerm(e.target.value);
                          setActiveDropdown(college.id);
                        }}
                        onFocus={() => setActiveDropdown(college.id)}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                        placeholder="Search and select college"
                      />
                      {college.college && (
                        <button
                          onClick={() => handleCollegeChange(college.id, '')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* College Dropdown */}
                    {activeDropdown === college.id && filteredColleges.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredColleges.map((collegeName, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleCollegeSelect(college.id, collegeName)}
                            className="w-full text-left px-4 py-3 hover:bg-orange-50 hover:text-orange-600 border-b border-gray-100 last:border-b-0"
                          >
                            {collegeName}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Status Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-orange-600 mb-2">
                      Status
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500">
                        📊
                      </span>
                      <button
                        onClick={() => setShowStatusDropdown(showStatusDropdown === college.id ? null : college.id)}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-left"
                      >
                        {college.status || 'Select status'}
                      </button>
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {showStatusDropdown === college.id ? '▲' : '▼'}
                      </span>
                    </div>

                    {/* Status Dropdown */}
                    {showStatusDropdown === college.id && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        {statusOptions.map((status, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleStatusChange(college.id, status)}
                            className="w-full text-left px-4 py-3 hover:bg-orange-50 hover:text-orange-600 border-b border-gray-100 last:border-b-0"
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons - Only show when there are multiple entries */}
                {colleges.length > 1 && (
                  <div className="flex sm:flex-col flex-row gap-2 mt-4 sm:mt-8 justify-center sm:justify-start">
                    {/* Delete Button */}
                    <button
                      onClick={() => removeCollege(college.id)}
                      className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                      title="Delete"
                    >
                      🗑️
                    </button>

                    {/* Move Up Button */}
                    {index > 0 && (
                      <button
                        onClick={() => moveCollege(college.id, 'up')}
                        className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        title="Move Up"
                      >
                        ↑
                      </button>
                    )}

                    {/* Move Down Button */}
                    {index < colleges.length - 1 && (
                      <button
                        onClick={() => moveCollege(college.id, 'down')}
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
            onClick={addMoreCollege}
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
          onClick={handleSaveAndNext}
          className="px-8 lg:px-16 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors order-1 sm:order-2"
        >
          Save and Next
        </button>
      </div>
    </div>
  );
};

export default DesiredColleges;