/* eslint-disable react/prop-types */
import styled from "styled-components";
import CreateReviewForm from "./CreateReviewForm";
import Modal from "./Modal";

const Button = styled.button`
  font-size: 1.6rem;
  padding: 1.2rem 2.4rem;
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

function AddReview({ tourId }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="review-form">
          <Button>write a review</Button>
        </Modal.Open>
        <Modal.Window name="review-form">
          <CreateReviewForm tourId={tourId} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddReview;
