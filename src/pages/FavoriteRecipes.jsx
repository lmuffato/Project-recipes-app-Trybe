import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import UserContext from '../context/UserContext';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

function FavoriteRecipes() {
  const { favoriteRecipe } = useContext(UserContext);
  const [filterButton, setFilterButton] = useState('all');
  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipe);

  useEffect(() => {
    if (filterButton !== 'all') {
      setFilteredRecipes(favoriteRecipe.filter((recipe) => recipe.type === filterButton));
    } else { setFilteredRecipes(favoriteRecipe); }
  }, [filterButton, favoriteRecipe]);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div className="categoriesBTNRecipesDone">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterButton('all') }
          className="filterButtons"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilterButton('comida') }
          className="filterButtons"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterButton('bebida') }
          className="filterButtons"
        >
          Drinks
        </button>
      </div>
      {filteredRecipes.map((recipe, index) => (
        <FavoriteRecipeCard
          key={ index }
          imgSrc={ recipe.image }
          imgId={ `${index}-horizontal-image` }
          category={ recipe.category }
          categoryId={ `${index}-horizontal-top-text` }
          nameId={ `${index}-horizontal-name` }
          mealName={ recipe.name }
          shareId={ `${index}-horizontal-share-btn` }
          area={ recipe.area }
          alcoholic={ recipe.alcoholicOrNot }
          recipeId={ recipe.id }
          type={ recipe.type }
          indexCard={ index }
        />
      ))}
    </div>
  );
}

export default FavoriteRecipes;
