import React from "react";
import { rankingData, scholarshipData, hostelData, galleryData, faqData } from "../../data/collegeInfoData";

export const RankingSection: React.FC = () => {
  return (
    <section id="ranking" className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Rankings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rankingData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{item.organization}</h3>
                <p className="text-sm text-gray-600">{item.category}</p>
                <p className="text-xs text-gray-500 mt-1">Year: {item.year}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">#{item.rank}</div>
                <p className="text-xs text-gray-600">Rank</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState("Campus");

  const filteredImages = galleryData.images.filter(
    (img) => activeCategory === "All" || img.category === activeCategory
  );

  return (
    <section id="gallery" className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Gallery
      </h2>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            activeCategory === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        {galleryData.categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h4 className="font-medium text-gray-800">{image.title}</h4>
              <p className="text-xs text-gray-500">{image.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const ScholarshipSection: React.FC = () => {
  return (
    <section id="scholarship" className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Scholarships
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scholarshipData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {item.type}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Eligibility:</strong> {item.eligibility}
            </p>
            <p className="text-sm text-green-600 font-semibold">
              <i className="fa-solid fa-indian-rupee-sign mr-1"></i>
              {item.amount}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
        <p className="text-sm text-gray-700">
          <i className="fa-solid fa-circle-info text-green-600 mr-2"></i>
          <strong>Note:</strong> Students can apply for multiple scholarships. Contact the admission office for detailed application process and deadlines.
        </p>
      </div>
    </section>
  );
};

export const HostelSection: React.FC = () => {
  const { boysHostel, girlsHostel, rules } = hostelData;

  return (
    <section id="hostel" className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Hostel Facilities
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Boys Hostel */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            <i className="fa-solid fa-building text-blue-600 mr-2"></i>
            Boys Hostel
          </h3>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">
              <strong>Capacity:</strong> {boysHostel.capacity} students
            </p>
            <p className="text-sm text-blue-600 font-semibold">
              <strong>Annual Fees:</strong> {boysHostel.fees}
            </p>
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Facilities:</h4>
          <ul className="space-y-2">
            {boysHostel.facilities.map((facility, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <i className="fa-solid fa-check text-green-600 mr-2 mt-1"></i>
                {facility}
              </li>
            ))}
          </ul>
        </div>

        {/* Girls Hostel */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            <i className="fa-solid fa-building text-pink-600 mr-2"></i>
            Girls Hostel
          </h3>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">
              <strong>Capacity:</strong> {girlsHostel.capacity} students
            </p>
            <p className="text-sm text-blue-600 font-semibold">
              <strong>Annual Fees:</strong> {girlsHostel.fees}
            </p>
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Facilities:</h4>
          <ul className="space-y-2">
            {girlsHostel.facilities.map((facility, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <i className="fa-solid fa-check text-green-600 mr-2 mt-1"></i>
                {facility}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hostel Rules */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Hostel Rules & Regulations</h3>
        <ul className="space-y-2">
          {rules.map((rule, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <i className="fa-solid fa-circle text-gray-400 text-xs mr-2 mt-1.5"></i>
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              <i
                className={`fa-solid fa-chevron-down text-gray-600 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              ></i>
            </button>
            {openIndex === index && (
              <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
