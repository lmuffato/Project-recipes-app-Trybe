import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function RecipeIngredients({ id, type }) {
  const endpointMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const endpointDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [fetchRecipeURL, setFetchRecipeURL] = useState('');
  // const [ingredientsArr, setIngredientsArr] = useState([]);
  // const [instructionsArr, setInstructionsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({});

  const handleFetchIngredients = useCallback(() => {
    if (type === 'meals') {
      setFetchRecipeURL(endpointMeals);
    }
    if (type === 'drinks') {
      setFetchRecipeURL(endpointDrinks);
    }
  }, [endpointDrinks, endpointMeals, type]);

  const handleFetch = useCallback(async (url) => {
    try {
      const request = await fetch(url);
      const data = await request.json();
      setRecipe(data[type][0]);
      console.log(data[type][0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [type]);

  // const { strIngredient1,
  // strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7 } = recipe;

  // const handleIngr = (value) => {
  //   if (value.trim() !== '') {
  //     setIngredientsArr([...ingredientsArr].push(value));
  //     // console.log(ingredientsArr);
  //   }
  // };

  // const handleAddIngrToArr = () => {
  //   handleIngr(strIngredient1);
  //   console.log(ingredientsArr);
  // };

  useEffect(() => {
    handleFetchIngredients();
    handleFetch(fetchRecipeURL);
  }, [fetchRecipeURL, handleFetch, handleFetchIngredients]);

  if (isLoading) {
    return 'Loading';
  }

  return (
    <div>
      Ingredientes
      { recipe.strCategory }
    </div>
  );
}

export default RecipeIngredients;

RecipeIngredients.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
