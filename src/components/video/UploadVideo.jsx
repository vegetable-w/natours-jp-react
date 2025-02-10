/* eslint-disable react/prop-types */
import styled from "styled-components";
import Modal from "../../ui/Modal";
import UploadVideoForm from "./UploadVideoForm";

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

function UploadVideo({ tours, user }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="video-form">
          <Button>Upload New Video</Button>
        </Modal.Open>
        <Modal.Window name="video-form">
          <UploadVideoForm tours={tours} user={user} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default UploadVideo;
