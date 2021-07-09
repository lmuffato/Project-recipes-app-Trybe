import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import UserContext from '../context/UserContext';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const { doneRecipes } = useContext(UserContext);
  const [filterButton, setFilterButton] = useState('all');
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);

  useEffect(() => {
    if (filterButton !== 'all') {
      setFilteredRecipes(doneRecipes.filter((recipe) => recipe.type === filterButton));
    } else { setFilteredRecipes(doneRecipes); }
  }, [filterButton]);

  return (
    <div>
      <Header title="Receitas Feitas" />
      <div className="categoriesBTNRecipesDone">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterButton('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilterButton('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterButton('bebida') }
        >
          Drinks
        </button>
      </div>
      {filteredRecipes.map((recipe, index) => (
        <DoneRecipeCard
          key={ index }
          imgSrc={ recipe.image }
          imgId={ `${index}-horizontal-image` }
          category={ recipe.category }
          categoryId={ `${index}-horizontal-top-text` }
          nameId={ `${index}-horizontal-name` }
          mealName={ recipe.name }
          dateId={ `${index}-horizontal-done-date` }
          doneDate={ recipe.doneDate }
          tag={ recipe.tags }
          indexTag={ index }
          shareId={ `${index}-horizontal-share-btn` }
          area={ recipe.area }
          alcoholic={ recipe.alcoholicOrNot }
          recipeId={ recipe.id }
          type={ recipe.type }
        />
      ))}
    </div>
  );
}

export default DoneRecipes;
