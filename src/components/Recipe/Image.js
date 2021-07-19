import { string } from 'prop-types';
import React from 'react';

function Image({ url }) {
  return (
    <img
      className="img-bg"
      data-testid="recipe-photo"
      src={ url }
      width="200"
      alt="Grapefruit slice atop a pile of other slices"
    />
  );
}

Image.propTypes = {
  url: string.isRequired,
};

export default Image;
