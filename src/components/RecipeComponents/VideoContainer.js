import React from 'react';
import PropTypes from 'prop-types';

export default function VideoCtn(props) {
  const { src } = props;
  const videoSrc = src.split('https://www.youtube.com/')[1];
  const embedWay = `https://www.youtube.com/embed/${videoSrc}`;
  return (
    <>
      <h3>Vídeo</h3>
      <iframe
        width="420"
        height="315"
        src={ embedWay }
        data-testid="video"
        title="recipe"
      />
    </>
  );
}

VideoCtn.propTypes = {
  src: PropTypes.string.isRequired,
};
