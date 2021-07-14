import React from 'react';
import PropTypes from 'prop-types';

const VideoComponent = ({ recipe }) => {
  const copyStr = recipe.strYoutube;
  let srcEmbed = '';
  if (copyStr) {
    srcEmbed = copyStr.replace('https://www.youtube.com/watch?v=',
      'https://www.youtube.com/embed/');
  }
  return (
    <>
      <h4>Vídeo</h4>
      <iframe
        src={ srcEmbed }
        frameBorder="0"
        width="95%"
        height="360"
        title="recipe"
        className="video"
        data-testid="video"
      />
    </>
  );
};

VideoComponent.propTypes = {
  replace: PropTypes.func,
  strYoutube: PropTypes.string,
}.isRequired;

export default VideoComponent;
