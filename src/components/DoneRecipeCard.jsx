import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipeCard({ area, imgSrc, imgId, category,
  categoryId, mealName, nameId, dateId, tag, doneDate, shareId, indexTag }) {
  const [copyLink, setCopyLink] = useState(false);

  const history = useHistory();
  const shareClick = () => {
    const URL = history.location.pathname.replace('/in-progress', '');
    copy(`http://localhost:3000${URL}`);
    setCopyLink(true);
  };

  return (
    <div>
      <img src={ imgSrc } alt="Done Recipe Card" data-testid={ imgId } />
      {area !== '' ? (
        <h4 data-testid={ categoryId }>{ `${area} - ${category}` }</h4>
      ) : (<h4 data-testid={ categoryId }>{ category }</h4>)}
      <h4 data-testid={ categoryId }>{ category }</h4>
      <h3 data-testid={ nameId }>{ mealName }</h3>
      <span data-testid={ dateId }>{ doneDate }</span>
      <button type="button" onClick={ shareClick }>
        <img data-testid={ shareId } src={ shareIcon } alt="compartilhar" />
      </button>
      {copyLink ? <span>Link copiado!</span> : null}
      {tag.map((name, index) => (
        <span
          key={ index }
          data-testid={ `${indexTag}-${name}-horizontal-tag` }
        >
          { name }
        </span>))}
    </div>
  );
}

DoneRecipeCard.propTypes = {
  imgSrc: PropTypes.string,
  imgId: PropTypes.string,
  category: PropTypes.string,
  categoryId: PropTypes.string,
  nameId: PropTypes.string,
  dateId: PropTypes.string,
}.isRequired;

export default DoneRecipeCard;
