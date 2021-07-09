import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import isFavorite from '../../images/blackHeartIcon.svg';
import isNotFavorite from '../../images/whiteHeartIcon.svg';

export default function FavBtn(props) {
  const { info } = props;
  const [favorite, setFavorite] = useState(false);
  const { params } = useRouteMatch();
  const { id } = params;

  useEffect(() => {
    const isFavorito = () => {
      const local = localStorage.getItem('favoriteRecipes');
      if (local === '' || local === null) {
        setFavorite(false);
      } else {
        const favorites = JSON.parse(local).find((e) => (e.id === id));
        return (favorites !== undefined ? setFavorite(true) : setFavorite(false));
      }
    };
    isFavorito();
  }, [id]);

  const localStoragePush = () => {
    const local = localStorage.getItem('favoriteRecipes');
    if (local === '' || local === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(info));
    } else {
      const favorites = JSON.parse(local);
      const addFavorites = favorites.concat(info);
      localStorage.setItem('favoriteRecipes', JSON.stringify(addFavorites));
    }
  };

  const localStorageRetriever = () => {
    const local = localStorage.getItem('favoriteRecipes');
    if (local === '' || local === null) {
      setFavorite(false);
    } else {
      const favorites = JSON.parse(local);
      const toRemove = favorites.find((e) => (e.id === id));
      const removed = favorites.filter((e) => e !== toRemove);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removed));
    }
  };

  const handleClick = () => {
    setFavorite(!favorite);
    return (favorite === false ? localStoragePush() : localStorageRetriever());
  };

  const imageProvider = () => (
    favorite === true
      ? isFavorite
      : isNotFavorite
  );
  return (
    <input
      type="image"
      data-testid="favorite-btn"
      variant="light"
      style={ { height: '28px' } }
      onClick={ handleClick }
      src={ imageProvider() }
      alt="isFavorite"
    />
  );
}

FavBtn.propTypes = {
  info: PropTypes.oneOfType(
    [PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
      PropTypes.objectOf(PropTypes.any)],
  ).isRequired,
};
