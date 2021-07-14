import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
// import copyToClipboard from '../services/copyToClipboard';

function ShareButtons({ idRecipe }) {
  const [isCopy, setIsCopy] = useState(null);

  const copyToClipboard = ({ target }) => {
    setIsCopy(true);
    console.log(target);
    const { alt } = target;
    const path = `http://localhost:3000/${alt}`;
    navigator.clipboard.writeText(path);
  };

  return (
    <>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ (event) => copyToClipboard(event) }
      >
        <img src={ shareIcon } alt={ idRecipe } />
      </button>
      {isCopy ? <span>Link copiado!</span> : null}
    </>
  );
}

ShareButtons.propTypes = {
  idRecipe: PropTypes.string,
}.isRequired;

export default ShareButtons;
