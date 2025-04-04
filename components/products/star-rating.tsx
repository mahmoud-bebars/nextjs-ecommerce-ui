import { Star } from "lucide-react";
import type React from "react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
}) => {
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <Star
            key={i}
            className={`w-4 h-4 ${
              ratingValue <= rating
                ? "fill-gray-900 text-gray-900 dark:fill-white dark:text-white"
                : " text-gray-900 dark:text-white"
            }`}
          />
        );
      })}
    </div>
  );
};
