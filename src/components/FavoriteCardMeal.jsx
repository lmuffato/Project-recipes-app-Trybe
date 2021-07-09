import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
// import favoriteWhiteIcon from '../images/whiteHeartIcon.svg';
import Copy from 'clipboard-copy';
import favoriteBlackIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function FavoriteCardMeal({ item, index }) {
  const [isShared, setIsShared] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isShared) {
      Copy(`http://localhost:3000/comidas/${item.idMeal}`);
    }
  }, [isShared]);

  const handleClick = () => {
    history.push(`/comidas/${item.idMeal}`);
  };

  return (
    <Card>
      <Card.Img
        onClick={ handleClick }
        data-testid={ `${index}-horizontal-image` }
        src={ item.strMealThumb }
      />
      <Card.Title
        onClick={ handleClick }
        data-testid={ `${index}-horizontal-name` }
      >
        { item.strMeal }
      </Card.Title>
      <Card.Text data-testid={ `${index}-horizontal-top-text` }>
        {`${item.strArea} - ${item.strCategory}`}
      </Card.Text>
      <Card.Text data-testid={ `${index}-horizontal-done-date` }>
        { item.dateModified }
      </Card.Text>
      <Card.Text data-testid={ `${index}-${item.strTags}-horizontal-tag` }>
        {item.strTags}
      </Card.Text>
      { isShared && <span>Link copiado!</span> }
      <Card.Img
        type="button"
        style={ { width: '2rem' } }
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="Compartilhar"
        onClick={ () => setIsShared(true) }
      />
      <Card.Img
        style={ { width: '2rem' } }
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ favoriteBlackIcon }
        alt="desfavoritar"
      />
    </Card>
  );
}

FavoriteCardMeal.propTypes = {
  item: PropTypes.obj,
}.isRequired;
