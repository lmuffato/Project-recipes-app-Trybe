import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import favoriteBlackIcon from '../images/blackHeartIcon.svg';
import { getItemFromLocalStorage, setToLocalStorage } from '../services/localStorage';
import FavoritesContext from '../context/FavoritesContext';
import GetFavoritesDetails from '../services/GetFavoritesDetails';
import ShareButton from './ShareButton';

export default function FavoriteCardMeal({ item, index }) {
  const { setAllFavorites } = useContext(FavoritesContext);
  const [removeItem, setRemoveItem] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!removeItem) return;
    if (removeItem === true) {
      const storageItems = getItemFromLocalStorage('favoriteRecipes');
      const storageFilter = storageItems.filter((stgItems) => stgItems.id
      !== item.idMeal);
      setToLocalStorage('favoriteRecipes', storageFilter);
      const request = async () => {
        const data = await GetFavoritesDetails();
        setAllFavorites(data);
      };
      request();
    }
  }, [removeItem]);

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
      <ShareButton
        data={ `${index}-horizontal-share-btn` }
        id={ item.idMeal }
        type="comida"
      />
      <Card.Img
        style={ { width: '2rem' } }
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ favoriteBlackIcon }
        alt="desfavoritar"
        onClick={ () => setRemoveItem(true) }
      />
    </Card>
  );
}

FavoriteCardMeal.propTypes = {
  item: PropTypes.obj,
}.isRequired;
