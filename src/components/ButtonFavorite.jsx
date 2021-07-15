/*
Esta função cria o botão para favoritar uma receita.
Ela é renderizada na tela de receitas favoritas, feitas e detalhes de uma receita
- A função recebe como parâmetros o ID da receita (idRecipe) e rederiza condicionalmente
  o icone do coração preenchido se a receita já estiver presente na chave 'favoriteRecipes'
  do localstorage e o coração com contorno apenas se a receita não estiver presente
- Ao clicar no botão, é chamada a função setFavoriteLocalStorage que faz o arquivamento ou
  retirada da receita no local storage
- O parametro typeRecipe contem o nome do url do site da API ('themealdb' ou 'thecocktaildb')

data-testid={ `${index}-horizontal-favorite-btn` }
*/

import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import setFavoriteLocalStorage from '../service/setFavoriteLocalStorage';
import '../styleSheets/ButtonFavorite.css';

function ButtonFavorite(props) {
  const { idRecipe, dbType, testid } = props;
  const { setUpadateFlag } = useContext(ContextRecipes);
  const [isFavorite, setIsFavorite] = useState(false);

  const toogleIcon = () => {
    setIsFavorite(!isFavorite);
    setUpadateFlag(true);
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites !== null) {
      let test = false;
      favorites.forEach((recipe) => {
        if (recipe.id === idRecipe) test = true;
      });
      setIsFavorite(test);
    }
  }, [idRecipe]);

  return (
    <button
      type="button"
      className="button-favorite"
      onClick={ async () => {
        await setFavoriteLocalStorage(dbType, idRecipe);
        toogleIcon();
      } }
    >
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="icone do botão de favorito"
        data-testid={ testid }
      />
    </button>
  );
}

ButtonFavorite.propTypes = {
  idRecipe: PropTypes.string.isRequired,
  dbType: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};

export default ButtonFavorite;
