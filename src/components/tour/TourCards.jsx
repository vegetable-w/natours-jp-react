/* eslint-disable react/prop-types */
import React from "react";

import { useFavorites } from "../../contexts/FavoritesContext";
import { Heart } from "lucide-react";
import { useUser } from "../../contexts/GlobalState";

function TourCards({ tours }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const user = useUser();

  return (
    <>
      {tours.map((tour) => {
        const isFavorite = favorites.some(
          (fav) => fav.id.toString() === tour.id.toString()
        );

        const handleFavoriteClick = () => {
          if (isFavorite) {
            removeFavorite(tour.id);
          } else {
            addFavorite(tour);
          }
        };

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
              <p className="card__text">{tour.summary}</p>
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
              <div className="card__data">
                <svg className="card__icon">
                  <use xlinkHref="/img/icons.svg#icon-flag"></use>
                </svg>
                <span>{`${tour.locations.length} stops`}</span>
              </div>
              <div className="card__data">
                <svg className="card__icon">
                  <use xlinkHref="/img/icons.svg#icon-user"></use>
                </svg>
                <span>{`${tour.maxGroupSize} people`}</span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="card__footer">
              <p>
                <span className="card__footer-value">{`$${tour.price}`}</span>{" "}
                <span className="card__footer-text">per person</span>
              </p>
              <p className="card__ratings">
                <span className="card__footer-value">
                  {tour.ratingsAverage}
                </span>{" "}
                <span className="card__footer-text">
                  {`rating (${tour.ratingsQuantity})`}
                </span>
              </p>
              <a
                className="btn btn--green btn--small"
                href={`/tour/${tour.id}`}
              >
                Details
              </a>
              {user?.role === "user" ? (
                <button
                  onClick={handleFavoriteClick}
                  className="favorite-btn mt-2"
                  aria-label="Toggle favorite"
                >
                  <Heart
                    size={18}
                    className={"duration-300"}
                    fill={isFavorite ? "#e771b6" : "#f2f2f2"}
                  />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TourCards;
