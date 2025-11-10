import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import InputField from './InputField.tsx';
import SelectField from './SelectField.tsx';
import RadioGroup from './RadioGroup.tsx';
import Button from './Button.tsx';

interface FormData {
  type: string;
  college: string;
  name: string;
  email: string;
  mobile: string;
  linkedin: string;
  designation: string;
}

interface FormErrors {
  [key: string]: string | null;
}

interface Option {
  value: string;
  label: string;
}

interface RegisterFormProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const RegisterForm = ({ selectedType, onTypeChange }: RegisterFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    type: selectedType,
    college: '',
    name: '',
    email: '',
    mobile: '',
    linkedin: '',
    designation: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync formData.type with selectedType prop
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      type: selectedType
    }));
  }, [selectedType]);

  // Sample data - in real app, this would come from API
  const collegeOptions: Option[] = [
    { value: 'iit-delhi', label: 'IIT Delhi' },
    { value: 'iit-bombay', label: 'IIT Bombay' },
    { value: 'iit-madras', label: 'IIT Madras' },
    { value: 'nit-trichy', label: 'NIT Trichy' },
    { value: 'bits-pilani', label: 'BITS Pilani' },
    { value: 'dtu', label: 'Delhi Technological University' },
    { value: 'vit', label: 'VIT University' },
    { value: 'srm', label: 'SRM Institute' }
  ];

  const designationOptions: Option[] = [
    { value: 'marketing-manager', label: 'Marketing Manager' },
    { value: 'director', label: 'Director' },
    { value: 'admission-head', label: 'Admission Head' },
    { value: 'dean', label: 'Dean' },
    { value: 'principal', label: 'Principal' },
    { value: 'registrar', label: 'Registrar' },
    { value: 'coordinator', label: 'Coordinator' },
    { value: 'other', label: 'Other' }
  ];

  const typeOptions: Option[] = [
    { value: 'college', label: 'College' },
    { value: 'institute', label: 'Institute' }
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Notify parent component when type changes
    if (name === 'type') {
      onTypeChange(value);
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.college) newErrors.college = 'Please select a college/institute';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.designation) newErrors.designation = 'Please select your designation';

    // LinkedIn validation (optional but if provided, should be valid)
    if (formData.linkedin && !formData.linkedin.includes('linkedin.com')) {
      newErrors.linkedin = 'Please enter a valid LinkedIn profile URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted successfully:', formData);
      
      // Show success message or redirect
      alert('Registration submitted successfully! We will contact you soon.');
      
      // Reset form
      setFormData({
        type: 'college',
        college: '',
        name: '',
        email: '',
        mobile: '',
        linkedin: '',
        designation: ''
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg lg:rounded-2xl shadow-xl p-3 lg:p-8 mx-2 lg:mx-0">
        <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-6">
          {/* Type Selection */}
          <RadioGroup
            label="Registration Type"
            name="type"
            value={selectedType}
            onChange={handleInputChange}
            options={typeOptions}
            required
          />

          {/* College/Institute Selection */}
          <SelectField
            label={`Select ${selectedType === 'college' ? 'College' : 'Institute'}`}
            name="college"
            value={formData.college}
            onChange={handleInputChange}
            options={collegeOptions}
            placeholder={`Select ${selectedType === 'college' ? 'College' : 'Institute'}`}
            required
            error={errors.college}
          />

          {/* Name */}
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
            error={errors.name}
          />

          {/* Email */}
          <InputField
            label="Official Mail ID"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your official email"
            required
            error={errors.email}
          />

          {/* Mobile */}
          <InputField
            label="Mobile No."
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Enter your mobile number"
            required
            error={errors.mobile}
          />

          {/* LinkedIn (Optional) */}
          <InputField
            label="LinkedIn Profile Link"
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            placeholder="https://linkedin.com/in/yourprofile (optional)"
            error={errors.linkedin}
          />

          {/* Designation */}
          <SelectField
            label="Select Designation"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            options={designationOptions}
            placeholder="Select your designation"
            required
            error={errors.designation}
          />

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
    </div>
  );
};

export default RegisterForm;