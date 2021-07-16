import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Ingredientes from './EmProgressPage/Ingredientes';
import Loading from './Loading';
import FavoriteFood from './FavoriteFood';
import '../App.css';

function EmProgresso({ props }) {
  const [data, setData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  const magicNumber = 0;
  const history = useHistory();

  const setLocalDoneRecipes = () => {
    if (JSON.parse(localStorage.getItem('doneRecipes') === null)) {
      const arrayRecipes = [];
      localStorage.setItem('doneRecipes', JSON.stringify(arrayRecipes));
    }
  };

  useEffect(() => {
    const fetchData = () => {
      setData(props[magicNumber]);
    };

    setLocalDoneRecipes();
    fetchData();
  }, [props]);

  if (!data) {
    return history.location.pathname.includes('comidas')
      ? (
        <div className="d-flex w-100 min-vh-100 align-items-center">
          <Loading param="food" />
        </div>
      )
      : (
        <div className="d-flex w-100 min-vh-100 align-items-center">
          <Loading param="drink" />
        </div>
      );
  }

  const ingredientsList = Object.entries(data)
    .filter((item) => item[0].includes('Ingredient'))
    .filter((element) => element[1] !== '' && element[1] !== null);

  const obj = { ingredientsList, data, setIsDisabled, isDisabled };

  const updateLocalStorage = () => {
    const initalLocalStorage = {
      cocktails: [],
      meals: [],
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(initalLocalStorage));
  };

  const finishRecipe = () => {
    console.log(data);
    if (history.location.pathname.includes('bebidas')) {
      const favoriteRecipe = {
        id: data.idDrink,
        type: 'bebida',
        area: '',
        category: data.strCategory,
        alcoholicOrNot: data.strAlcoholic,
        name: data.strDrink,
        image: data.strDrinkThumb,
        doneDate: Date.parse(),
        tags: data.strTags === null ? '' : data.strTags.split(','),
      };

      const localRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

      const recipesFinished = localRecipes.concat(favoriteRecipe);

      localStorage.setItem('doneRecipes', JSON.stringify(recipesFinished));
      updateLocalStorage();
      return history.push('/receitas-feitas');
    }
    const favoriteRecipe = {
      id: data.idMeal,
      type: 'comida',
      area: data.strArea,
      category: data.strCategory,
      alcoholicOrNot: '',
      name: data.strMeal,
      image: data.strMealThumb,
      doneDate: Date.parse(),
      tags: data.strTags === null ? '' : data.strTags.split(','),
    };

    const localRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    const recipesFinished = localRecipes.concat(favoriteRecipe);

    console.log('Estou aqui testando', localRecipes);

    localStorage.setItem('doneRecipes', JSON.stringify(recipesFinished));
    updateLocalStorage();
    return history.push('/receitas-feitas');
  };

  return (
    <div className="m-1 pb-4">
      <div className="d-flex flex-column">
        <img
          data-testid="recipe-photo"
          src={ data.strMealThumb || data.strDrinkThumb }
          alt="meals-img"
          width="350px"
          height="auto"
        />
        <div className="py-4">
          <h2 data-testid="recipe-title">{ data.strMeal || data.strDrink }</h2>
        </div>
        <div className="pb-4">
          <FavoriteFood params={ obj } />
        </div>
        <div className="py-2">
          <h3 data-testid="recipe-category">{ data.strCategory }</h3>
        </div>

        <Ingredientes params={ obj } />

        <div className="py-2">
          <h4>Instruções</h4>
        </div>
        <p
          data-testid="instructions"
          className="text-justify"
        >
          { data.strInstructions }
        </p>
        <div className="align-self-center w-50">
          <button
            type="button"
            className="w-100 py-3"
            data-testid="finish-recipe-btn"
            onClick={ finishRecipe }
            disabled={ isDisabled }
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}

EmProgresso.propTypes = {
  props: object,
}.isRequired;

export default EmProgresso;
