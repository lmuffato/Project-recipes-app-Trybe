import React, { useContext } from 'react';
import Header from '../components/Header';
import UserContext from '../context/UserContext';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const { doneRecipes } = useContext(UserContext);
  return (
    <div>
      <Header title="Receitas Feitas" />
      <div className="categoriesBTNRecipesDone">
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      {doneRecipes.map((recipe, index) => (
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
        />
      ))}
    </div>
  );
}

export default DoneRecipes;
