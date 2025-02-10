/* eslint-disable react/prop-types */
import { React, useState } from "react";

function VideoCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img
          className="reviews__avatar-img"
          src={`/img/users/${video.user.photo}`}
          alt={video.user.name}
        />
        <h6 className="reviews__user">{video.user.name}</h6>
      </div>
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

export default VideoCard;
