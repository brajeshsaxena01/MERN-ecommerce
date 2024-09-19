import { useState } from "react";

const Rating = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0); // Assuming 5-star rating system

  const handleClick = (value) => {
    onChange({ target: { value } });
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div className="flex space-x-1">
      {stars.map((_, index) => {
        const ratingValue = index + 1;
        return (
          <svg
            key={index}
            className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
              (hoverValue || value) >= ratingValue
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            onClick={() => handleClick(ratingValue)}
            onMouseOver={() => handleMouseOver(ratingValue)}
            onMouseLeave={handleMouseLeave}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.964a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.964c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.964a1 1 0 00-.364-1.118L2.05 9.39c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.964z" />
          </svg>
        );
      })}
    </div>
  );
};

export default Rating;
