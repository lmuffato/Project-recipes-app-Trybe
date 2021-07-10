import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import RecipesContext from '../contexts/RecipesContext';
import checkPath from '../services/checkPath';
// import DrinkCards from './DrinkCards';
// import FilteredCard from './FilteredCard';
// import MealCards from './MealCards';

function SearchBar() {
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [letter, setLetter] = useState('');
  const {
    mealOrDrink, setMealOrDrink, setSearchedRecipes, setIdMeal, setIdDrink, /* recipes, */
  } = useContext(RecipesContext);

  const history = useHistory();

  const handleChange = (type, word) => {
    setRequest(type);
    setLetter(word);
  };

  const recipesFilter = (results) => {
    const data = results;
    const maxRecipes = 12;
    let drinkId;
    let mealId;

    if (data.meals === null || data.drinks === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (mealOrDrink === 'cocktail' && data.drinks.length === 1) {
      drinkId = data.drinks[0].idDrink;
      setIdDrink(drinkId);
      history.push(`/bebidas/${drinkId}`);
    } else if (mealOrDrink === 'meal' && data.meals.length === 1) {
      mealId = data.meals[0].idMeal;
      setIdMeal(mealId);
      history.push(`/comidas/${mealId}`);
    } else {
      console.log(data);
      setSearchedRecipes(Object.values(data)[0].slice(0, maxRecipes));
    }
  };

  checkPath(history, setMealOrDrink);

  const getData = async () => {
    if (!letter && !name) {
      global.alert('Nenhum filtro definido');
    }
    if (letter === 'f' && name.length < 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (mealOrDrink) {
      console.log('aqui');
      const endpoint = `https://www.the${mealOrDrink}db.com/api/json/v1/1/${request}.php?${letter}=${name}`;
      await fetch(endpoint).then((data) => data.json())
        .then((results) => recipesFilter(results));
    }
  };

  const getInputs = () => (
    <div>
      <label htmlFor="search-input">
        <input
          type="text"
          data-testid="search-input"
          onChange={ (e) => setName(e.target.value) }
        />
      </label>
      <label htmlFor="filterType">
        Ingrediente
        <input
          type="radio"
          name="filterType"
          onChange={ () => handleChange('filter', 'i') }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="filterType">
        Nome
        <input
          type="radio"
          name="filterType"
          onChange={ () => handleChange('search', 's') }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="filterType">
        Primeira letra
        <input
          type="radio"
          name="filterType"
          onChange={ () => handleChange('search', 'f') }
          data-testid="first-letter-search-radio"
        />
      </label>
    </div>
  );

  const getButton = () => (
    <div>
      <button
        type="button"
        onClick={ () => getData() }
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );

  // const getIngredientsFiltered = () => (
  //   mealOrDrink === 'meal' ? recipes.map((recipe, index) => (
  //     // <FilteredCard
  //     //   key={ meal.idMeal }
  //     //   index={ index }
  //     //   name={ meal.strMeal }
  //     //   thumbnail={ meal.strMealThumb }
  //     // />
  //     <MealCards
  //       data={ recipe }
  //       index={ index }
  //       key={ recipe.idMeal }
  //     />
  //   ))
  //     : recipes.map((recipe, index) => (
  //       // <FilteredCard
  //       //   key={ drink.idDrink }
  //       //   index={ index }
  //       //   name={ drink.strDrink }
  //       //   thumbnail={ drink.strDrinkThumb }
  //       // />
  //       <DrinkCards
  //         data={ recipe }
  //         index={ index }
  //         key={ recipe.idDrink }
  //       />
  //     ))
  // );

  return (
    <>
      { getInputs() }
      { getButton() }
      {/* { getIngredientsFiltered() } */}
    </>
  );
}

export default SearchBar;
