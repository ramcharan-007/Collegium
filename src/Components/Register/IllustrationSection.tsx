interface IllustrationSectionProps {
  selectedType: string;
}

const IllustrationSection = ({ selectedType }: IllustrationSectionProps) => {
  const institutionType = selectedType === 'institute' ? 'Institute' : 'College';
  
  return (
    <div className="lg:w-1/2 flex flex-col justify-center items-start p-8 lg:p-12">
      {/* Main Heading */}
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Register <span className="text-orange-600">if you are:</span>
        </h1>
        
        {/* Bullet Points */}
        <ul className="space-y-4 text-lg text-gray-700">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></span>
            <span>A <strong>Marketing Manager</strong> of this {institutionType}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></span>
            <span>A person <strong>in-charge</strong> of this {institutionType}</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></span>
            <span>A person who can be <strong>contacted for any further enquiry</strong></span>
          </li>
        </ul>
      </div>

      {/* Illustration */}
      <div className="relative w-full max-w-md mx-auto lg:mx-0">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Elements */}
          <circle cx="80" cy="60" r="25" fill="#e0f2fe" opacity="0.6" />
          <circle cx="320" cy="80" r="20" fill="#fff3e0" opacity="0.8" />
          <rect x="50" y="200" width="30" height="40" rx="5" fill="#e8f5e8" opacity="0.7" />
          <rect x="300" y="220" width="25" height="35" rx="5" fill="#fce4ec" opacity="0.7" />
          
          {/* Clock */}
          <circle cx="350" cy="50" r="15" fill="white" stroke="#ddd" strokeWidth="2" />
          <line x1="350" y1="45" x2="350" y2="50" stroke="#666" strokeWidth="2" />
          <line x1="350" y1="50" x2="353" y2="53" stroke="#666" strokeWidth="1" />
          
          {/* Laptop */}
          <rect x="180" y="180" width="80" height="50" rx="5" fill="#4a5568" />
          <rect x="185" y="185" width="70" height="35" rx="2" fill="#2d3748" />
          <rect x="190" y="190" width="60" height="25" rx="1" fill="#68d391" />
          
          {/* Person */}
          <circle cx="220" cy="120" r="20" fill="#fbb6ce" />
          <rect x="200" y="140" width="40" height="50" rx="20" fill="#4299e1" />
          <rect x="205" y="150" width="30" height="8" rx="4" fill="white" />
          
          {/* Arms */}
          <circle cx="185" cy="155" r="8" fill="#fbb6ce" />
          <circle cx="255" cy="155" r="8" fill="#fbb6ce" />
          <rect x="180" y="150" width="15" height="6" rx="3" fill="#4299e1" />
          <rect x="245" y="150" width="15" height="6" rx="3" fill="#4299e1" />
          
          {/* Plants */}
          <rect x="120" y="220" width="8" height="30" rx="4" fill="#68d391" />
          <circle cx="124" cy="215" r="12" fill="#48bb78" />
          <circle cx="118" cy="210" r="8" fill="#38a169" />
          <circle cx="130" cy="208" r="6" fill="#38a169" />
          
          <rect x="280" y="200" width="6" height="25" rx="3" fill="#68d391" />
          <circle cx="283" cy="195" r="10" fill="#48bb78" />
          <circle cx="278" cy="192" r="6" fill="#38a169" />
          
          {/* Decorative shapes */}
          <path d="M100 100 L120 90 L110 110 Z" fill="#fed7d7" opacity="0.8" />
          <path d="M300 120 L315 110 L310 130 Z" fill="#bee3f8" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
};

export default IllustrationSection;