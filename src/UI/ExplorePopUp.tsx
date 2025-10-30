interface ExplorePopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExplorePopUp = ({ isOpen, onClose }: ExplorePopUpProps) => {
  if (!isOpen) return null;

  const leftColumnLinks = [
    { icon: '🏛️', text: 'Top Universities & Colleges', link: '#' },
    { icon: '📚', text: 'Top Courses', link: '#' },
    { icon: '📝', text: 'Read College Reviews', link: '#' },
    { icon: '🔔', text: 'Admission Alerts 2025', link: '#' },
    { icon: '📖', text: 'Institute (Counselling, Coaching and More)', link: '#' },
    { icon: '🔮', text: 'College Predictor', link: '#' },
    { icon: '❓', text: 'Practice Questions', link: '#' },
    { icon: '🎓', text: 'Scholarship', link: '#' },
  ];

  const rightColumnLinks = [
    { icon: '🌍', text: 'Study Abroad', link: '#', badge: 'Get upto 50% discount on Visa Fees', badgeColor: 'text-green-600' },
    { icon: '✈️', text: 'Abroad Exams', link: '#' },
    { icon: '📋', text: 'Exams', link: '#' },
    { icon: '📰', text: 'News', link: '#' },
    { icon: '💰', text: 'Education Loan', link: '#' },
    { icon: '💬', text: 'Ask a Question', link: '#' },
    { icon: '📝', text: 'Test Series', link: '#' },
    { icon: '🔍', text: 'Course Finder', link: '#' },
    { icon: '🎟️', text: 'Top Coupons', link: '#' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Popup Content */}
      <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-2xl z-50 w-full max-w-5xl mx-4">
        <div className="flex">
          {/* Left and Right Columns Container */}
          <div className="flex-1 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Explore More</h2>
            
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-1">
                {leftColumnLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors group"
                  >
                    <span className="text-blue-600 text-lg">{item.icon}</span>
                    <span className="text-gray-700 text-sm group-hover:text-blue-600">
                      {item.text}
                    </span>
                  </a>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-1">
                {rightColumnLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors group"
                  >
                    <span className="text-blue-600 text-lg">{item.icon}</span>
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-gray-700 text-sm group-hover:text-blue-600">
                        {item.text}
                      </span>
                      {item.badge && (
                        <span className={`text-xs ${item.badgeColor} font-medium`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Promotional Section */}
          <div className="w-80 bg-linear-to-br from-amber-50 to-orange-100 p-6 rounded-r-lg flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                "Write a Review
              </h3>
              <p className="text-xl font-bold">
                & Earn Upto <span className="text-orange-500 text-2xl">₹300"</span>
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-xs text-gray-600">Approval in 15 Minutes*</span>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4].map((star) => (
                <svg
                  key={star}
                  className="w-8 h-8 fill-orange-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <svg
                className="w-8 h-8 fill-gray-300"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="w-48 h-32 bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 200 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Laptop Screen */}
                  <rect x="20" y="20" width="140" height="90" rx="4" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
                  
                  {/* Document */}
                  <rect x="40" y="35" width="60" height="60" rx="2" fill="white" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Document Lines */}
                  <line x1="50" y1="45" x2="90" y2="45" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
                  <line x1="50" y1="55" x2="90" y2="55" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
                  <line x1="50" y1="65" x2="80" y2="65" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
                  
                  {/* Orange Flag */}
                  <rect x="105" y="30" width="15" height="3" fill="#f97316" />
                  <rect x="105" y="30" width="3" height="40" fill="#f97316" />
                  
                  {/* Pen */}
                  <g transform="translate(120, 60) rotate(-30)">
                    <rect x="0" y="0" width="6" height="50" rx="3" fill="#3b82f6" />
                    <polygon points="3,50 0,58 6,58" fill="#1e40af" />
                  </g>
                  
                  {/* Laptop Base */}
                  <path d="M 10 110 L 20 110 L 20 115 L 160 115 L 160 110 L 170 110 L 175 125 L 5 125 Z" fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExplorePopUp;