import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipeShared from '../effects/RecipeShared';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ data, id, type }) {
  const [shareRecipe, setShareRecipe] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  const checkpathname = () => {
    if (pathname.includes('feitas') || pathname.includes('favoritas')) {
      return `${index}-horizontal-share-btn`;
    }
    return 'share-btn';
  };

  RecipeShared(shareRecipe, id, type);

  return (
    <>
      {shareRecipe && <span>Link copiado!</span>}
      <Image
        type="button"
        style={ { width: '2rem' } }
        data-testid={ checkpathname() }
        src={ shareIcon }
        onClick={ () => setShareRecipe(true) }
      />
    </>
  );
}

ShareButton.propTypes = {
  data: PropTypes.string,
}.isRequired;
