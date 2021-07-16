import React from 'react';
import PropTypes from 'prop-types';

export default function VideoCtn(props) {
  const { src } = props;
  const videoSrc = src.split('https://www.youtube.com/')[1];
  const embedWay = `https://www.youtube.com/embed/${videoSrc}`;
  return (
    <iframe
      width="500"
      height="315"
      src={ embedWay }
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer;
        autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

VideoCtn.propTypes = {
  src: PropTypes.string.isRequired,
};
