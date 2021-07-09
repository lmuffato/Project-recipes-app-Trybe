import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Copy from 'clipboard-copy';
// import favoriteWhiteIcon from '../images/whiteHeartIcon.svg';
import favoriteBlackIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function FavoriteCardDrink({ item, index }) {
  const [isShared, setIsShared] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (isShared) {
      Copy(`http://localhost:3000/bebidas/${item.idDrink}`);
    }
  }, [isShared]);

  const handleClick = () => {
    history.push(`/bebidas/${item.idDrink}`);
  };

  return (
    <Card>
      <Card.Img
        onClick={ handleClick }
        data-testid={ `${index}-horizontal-image` }
        src={ item.strDrinkThumb }
      />
      <Card.Title
        onClick={ handleClick }
        data-testid={ `${index}-horizontal-name` }
      >
        { item.strDrink }
      </Card.Title>
      <Card.Text data-testid={ `${index}-horizontal-top-text` }>
        {item.strAlcoholic}
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
        data-testid={ `${index}-horizontal-favorite-btn` }
        style={ { width: '2rem' } }
        src={ favoriteBlackIcon }
        alt="desfavoritar"
      />
    </Card>
  );
}

FavoriteCardDrink.propTypes = {
  item: PropTypes.obj,
}.isRequired;
