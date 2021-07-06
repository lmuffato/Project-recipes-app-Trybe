import React from 'react';
import PropTypes from 'prop-types';

function MealVideo({ youTubeVideo, title }) {
  if (youTubeVideo === '') {
    return (
      <div>
        Sinto muito, o vídeo para esta receita está indisponível =/
      </div>
    );
  }

  return (
    <iframe
      title={ title }
      data-testid="video"
      id="ytplayer"
      type="text/html"
      width="640"
      height="360"
      src={ `http://www.youtube.com/embed/${youTubeVideo}` }
    />

  );
}

export default MealVideo;
MealVideo.propTypes = {
  youTubeVideo: PropTypes.string,
  title: PropTypes.string,
}.isRequired;
