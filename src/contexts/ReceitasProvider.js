import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';

function ReceitasProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [APIresponse, setAPIResponse] = useState();
  const [APIFood, setAPIFood] = useState();
  const [APIDrink, setAPIDrink] = useState();
  const [APIIngredientsFood, setAPIIngredientsFood] = useState();
  const [APIIngredientsDrink, setAPIIngredientsDrink] = useState();
  const [selected, setSelected] = useState();
  const [filter, setFilter] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [filterValue, setFilterValue] = useState('All');
  const [drinksByIngredient, setDrinksByIngredient] = useState();
  const [foodsByIngredient, setFoodsByIngredient] = useState();

  async function fetchApi(endpoint, page) {
    await fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        if (page === 'comidas') {
          setAPIFood(response);
        } else if (page === 'bebidas') {
          setAPIDrink(response);
        } else if (page === 'ingredientes-comidas') {
          setAPIIngredientsFood(response);
        } else if (page === 'ingredientes-bebidas') {
          setAPIIngredientsDrink(response);
        }
        setAPIResponse(response);
      });
  }

  async function setFilterByIngredient(ingredient, foodOrDrink) {
    console.log(ingredient, foodOrDrink);

    if (foodOrDrink === 'comidas' && APIFood) {
      await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${
        ingredient.toLowerCase()}`)
        .then((response) => response.json())
        .then((response) => {
          setFoodsByIngredient(response);
        });
    }

    if (APIDrink) {
      await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then((response) => response.json())
        .then((response) => {
          setDrinksByIngredient(response);
        });
    }
  }

  return (
    <ReceitasContext.Provider
      value={ {
        email,
        APIresponse,
        setAPIResponse,
        setEmail,
        fetchApi,
        password,
        setPassword,
        filter,
        setFilter,
        selected,
        setSelected,
        canRender,
        setCanRender,
        APIFood,
        setAPIFood,
        APIDrink,
        setAPIDrink,
        filterValue,
        setFilterValue,
        APIIngredientsFood,
        APIIngredientsDrink,
        drinksByIngredient,
        foodsByIngredient,
        setFilterByIngredient,
      } }
    >
      {children}
    </ReceitasContext.Provider>
  );
}

ReceitasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReceitasProvider;
