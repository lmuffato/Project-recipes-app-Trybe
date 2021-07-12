import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchRecipes, fetchDrinksRecipes } from '../services/getApis';
import SearchContext from '../context/SearchContext';

function IngredientsCard({ index, ingredientImg, ingredientName, type }) {
  const [recipesIngredients, setRecipesIngredients] = useState([]);
  const { setFilteredRecipes, setFilteredDrinks } = useContext(SearchContext);
  const history = useHistory();

  const handleClick = async () => {
    if (type === 'comidas') {
      const result = await fetchRecipes(ingredientName, 'ingredient');
      setRecipesIngredients(result.meals);
      history.push(`/${type}`);
    } else {
      const result = await fetchDrinksRecipes(ingredientName, 'ingredient');
      setRecipesIngredients(result.drinks);
      history.push(`/${type}`);
    }
  };

  useEffect(() => {
    if (recipesIngredients !== [] && type === 'comidas') {
      setFilteredRecipes(recipesIngredients);
    } else if (recipesIngredients !== [] && type === 'bebidas') {
      setFilteredDrinks(recipesIngredients);
    }
  }, [recipesIngredients]);

  return (
    <button type="button" onClick={ handleClick } className="itemCard">
      <div data-testid={ `${index}-ingredient-card` }>
        <img src={ ingredientImg } data-testid={ `${index}-card-img` } alt="ingredient" />
        <h4 data-testid={ `${index}-card-name` }>{ ingredientName }</h4>
      </div>
    </button>
  );
}

IngredientsCard.propTypes = {
  index: PropTypes.string,
  ingredientImg: PropTypes.string,
  ingredientName: PropTypes.string,
}.isRequired;

export default IngredientsCard;
