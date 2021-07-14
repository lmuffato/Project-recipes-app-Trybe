import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../../../images/blackHeartIcon.svg';
import setFavRecipe,
{ verifyInLS } from '../../../../services/localStorage/setFavRecipes';

function FavButton({ props }) {
  const { idMeal, idDrink, strArea, strCategory, strAlcoholic,
    strMeal, strDrink, strDrinkThumb, strMealThumb } = props;
  const objectToLS = {
    id: idMeal || idDrink,
    type: idMeal ? 'comida' : 'bebida',
    area: strArea || '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic || '',
    name: strDrink || strMeal,
    image: strDrinkThumb || strMealThumb,
  };
  const handleClick = () => {
    setFavRecipe(objectToLS);
  };
  useEffect(() => { // componentDidMount, td vez q o component for montaod, vai verificar a existencia do id no LS
    if (verifyInLS(idMeal || idDrink)) { // se existir o id no LS, ALTERAR coracao pra preto.
      document.getElementById('heart-x').src = blackHeartIcon;
    } else { // se nao existir id no LS, alterar coracao pra branco.
      document.getElementById('heart-x').src = whiteHeartIcon;
    }
  }, [idMeal, idDrink]);
  return (
    <button
      onClick={ () => handleClick() }
      type="button"
      className="svg-btn"
      id={ idMeal || idDrink }
    >
      <img
        id="heart-x"
        alt="heart"
        className="altSvg"
        src={ whiteHeartIcon }
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavButton.propTypes = {
  props: PropTypes.object,
}.isRequired;

export default FavButton;
