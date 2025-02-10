/* eslint-disable react/prop-types */
import { React, useState } from "react";

function MyVideoCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="my-video-card">
      <video
        className="video__player"
        src={video.filePath}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <h5>{video.title}</h5>

      <p>{video.discription}</p>
    </div>
  );
}

export default MyVideoCard;
