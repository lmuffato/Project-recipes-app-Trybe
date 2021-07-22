import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import FavoriteIconEnabled from '../../icons/appIcons/favoriteEnable.png';
import FavoriteIconDisabled from '../../icons/appIcons/favoriteDisabled.png';

import AppContext from '../../contexts/app/AppContext';

const getFavoriteRecipes = () => {
  const dataLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return dataLS || false;
};

const addToFavorites = (el, activeScreen) => {
  const data = getFavoriteRecipes();
  let newEl;

  if (activeScreen === 'food') {
    newEl = {
      id: el.idMeal,
      name: el.strMeal,
      type: 'comida',
      image: el.strMealThumb,
      alcoholicOrNot: el.strAlcoholic || '',
      category: el.strCategory,
      area: el.strArea || '',
    };
  } else {
    newEl = {
      id: el.idDrink,
      name: el.strDrink,
      type: 'bebida',
      image: el.strDrinkThumb,
      alcoholicOrNot: el.strAlcoholic || '',
      category: el.strCategory,
      area: el.strArea || '',
    };
  }

  if (data.length) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...data, newEl]));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ ...newEl }]));
  }
};

const checkIsFavorite = (item, screenActive, setIsFavorite) => {
  const dataLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (item[0] && dataLS) {
    if (screenActive === 'food') {
      const check = !!dataLS.filter((recipe) => recipe.id === item[0].idMeal).length;
      if (check) setIsFavorite(true);
    } else {
      const check = !!dataLS.filter((recipe) => recipe.id === item[0].idDrink).length;
      if (check) setIsFavorite(true);
    }
  } else {
    setIsFavorite(false);
  }
};

export default function FavoriteButton(props) {
  const { item } = props;

  const [isFavorite, setIsFavorite] = useState(false);
  const { screenActive } = useContext(AppContext);

  useEffect(() => {
    checkIsFavorite(item, screenActive, setIsFavorite);
  }, [item]);

  return (
    <Container>
      {
        item.length
          && (
            <button
              type="button"
              onClick={ () => {
                setIsFavorite(!isFavorite);
                addToFavorites(item[0], screenActive);
              } }
            >
              <img
                data-testid="favorite-btn"
                src={ isFavorite ? FavoriteIconEnabled : FavoriteIconDisabled }
                alt="Compartilhar"
              />
            </button>
          )
      }
    </Container>
  );
}

FavoriteButton.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

FavoriteButton.defaultProps = {
  item: {},
};

const Container = styled.div`
  max-height: 150px;
  display: flex;
  width: 30px;

  img {
    height: 30px;
    width: 30px;
  }

  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;
