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
    console.log(data);
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
      setSearchedRecipes(Object.values(data)[0].slice(0, maxRecipes));
    }
  };

  checkPath(history, setMealOrDrink);

  const getData = async () => {
    if (!letter && !name) {
      global.alert('Nenhum filtro definido');
    }
    if (letter === 'f' && name.length > 1) {
      console.log('O brabo tá aqui');
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (mealOrDrink) {
      console.log('aqui');
      const endpoint = `https://www.the${mealOrDrink}db.com/api/json/v1/1/${request}.php?${letter}=${name}`;
      await fetch(endpoint).then((data) => data.json())
        .then((results) => recipesFilter(results))
        .catch(() => global
          .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.'));
    }
  };

  console.log('searchbar');

  const getInputs = () => (
    <>
      <label htmlFor="search-input" className="input-text">
        <input
          type="text"
          data-testid="search-input"
          onChange={ (e) => setName(e.target.value) }
        />
      </label>
      <label htmlFor="filterType" className="radio-button">
        Ingrediente
        <input
          type="radio"
          name="filterType"
          onChange={ () => handleChange('filter', 'i') }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="filterType" className="radio-button">
        Nome
        <input
          type="radio"
          name="filterType"
          onChange={ () => handleChange('search', 's') }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="filterType" className="radio-button">
        Primeira letra
        <input
          type="radio"
          name="filterType"
          onChange={ () => handleChange('search', 'f') }
          data-testid="first-letter-search-radio"
        />
      </label>
    </>
  );

  const getButton = () => (
    // <div>
    <button
      type="button"
      onClick={ () => getData() }
      className="button search-button"
      data-testid="exec-search-btn"
    >
      Buscar
    </button>
    // </div>
  );

  return (
    <section className="search-bar">
      { getInputs() }
      { getButton() }
      {/* { getIngredientsFiltered() } */}
    </section>
  );
}

export default SearchBar;
