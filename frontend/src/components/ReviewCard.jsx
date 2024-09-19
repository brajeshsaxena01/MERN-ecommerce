import profilePng from "../images/Profile.png"; // Update with the correct image path
import { ShowDynamicStart } from "./ShowDynamicStart";

const ReviewCard = ({ review }) => {
  return (
    <div className="mx-6 my-6 flex flex-col items-center border border-gray-200 rounded-lg shadow-md p-6">
      <img
        src={profilePng}
        alt="User"
        className="w-16 h-16 rounded-full mb-4"
      />
      {/* <p className="text-lg font-semibold mb-2 text-gray-400">{review.reviewerName}</p> */}
      <p className="text-lg font-semibold mb-2 text-gray-400">
        {review.userId.email}
      </p>

      {/* Star Rating */}
      <ShowDynamicStart rating={review.rating} />

      <span className="text-sm text-gray-500">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
