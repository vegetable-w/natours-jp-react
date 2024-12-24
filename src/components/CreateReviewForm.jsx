/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styled from "styled-components";
import StarRating from "./StarRating";
import axios from "axios";
import { showAlert } from "../api/alerts";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Textarea from "../ui/Textarea";

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;

  border: none;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  color: #fff;
  background-color: #55c57a;

  &:hover {
    background-color: #4ba268;
  }
`;

const CreateReviewForm = ({ tourId, onCloseModal }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review.trim() || !rating) {
      showAlert("error", "Please leave a review and select a rating!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/v1/tours/${tourId}/reviews`,
        {
          rating,
          review,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.status === "success") {
        showAlert("success", "Review submitted successfully!");
        onCloseModal?.();
        setReview("");
        setRating(0);
        location.reload(true);
      }

      throw new Error(
        res?.response?.data?.message || "Review submission failed"
      );
    } catch (err) {
      console.error("Error submitting review:", err.message);
      showAlert("error", `Error: ${err.message}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <StarRating
          rating={rating}
          onRatingChange={(newRating) => setRating(newRating)}
        />
      </FormRow>

      <FormRow>
        <label htmlFor="review">Your Review:</label>
        <Textarea
          label="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </FormRow>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default CreateReviewForm;
