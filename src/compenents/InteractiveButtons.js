import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import copyToClipboard from '../services/copyToClipboard';

function InteractiveButtons({ idRecipe }) {
  const [isCopy, setIsCopy] = useState(null);

  return (
    <>
      {isCopy ? <span>Link copiado!</span> : null}
      <button
        data-testid="share-btn"
        type="button"
        onClick={ (event) => copyToClipboard(event, setIsCopy) }
      >
        <img src={ shareIcon } alt={ idRecipe } />
      </button>
    </>
  );
}

InteractiveButtons.propTypes = {
  idRecipe: PropTypes.string,
}.isRequired;

export default InteractiveButtons;
