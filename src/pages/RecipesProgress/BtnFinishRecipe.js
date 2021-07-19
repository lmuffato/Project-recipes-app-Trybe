import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
// import { Container } from './styles';

export default function BtnFinishRecipe() {
  const { context } = useContext(AppContext);
  const [doneRecipe, setDoneRecipe] = useState('');
  const { checkedState, recipe, pageOrigin } = context;
  const key = 'doneRecipes';

  useEffect(() => {
    const data = new Date();
    const day = data.getDate().toString().padStart(2, '0');
    const month = (data.getMonth() + 1).toString().padStart(2, '0');
    const year = data.getFullYear();
    const doneDate = `${day}/${month}/${year}`;

    setDoneRecipe({
      id: recipe.idMeal || recipe.idDrink,
      type: pageOrigin.includes('themealdb') ? 'comida' : 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      doneDate,
      tags: [recipe.strTags] || [],
    });
  }, [recipe]);

  function updateDoneStorage() {
    const doneStorage = JSON.parse(localStorage.getItem(key));
    if (doneStorage) {
      const newListDoneRecipes = [
        ...doneStorage,
        doneRecipe,
      ];
      localStorage.setItem(key, JSON.stringify(newListDoneRecipes));
    } else {
      localStorage.setItem(key, JSON.stringify([doneRecipe]));
    }
  }

  return (
    <Link to="/receitas-feitas">
      <button
        className="finish-recipe"
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ checkedState }
        onClick={ updateDoneStorage }

      >

        Finalizar Receita

      </button>
    </Link>

  );
}
