import { type ChangeEvent } from 'react';

interface Option {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  options: Option[];
  required?: boolean;
}

const RadioGroup = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  required = false 
}: RadioGroupProps) => {
  return (
    <div className="mb-4 lg:mb-6">
      <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-6">
        {options.map((option, index) => (
          <label key={index} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              required={required}
              className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500 focus:ring-2"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;