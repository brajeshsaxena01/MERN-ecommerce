// import { StarIcon } from "@heroicons/react/solid"; // Assuming you're using Heroicons for the star icon
import { StarIcon } from "@heroicons/react/20/solid";

export const ShowDynamicStart = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const modulusOfRating = rating % 1;
  const widthPercentage = modulusOfRating * 100;

  return (
    <div className="flex items-center">
      {[0, 1, 2, 3, 4].map((index) => (
        <span key={index} className="relative">
          {index < fullStars ? (
            <StarIcon className="h-5 w-5 text-gray-900" />
          ) : hasHalfStar && index === fullStars ? (
            <div className="relative">
              <StarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <div
                className="absolute top-0 left-0 h-full w-1/2 overflow-hidden"
                style={{ width: `${widthPercentage}%` }} // adjust width based on the rating (e.g., 0.75 for 4.75 rating)
              >
                <StarIcon
                  className="h-5 w-5 text-gray-900"
                  aria-hidden="true"
                />
              </div>
            </div>
          ) : (
            <StarIcon className="h-5 w-5 text-gray-400" />
          )}
        </span>
      ))}
    </div>
  );
};
