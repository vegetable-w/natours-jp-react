/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

import { Upload } from "tus-js-client";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";

function UploadVideoForm({ tours, user, onCloseModal }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tour, setTour] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  function handleFileChange(event) {
    setVideoFile(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  }

  useEffect(() => {
    if (progress.toString() === "100.00") {
      setTimeout(() => {
        onCloseModal?.();
        window.location.reload();
      }, 1500);
    }
  }, [progress]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!videoFile) {
      alert("Please select video file!");
      return;
    }
    uploadVideo(videoFile);
  }

  function uploadVideo(file) {
    const upload = new Upload(file, {
      endpoint:
        "https://natours-japan-tours-18991a07f7f0.herokuapp.com/api/v1/videos/upload/files/",
      chunkSize: 5 * 1024 * 1024,
      retryDelays: [0, 1000, 3000, 5000],
      metadata: {
        filename: file.name,
        filetype: file.type,
        title: title,
        content: content,
        tour: tour,
        user: user._id.toString(),
      },
      onError: (error) => {
        console.error("error:", error);
        setMessage(`Upload error: ${error}`);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        setProgress(percentage);
      },
      onSuccess: () => {
        setMessage("Upload finished!");
      },
    });

    upload.start();
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <select
            className="select__modal"
            value={tour.id}
            onChange={(e) => setTour(e.target.value)}
          >
            <option value="">Select a tour</option>
            {tours.map((tour) => (
              <option key={tour.name} value={tour.name}>
                {tour.name}
              </option>
            ))}
          </select>
        </FormRow>
        <FormRow>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input__modal"
            type="text"
            required
          />
        </FormRow>
        <FormRow>
          <label htmlFor="video-description">Description</label>
          <Textarea
            label="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormRow>
        <FormRow>
          <label className="file__modal">
            Choose file
            <input
              type="file"
              className="file__input"
              accept="video/*"
              onChange={handleFileChange}
            />
          </label>
          {fileName && <p className="file__name">Selected file: {fileName}</p>}
        </FormRow>
        <FormRow>
          <button className="btn btn--small btn--green" type="submit">
            Upload
          </button>
        </FormRow>
        <FormRow>
          {progress > 0 && <p>Upload progress: {progress}%</p>}
          {message && <p>{message}</p>}
        </FormRow>
      </Form>
    </>
  );
}

export default UploadVideoForm;
