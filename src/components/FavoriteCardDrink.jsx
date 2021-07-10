import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import favoriteBlackIcon from '../images/blackHeartIcon.svg';
import { getItemFromLocalStorage, setToLocalStorage } from '../services/localStorage';
import FavoritesContext from '../context/FavoritesContext';
import GetFavoritesDetails from '../services/GetFavoritesDetails';
import ShareButton from './ShareButton';

export default function FavoriteCardDrink({ item, index }) {
  const { setAllFavorites } = useContext(FavoritesContext);
  const [removeItem, setRemoveItem] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!removeItem) return;
    if (removeItem === true) {
      const storageItems = getItemFromLocalStorage('favoriteRecipes');
      const storageFilter = storageItems.filter((stgItems) => stgItems.id
      !== item.idDrink);
      setToLocalStorage('favoriteRecipes', storageFilter);
      const request = async () => {
        const data = await GetFavoritesDetails();
        setAllFavorites(data);
      };
      request();
    }
  }, [removeItem]);

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
      <ShareButton
        data={ `${index}-horizontal-share-btn` }
        id={ item.idDrink }
        type="bebida"
      />
      <Card.Img
        data-testid={ `${index}-horizontal-favorite-btn` }
        style={ { width: '2rem' } }
        src={ favoriteBlackIcon }
        alt="desfavoritar"
        onClick={ () => setRemoveItem(true) }
      />
    </Card>
  );
}

FavoriteCardDrink.propTypes = {
  item: PropTypes.obj,
}.isRequired;
