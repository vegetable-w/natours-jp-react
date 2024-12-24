/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import AddReview from "./AddReview";
import axios from "axios";
import { useUser } from "../GlobalState";

const getMyReviews = async ({ userId }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}api/v1/reviews/${userId}`
    );
    return response.data.data.data;
  } catch (error) {
    console.error("Error fetching My Tours:", error);
    throw error;
  }
};

function TourCards({ tours }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUser();

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const fetchedReviews = await getMyReviews({ userId: user._id });
        setReviews(fetchedReviews);
        console.log(reviews);
      } catch (err) {
        setError("Failed to fetch tours");
      } finally {
        setLoading(false);
      }
    };
    fetchMyReviews();
  }, []);

  return (
    <>
      <div className="review-prompt">
        <h1>
          Share your experience to help other travelers make informed decisions!
        </h1>
      </div>

      <div className="card-container">
        {tours.map((tour) => {
          let matchingReview = null;
          for (const review of reviews) {
            if (review.tour.toString() === tour.id.toString()) {
              matchingReview = review;
              break;
            }
          }
          return (
            <div className="card" key={tour.id}>
              {/* Card Header */}
              <div className="card__header">
                <div className="card__picture">
                  <div className="card__picture-overlay">&nbsp;</div>
                  <img
                    className="card__picture-img"
                    src={`/img/tours/${tour.imageCover}`}
                    alt={tour.name}
                  />
                </div>
                <h3 className="heading-tertirary">
                  <span>{tour.name}</span>
                </h3>
              </div>

              {/* Card Details */}
              <div className="card__details">
                <h4 className="card__sub-heading">
                  {`${tour.difficulty} ${tour.duration}-day tour`}
                </h4>
                <div className="card__data">
                  <svg className="card__icon">
                    <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                  </svg>
                  <span>{tour.startLocation.description}</span>
                </div>
                <div className="card__data">
                  <svg className="card__icon">
                    <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                  </svg>
                  <span>
                    {new Date(tour.startDates[0]).toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="card__footer">
                {matchingReview ? (
                  <div className="review-content">
                    <p className="card__text">{matchingReview.review}</p>{" "}
                    <p>{matchingReview.rating} ⭐</p>
                  </div>
                ) : (
                  <AddReview tourId={tour.id} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TourCards;
