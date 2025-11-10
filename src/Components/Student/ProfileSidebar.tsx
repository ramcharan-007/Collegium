interface ProfileSidebarProps {
  currentStep?: number;
  profileData?: {
    fullName: string;
    email: string;
  };
}

const ProfileSidebar = ({ currentStep: _currentStep, profileData }: ProfileSidebarProps) => {
  const menuItems = [
    { icon: '👤', label: 'Your profile', active: true, bgColor: 'bg-orange-50', textColor: 'text-orange-600', iconColor: 'text-orange-500' },
    { icon: '📁', label: 'Upload College Photos', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600', iconColor: 'text-yellow-500' },
    { icon: '🏫', label: 'Applied colleges', bgColor: 'bg-gray-50', textColor: 'text-gray-600', iconColor: 'text-gray-500' },
    { icon: '⭐', label: 'Your Reviews', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600', iconColor: 'text-yellow-500' },
    { icon: '📋', label: 'Applied CAF', bgColor: 'bg-gray-50', textColor: 'text-gray-600', iconColor: 'text-gray-500' },
    { icon: '⏳', label: 'Pending Application', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600', iconColor: 'text-yellow-500' },
    { icon: '⚙️', label: 'Account settings', bgColor: 'bg-gray-50', textColor: 'text-gray-600', iconColor: 'text-gray-500' },
    { icon: '👁️', label: 'Profile Views', bgColor: 'bg-purple-50', textColor: 'text-purple-600', iconColor: 'text-purple-500' },
    { icon: '🚪', label: 'Logout', bgColor: 'bg-red-50', textColor: 'text-red-600', iconColor: 'text-red-500' }
  ];

  return (
    <div className="h-full bg-white border-r border-gray-200">
      <div className="p-4">
        {/* Profile Card */}
        <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-200">
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-orange-100 flex items-center justify-center text-3xl">
                👤
              </div>
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-orange-600 transition-colors border-2 border-white"
              aria-label="Edit profile picture"
            >
              <span aria-hidden="true">✏️</span>
            </button>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {profileData?.fullName || 'Your Name'}
            </h3>
            <p className="text-sm text-gray-500">
              {profileData?.email || 'your.email@example.com'}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors text-sm ${
                item.active 
                  ? `${item.bgColor} ${item.textColor} border-l-4 border-orange-500` 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-md ${item.active ? item.bgColor : 'bg-gray-100'} flex items-center justify-center flex-shrink-0`}>
                <span className={`text-sm ${item.iconColor}`}>{item.icon}</span>
              </div>
              <span className="font-medium text-left">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;