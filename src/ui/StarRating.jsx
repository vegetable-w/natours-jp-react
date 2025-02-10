/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

const StarRating = ({ onRatingChange, rating }) => {
  const [currentRating, setCurrentRating] = useState(rating || 0);

  useEffect(() => {
    setCurrentRating(rating); // 同步外部的评分状态
  }, [rating]);

  const handleStarClick = (rating) => {
    setCurrentRating(rating);
    if (onRatingChange) {
      onRatingChange(rating); // 通知父组件更新评分
    }
  };

  return (
    <div className="reviews__rating">
      <span className="reviews__label" style={{ marginRight: "10px" }}>
        Ratings:
      </span>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`reviews__star reviews__star--${
            currentRating >= star ? "active" : "inactive"
          }`}
          onClick={() => handleStarClick(star)} // 点击时更新评分
          style={{ cursor: "pointer" }} // 鼠标指针
        >
          <use xlinkHref="/img/icons.svg#icon-star" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
