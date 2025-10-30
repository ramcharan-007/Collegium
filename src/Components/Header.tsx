import { useState } from 'react';

const Header = () => {
  const [selectedGoal, setSelectedGoal] = useState('Select Goal');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGoalDropdownOpen, setIsGoalDropdownOpen] = useState(false);

  const goals = [
    'B.Tech',
    'MBA',
    'M.Tech',
    'MBBS',
    'B.Com',
    'B.Sc',
    'B.Sc (Nursing)',
    'BA',
    'BBA',
    'BCA',
  ];

  const courses = [
    { name: 'All Courses', icon: '📚' },
    { name: 'B.Tech', link: '#' },
    { name: 'MBA', link: '#' },
    { name: 'M.Tech', link: '#' },
    { name: 'MBBS', link: '#' },
    { name: 'B.Com', link: '#' },
    { name: 'B.Sc', link: '#' },
    { name: 'B.Sc (Nursing)', link: '#' },
    { name: 'BA', link: '#' },
    { name: 'BBA', link: '#' },
    { name: 'BCA', link: '#' },
  ];

  return (
    <header className="bg-gray-900 text-white">
      {/* Top Bar */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Left Section - Logo and Search */}
            <div className="flex items-center gap-6 flex-1">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🎓</span>
                </div>
                <span className="text-xl font-bold">collegedunia</span>
              </div>

              {/* Goal Selector and Search */}
              <div className="flex items-center gap-2 flex-1 max-w-4xl">
                {/* Select Goal & City */}
                <div className="relative">
                  <button
                    onClick={() => setIsGoalDropdownOpen(!isGoalDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
                  >
                    <span className="text-orange-500 text-sm">⚙️ Select Goal & ⊙ City</span>
                  </button>
                  
                  {/* Dropdown */}
                  {isGoalDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 py-2">
                      {goals.map((goal, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedGoal(goal);
                            setIsGoalDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-6 w-px bg-gray-700"></div>

                {/* Selected Goal Display */}
                <div className="relative">
                  <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <span className="text-sm">{selectedGoal}</span>
                    <span className="text-xs">▼</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Search for Colleges, Exams, Courses and More.."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-4 ml-4">
              {/* Write a Review */}
              <button className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                <span className="text-lg">✏️</span>
                <div className="text-left">
                  <div className="text-sm font-medium">Write a Review</div>
                  <div className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded">
                    Get Upto 1300₹
                  </div>
                </div>
              </button>

              {/* Explore */}
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors">
                <span className="text-lg">⊞</span>
                <span className="text-sm">Explore</span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <span className="text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Menu */}
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <div className="flex flex-col gap-1">
                  <div className="w-5 h-0.5 bg-white"></div>
                  <div className="w-5 h-0.5 bg-white"></div>
                  <div className="w-5 h-0.5 bg-white"></div>
                </div>
              </button>

              {/* User Profile */}
              <button className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <span className="text-white text-sm">👤</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {courses.map((course, index) => (
              <a
                key={index}
                href={course.link || '#'}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                {course.icon && <span>{course.icon}</span>}
                <span>{course.name}</span>
              </a>
            ))}

            {/* Right Side Links */}
            <div className="ml-auto flex items-center gap-4 pl-4">
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-sm hover:text-orange-500 transition-colors whitespace-nowrap"
              >
                <span>🌍</span>
                <span>Study Abroad</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-600 hover:bg-purple-700 rounded transition-colors whitespace-nowrap"
              >
                <span>🔗</span>
                <span>Course Finder</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;