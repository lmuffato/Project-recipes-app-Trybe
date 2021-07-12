import { object } from 'prop-types';
import React from 'react';

function Video(props) {
  const { recipe } = props;
  const video = recipe.strYoutube || recipe.strVideo;

  return (
    <div data-testid="video">
      { !video ? null
        : (
          <iframe
            width="853"
            height="480"
            src={ `https://www.youtube.com/embed/${video.split('https://www.youtube.com/watch?v=')[1]}` }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            className="card-video"
          />
        ) }
    </div>
  );
}

Video.propTypes = {
  recipe: object,
}.isRequired;

export default Video;
