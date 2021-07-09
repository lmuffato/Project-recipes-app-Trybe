import React, { /* useEffect, */ useState } from 'react';
import DoneRecipeCard from '../components/DoneRecipes/DoneRecipeCard';

import Header from '../components/Header';

function ReceitasFeitas() {
  const [doneRecipes/* setDoneRecipes */] = useState([
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState('todos');

  /*   useEffect(() => {
    setDoneRecipes(
      JSON.parse(localStorage.getItem('favoriteRecipes')),
    );
  }, []);
 */
  function changeSelectedCategory({ target: { name } }) {
    setSelectedCategory(name);
  }
  function byCategory(recipe) {
    if (selectedCategory === 'todos') return true;
    return recipe.type === selectedCategory;
  }

  return (
    <section>
      <Header title="Receitas Feitas" show={ false } />
      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name="todos"
          onClick={ changeSelectedCategory }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          name="comida"
          onClick={ changeSelectedCategory }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          name="bebida"
          onClick={ changeSelectedCategory }
        >
          Drinks
        </button>
      </section>
      { doneRecipes
    && doneRecipes
      .filter(byCategory)
      .map((recipe, index) => (
        <DoneRecipeCard
          index={ index }
          key={ `${recipe.type}-${recipe.id}` }
          { ...recipe }
        />
      )) }
    </section>
  );
}

export default ReceitasFeitas;
