import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeShared from '../effects/RecipeShared';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ data, id, type }) {
  const [shareRecipe, setShareRecipe] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  const checkpathname = (index) => {
    if (pathname.includes('feitas') || pathname.includes('favoritas')) {
      return `${index}-horizontal-share-btn`;
    }
    return 'share-btn';
  };

  RecipeShared(shareRecipe, id, type);

  return (
    <div>
      {shareRecipe && <span>Link copiado!</span>}
      <button
        className="doneShareButton"
        type="button"
        data-testid={ checkpathname(data) }
        src={ shareIcon }
        onClick={ () => setShareRecipe(true) }
      >
        <img style={ { width: '2rem' } } src={ shareIcon } alt="compartilhar" />
      </button>
    </div>
  );
}

ShareButton.propTypes = {
  data: PropTypes.string,
}.isRequired;
