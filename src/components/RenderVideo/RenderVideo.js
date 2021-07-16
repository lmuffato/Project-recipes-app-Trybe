import React from 'react';
import PropTypes from 'prop-types';

export default function RenderVideo({ src, dataTestid }) {
  return (
    <iframe
      className="details-ingredients"
      data-testid={ `${dataTestid}` }
      src={ `${src}` }
      title="recipes video"
    />
  );
}

RenderVideo.propTypes = {
  src: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};
