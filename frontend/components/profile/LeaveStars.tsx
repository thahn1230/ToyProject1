import { useEffect, useState } from "react";

type RatingProps = {
  initialRating: number;
  onChange?: (rating: number) => void;
};

const LeaveStars = ({ initialRating, onChange }: RatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(initialRating);

  useEffect(() => {
    // This will be triggered whenever initialRating changes.
    setRating(initialRating);
    setHoverRating(initialRating);
  }, [initialRating]);
  
  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
    if (onChange) onChange(starIndex);
  };

  const renderStar = (index: number) => {
    let starClass = "star";

    if (hoverRating >= index) {
      starClass += " filled";
    } else if (hoverRating > index - 1) {
      starClass += " half-filled";
    }

    return (
      <div
        key={index}
        className={starClass}
        onClick={() => handleStarClick(index)}
        onMouseOver={() => setHoverRating(index)}
        onMouseLeave={() => setHoverRating(rating)}
      ></div>
    );
  };

  return (
    <div className="rating-container">
      {[1, 2, 3, 4, 5].map((index) => renderStar(index))}
    </div>
  );
};

export default LeaveStars;
