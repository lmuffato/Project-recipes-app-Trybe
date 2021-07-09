import React from 'react';

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
      <iframe
        src={ getYouTubeURL() }
        title="recipe video"
        data-testid="video"
      />
    </div>
  );
}
