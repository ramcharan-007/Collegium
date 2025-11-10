import { useState, memo, useCallback } from 'react';

interface LightweightRegisterFormProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const LightweightRegisterForm = memo(({ selectedType, onTypeChange }: LightweightRegisterFormProps) => {
  const [formData, setFormData] = useState({
    type: selectedType,
    college: '',
    name: '',
    email: '',
    mobile: '',
    linkedin: '',
    designation: ''
  });

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'type') onTypeChange(value);
  }, [onTypeChange]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Registration submitted successfully!');
  }, [formData]);

  const institutionType = selectedType === 'institute' ? 'Institute' : 'College';

  return (
    <div className="w-full bg-white rounded-lg shadow-xl p-4 mx-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Selection */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Registration Type *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="college"
                checked={selectedType === 'college'}
                onChange={handleInputChange}
                className="w-4 h-4 text-orange-600"
              />
              <span className="ml-2 text-sm">College</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="institute"
                checked={selectedType === 'institute'}
                onChange={handleInputChange}
                className="w-4 h-4 text-orange-600"
              />
              <span className="ml-2 text-sm">Institute</span>
            </label>
          </div>
        </div>

        {/* College Selection */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Select {institutionType} *
          </label>
          <select
            name="college"
            value={formData.college}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          >
            <option value="">Select {institutionType}</option>
            <option value="iit-delhi">IIT Delhi</option>
            <option value="iit-bombay">IIT Bombay</option>
            <option value="nit-trichy">NIT Trichy</option>
          </select>
        </div>

        {/* Name */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">Official Mail ID *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your official email"
            required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">Mobile No. *</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Enter your mobile number"
            required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        {/* LinkedIn */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn Profile Link</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            placeholder="https://linkedin.com/in/yourprofile (optional)"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        {/* Designation */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">Select Designation *</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          >
            <option value="">Select your designation</option>
            <option value="marketing-manager">Marketing Manager</option>
            <option value="director">Director</option>
            <option value="admission-head">Admission Head</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
});

LightweightRegisterForm.displayName = 'LightweightRegisterForm';

export default LightweightRegisterForm;