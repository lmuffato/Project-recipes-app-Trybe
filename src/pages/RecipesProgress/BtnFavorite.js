import React, { useEffect, useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import { AppContext } from '../../context/AppContext';

export default function BtnFavorite({ id }) {
  const { context } = useContext(AppContext);
  const { toStorage } = context;
  const [isFavorite, setIsFavorite] = useState(false);
  const key = 'favoriteRecipes';
  const result = useRef('');

  function handleFavoriteRecipe() {
    if (result.current) {
      toStorage.forEach((item) => {
        result.current.push(item);
      });
      localStorage.setItem(key, JSON.stringify(result.current));
      setIsFavorite(true);
    } else {
      localStorage.setItem(key, JSON.stringify(toStorage));
      setIsFavorite(true);
    }
    if (isFavorite === true) {
      const filtered = result.current.filter((idRemove) => idRemove.id !== id);
      localStorage.setItem(key, JSON.stringify(filtered));
      setIsFavorite(false);
    }
  }

  useEffect(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      result.current = JSON.parse(storageValue);
      const comparison = result.current && result.current.some((item) => (
        item.id === id));
      if (comparison) {
        setIsFavorite(true);
      }
    }
  }, [id]);

  return (
    <div className="btn-favorite">
      <button
        type="button"
        onClick={ handleFavoriteRecipe }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite === false ? whiteHeart : blackHeart }
          alt="imagem favoritar"
        />
      </button>
    </div>

  );
}

BtnFavorite.propTypes = {
  id: PropTypes.string.isRequired,
};
