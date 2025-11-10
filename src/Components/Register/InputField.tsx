import { type ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string | null;
}

const InputField = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error = null 
}: InputFieldProps) => {
  return (
    <div className="mb-3 lg:mb-4">
      <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 lg:px-4 py-2 lg:py-3 text-sm lg:text-base border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 ${
          error 
            ? 'border-red-500 bg-red-50' 
            : 'border-gray-300 hover:border-gray-400 focus:shadow-md'
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default InputField;