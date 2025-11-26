import React, { useState } from "react";
import { reviewsData } from "../../data/collegeInfoData";

const ReviewsSection: React.FC = () => {
  const { overall, totalReviews, breakdown, reviews } = reviewsData;
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="fa-solid fa-star text-yellow-400 text-sm"></i>
        ))}
        {hasHalfStar && (
          <i className="fa-solid fa-star-half-alt text-yellow-400 text-sm"></i>
        )}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <i key={`empty-${i}`} className="fa-regular fa-star text-gray-300 text-sm"></i>
        ))}
      </div>
    );
  };

  return (
    <section id="reviews" className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Student Reviews
      </h2>

      {/* Overall Rating */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Overall Score */}
          <div className="flex flex-col items-center justify-center border-r border-gray-200">
            <div className="text-5xl font-bold text-gray-800 mb-2">{overall}</div>
            <div className="flex items-center gap-2 mb-2">
              {renderStars(overall)}
            </div>
            <p className="text-sm text-gray-600">Based on {totalReviews} reviews</p>
          </div>

          {/* Right: Category Breakdown */}
          <div className="space-y-3">
            {breakdown.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">{item.category}</span>
                  <span className="text-sm font-semibold text-gray-800">{item.rating}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{ width: `${(item.rating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        <i className="fa-solid fa-circle-check mr-1"></i>
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{review.course}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  {renderStars(review.rating)}
                  <span className="text-sm font-semibold text-gray-800 ml-1">
                    {review.rating}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            </div>

            <h5 className="font-semibold text-gray-800 mb-2">{review.title}</h5>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">{review.review}</p>

            <div className="flex items-center gap-4 text-sm">
              <button className="text-gray-600 hover:text-blue-600 transition">
                <i className="fa-regular fa-thumbs-up mr-1"></i>
                Helpful ({review.likes})
              </button>
              <button className="text-gray-600 hover:text-blue-600 transition">
                <i className="fa-regular fa-flag mr-1"></i>
                Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {!showAll && reviews.length > 3 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Load More Reviews
          </button>
        </div>
      )}

      {/* Write Review CTA */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
        <p className="text-gray-700 mb-3">Have you studied here? Share your experience!</p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          Write a Review
        </button>
      </div>
    </section>
  );
};

export default ReviewsSection;
