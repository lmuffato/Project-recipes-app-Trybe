import React from 'react';
import PropTypes from 'prop-types';

export default function Image({ src }) {
  return (
    <img
      style={ { maxWidth: '100%' } }
      data-testid="recipe-photo"
      src={ src }
      alt="imagem da receita"
    />

  );
}

Image.propTypes = {
  src: PropTypes.object,
}.isRequired;
