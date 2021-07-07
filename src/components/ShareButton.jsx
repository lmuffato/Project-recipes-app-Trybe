import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import RecipeShared from '../effects/RecipeShared';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton() {
  const [shareRecipe, setShareRecipe] = useState(false);

  RecipeShared(shareRecipe);

  return (
    <>
      {shareRecipe && <span>Link copiado!</span>}
      <Image
        type="button"
        style={ { width: '2rem' } }
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ () => setShareRecipe(true) }
      />
    </>
  );
}
