// src/components/StarRating.jsx
import React from 'react';
import '../styles/StarRating.css';

const StarRating = ({ rating, editable = false, onRatingChange }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  const handleClick = (newRating) => {
    if (editable && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => {
        let starType = '';
        if (star <= fullStars) {
          starType = 'full';
        } else if (star === fullStars + 1 && hasHalfStar) {
          starType = 'half';
        }
        
        return (
          <span 
            key={star}
            className={`star ${starType} ${editable ? 'editable' : ''}`}
            onClick={() => handleClick(star)}
          >
            ★
          </span>
        );
      })}
      {!editable && <span className="rating-text">{rating.toFixed(1)}</span>}
    </div>
  );
};

export default StarRating;