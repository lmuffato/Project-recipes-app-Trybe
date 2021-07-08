import React from 'react';
import PropTypes from 'prop-types';

function Video({ recipeType, recipesDetails }) {
  return (
    <div>
      {(recipesDetails.strYoutube && recipeType === 'Meal')
        ? (
          <div className="video">
            <h2>Video</h2>
            <iframe
              data-testid="video"
              src={ `http://www.youtube.com/embed/${recipesDetails.strYoutube.split('=')[1]}` }
              title="How to do"
              style={ { border: 'none' } }
              allowFullScreen
            />
          </div>)
        : ''}
    </div>
  );
}

Video.propTypes = {
  recipesDetails: PropTypes.objectOf(PropTypes.string),
  recipesType: PropTypes.string,
}.isRequired;

export default Video;
