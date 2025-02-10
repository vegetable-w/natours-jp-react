/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";

import OverviewBox from "../ui/OverviewBox";
import ReviewCard from "../components/review/ReviewCard";
import { useParams } from "react-router-dom";
import MapboxTest from "../components/tour/MapboxTest";
import Spinner from "../ui/Spinner";
import { useUser } from "../contexts/GlobalState";
import { bookTour } from "../api/stripe";
import SpinnerMini from "../ui/SpinnerMini";
import Error from "./Error";
import VideoCard from "../components/video/VideoCard";

const BookTourButton = ({ user, tour }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async () => {
    setIsProcessing(true);
    try {
      await bookTour(tour.id);
    } catch (error) {
      console.error("Error booking tour:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {user ? (
        <button
          className="btn btn--green span-all-rows"
          id="book-tour"
          onClick={handleClick}
        >
          {isProcessing ? <SpinnerMini /> : "Book tour now!"}
        </button>
      ) : (
        <a className="btn btn--green span-all-rows" href="/login">
          Log in to book tour
        </a>
      )}
    </>
  );
};

function Tour() {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useUser();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(
          `https://natours-japan-tours-18991a07f7f0.herokuapp.com/api/v1/tours/${tourId}`
        );
        setTour(res.data.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [tourId]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `https://natours-japan-tours-18991a07f7f0.herokuapp.com/api/v1/videos/tour/${tourId}`
        );
        setVideos(res.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchVideos();
  }, [tourId]);

  if (loading) return <Spinner />;

  if (error) return <Error msg={error} />;

  const date = new Date(tour.startDates[0]).toLocaleString("en-us", {
    month: "long",
    year: "numeric",
  });

  const paragraphs = tour.description.split("\n");

  return (
    <>
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            className="header__hero-img"
            src={`/img/tours/${tour.imageCover}`}
            alt={`${tour.name}`}
          />
        </div>

        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{`${tour.name} tour`}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-clock" />
              </svg>
              <span className="heading-box__text">{`${tour.duration} days`}</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin" />
              </svg>
              <span className="heading-box__text">
                {tour.startLocation.description}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
              <OverviewBox label="Next date" text={date} icon="calendar" />
              <OverviewBox
                label="Difficulty"
                text={tour.difficulty}
                icon="trending-up"
              />
              <OverviewBox
                label="Participants"
                text={`${tour.maxGroupSize} people`}
                icon="user"
              />
              <OverviewBox
                label="Rating"
                text={`${tour.ratingsAverage} / 5`}
                icon="star"
              />
            </div>

            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
              {tour.guides.map((guide) => (
                <div className="overview-box__detail" key={guide.name}>
                  <img
                    className="overview-box__img"
                    src={`/img/users/${guide.photo}`}
                    alt={guide.name}
                  />
                  <span className="overview-box__label">
                    {guide.role === "lead-guide" ? "Lead guide" : "Tour guide"}
                  </span>
                  <span className="overview-box__text">{guide.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">About {tour.name} tour</h2>
          {paragraphs.map((p, index) => (
            <p className="description__text" key={index}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="section-pictures">
        {tour.images.map((img, i) => (
          <div className="picture-box" key={i}>
            <img
              className={`picture-box__img picture-box__img--${i + 1}`}
              src={`/img/tours/${img}`}
              alt={`The Park Camper Tour ${i + 1}`}
            />
          </div>
        ))}
      </section>

      <section className="section-map">
        <MapboxTest locations={tour.locations} />
      </section>

      <section className="section-reviews">
        <div className="reviews">
          {tour.reviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </div>
      </section>

      {videos.length > 0 && (
        <section className="section-videos">
          <div className="reviews">
            {videos.map((video) => (
              <VideoCard video={video} key={video._id} />
            ))}
          </div>
        </section>
      )}

      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <img src="/img/logo-white.png" alt="Natours logo" />
          </div>
          <img
            className="cta__img cta__img--1"
            src={`/img/tours/${tour.images[1]}`}
            alt="Tour picture"
          />
          <img
            className="cta__img cta__img--2"
            src={`/img/tours/${tour.images[2]}`}
            alt="Tour picture"
          />
          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              {`${tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}
            </p>
            <BookTourButton user={user} tour={tour} />
          </div>
          <p className="note" style={{ color: "#777" }}>
            <strong>Note:</strong> When booking, payment functionality is only
            for testing purposes. No actual payment information is required.
          </p>
        </div>
      </section>
    </>
  );
}

export default Tour;
