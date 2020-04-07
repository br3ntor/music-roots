import React from 'react';
import './PlayButton.css';

export default function PlayButton({ handleClick, isPlaying }) {
  return (
    <div className="PlayButton" onClick={handleClick}>
      <div hidden={isPlaying}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="play-circle"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            className="play1"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"
          ></path>
        </svg>
      </div>
      <div hidden={!isPlaying}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="pause-circle"
          className="svg-inline--fa fa-pause-circle fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            className="play1"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm96-280v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16zm-112 0v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
