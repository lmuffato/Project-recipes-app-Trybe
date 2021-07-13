import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import MealCard from '../components/MealCard';
import SearchContext from '../context/SearchContext';
import Footer from '../components/Footer';
import FilterButtons from '../components/FilterButtons';
import FilterContext from '../context/FilterContext';
import ButtonAll from '../components/ButtonAll';
import UserContext from '../context/UserContext';

function Foods() {
  const { setGlobalRecipe } = useContext(UserContext);
  const { filteredRecipes, fullRecipes } = useContext(SearchContext);
  const { mealsCategories, filterButton, mealsByCategory,
    setFilterButton } = useContext(FilterContext);
  const CARDS_NUMBER = 11;
  const CATEGORIES_NUMBER = 5;
  const [showRecipe, setShowRecipe] = useState([]);

  useEffect(() => {
    if (filterButton !== '') {
      setShowRecipe(mealsByCategory);
    } else if (!filteredRecipes || filteredRecipes.length > 0) {
      setShowRecipe(filteredRecipes);
    } else { setShowRecipe(fullRecipes); }
  }, [fullRecipes, filteredRecipes, mealsByCategory]);

  useEffect(() => {
    setGlobalRecipe(showRecipe);
  }, [showRecipe]);

  return (
    <div className="mainFoodsAndDrinks">
      <Header title="Comidas" searchImg="true" />
      <div className="headerFilterButtons">
        {mealsCategories.map((category, index) => (
          index < CATEGORIES_NUMBER ? (
            <FilterButtons
              key={ index }
              categoryName={ category.strCategory }
              testId={ `${category.strCategory}-category-filter` }
            />
          ) : (null)
        ))}
        <ButtonAll setFiltered={ setFilterButton } />
      </div>
      <div className="itensGroup">
        {showRecipe ? showRecipe.map((recipes, index) => (
          index <= CARDS_NUMBER ? (
            <MealCard
              key={ recipes.idMeal }
              mealName={ recipes.strMeal }
              mealImg={ recipes.strMealThumb }
              testImgId={ `${index}-card-img` }
              testNameId={ `${index}-card-name` }
              testCardId={ `${index}-recipe-card` }
              mealId={ recipes.idMeal }
            />
          ) : null
        )) : alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')}
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
