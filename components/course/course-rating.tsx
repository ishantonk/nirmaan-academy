"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
    totalStars?: number;
    onRatingChange?: (rating: number) => void;
}

export function CourseRating({
    totalStars = 5,
    onRatingChange,
}: StarRatingProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClick = (value: number) => {
        setRating(value);
        if (onRatingChange) {
            onRatingChange(value);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {Array.from({ length: totalStars }, (_, index) => {
                const starValue = index + 1;
                return (
                    <Star
                        key={index}
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                        fill={
                            starValue <= (hover || rating)
                                ? "#FFD700"
                                : "#F1F5DB"
                        }
                        fillRule="evenodd"
                        className="text-amber-300 transition-colors duration-200 cursor-pointer"
                        aria-label={`Rate ${starValue} star${
                            starValue > 1 ? "s" : ""
                        }`}
                    />
                );
            })}
        </div>
    );
}
