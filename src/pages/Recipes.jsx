import React, { useContext, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Categories from '../components/Categories';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import RecipesContext from '../contexts/RecipesContext';
import useRecipesFilter from '../hooks/useRecipesFilter';
import '../styles/Recipes.css';

export default function Recipes() {
  const { path } = useRouteMatch();
  const isRecipesFoods = path.includes('comidas');
  const isRecipesDrinks = path.includes('bebidas');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { categories, recipes } = useContext(RecipesContext);

  const { filterDrinksByCategory, filterFoodsByCategory } = useRecipesFilter();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (isRecipesDrinks) filterDrinksByCategory(category, selectedCategory);
    if (isRecipesFoods) filterFoodsByCategory(category, selectedCategory);
  };

  return (
    <div>
      {isRecipesFoods && <Header title="Comidas" /> }
      {isRecipesDrinks && <Header title="Bebidas" /> }

      {isRecipesFoods && <Categories
        categories={ categories.foods }
        handleCategoryClick={ handleCategoryClick }
      /> }
      {isRecipesDrinks && <Categories
        categories={ categories.drinks }
        handleCategoryClick={ handleCategoryClick }
      /> }
      <div className="card-container">
        {isRecipesFoods && <RecipesList recipes={ recipes.foods } /> }
        {isRecipesDrinks && <RecipesList recipes={ recipes.drinks } /> }
      </div>

      <BottomMenu />
    </div>
  );
}
