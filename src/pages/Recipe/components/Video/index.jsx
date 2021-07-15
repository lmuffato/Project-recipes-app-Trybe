import React from 'react';
import PropTypes from 'prop-types';

function Video({ videoId, recipeTitle }) {
  return (
    <iframe
      src={ `https://www.youtube.com/embed/${videoId}` }
      title={ `Instructions of ${recipeTitle}` }
      frameBorder="0"
      allow="accelerometer;
      autoplay;
      clipboard-write;
      encrypted-media;
      gyroscope;
      picture-in-picture"
      allowFullScreen
      data-testid="video"
    />
  );
}

Video.propTypes = {
  videoId: PropTypes.string.isRequired,
  recipeTitle: PropTypes.string,
};

Video.defaultProps = {
  recipeTitle: 'Recipe',
};

export default Video;
