import React from 'react';
import PropTypes from 'prop-types';

export default function Video({ recipe }) {
  function getYouTubeURL() {
    if (recipe.strYoutube) {
      const recipeURL = recipe.strYoutube.split('=');
      const VIDEO_ID = recipeURL[recipeURL.length - 1];
      return `http://www.youtube.com/embed/${VIDEO_ID}`;
    }
  }

  return (
    <div>
      <h3>Vídeo</h3>
      <embed
        type="video/mp4"
        src={ getYouTubeURL() }
        title="recipe video"
        width="400"
        height="300"
        data-testid="video"
      />
    </div>
  );
}

Video.propTypes = {
  recipe: PropTypes.string.isRequired,
};
