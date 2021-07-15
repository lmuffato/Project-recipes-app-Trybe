/*

data-testid="${index}-horizontal-share-btn"
data-testid="share-btn"

*/

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import shareIcon from '../images/shareIcon.svg';
import '../styleSheets/ButtonShare.css';

function ButtonShare(props) {
  const { idRecipe, typeRecipe, testid } = props;
  const { turnOnAlert } = useContext(ContextRecipes);
  const { pathname } = useLocation();
  const url = `${window.location.href.split(pathname)[0]}/${typeRecipe}/${idRecipe}`;
  const sendToClipboard = () => {
    // sorce:  Dennis Rosenbaum https://www.codegrepper.com/app/profile.php?id=10024
    const elem = document.createElement('textarea');
    elem.value = url;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    turnOnAlert();
  };
  return (
    <button
      type="button"
      className="button-share"
      onClick={ () => sendToClipboard() }
      data-testid={ testid }
      src={ shareIcon }
    >
      <img
        src={ shareIcon }
        alt="botão de compartilhar"
      />
    </button>
  );
}

ButtonShare.propTypes = {
  idRecipe: PropTypes.string.isRequired,
  typeRecipe: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};

export default ButtonShare;
