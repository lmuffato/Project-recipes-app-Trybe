import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import RecipeShared from '../effects/RecipeShared';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ data, id, type }) {
  const [shareRecipe, setShareRecipe] = useState(false);

  RecipeShared(shareRecipe, id, type);

  return (
    <>
      {shareRecipe && <span>Link copiado!</span>}
      <Image
        type="button"
        style={ { width: '2rem' } }
        data-testid={ data }
        src={ shareIcon }
        onClick={ () => setShareRecipe(true) }
      />
    </>
  );
}

ShareButton.propTypes = {
  data: PropTypes.string,
}.isRequired;
