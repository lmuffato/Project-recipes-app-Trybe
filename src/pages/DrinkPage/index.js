import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../../context/RecipeContext';
import {
  getCategoriesDrinks,
  initialDrinks, drinksByCategory } from '../../services/apiRequests';

import SearchBar from '../../components/SearchBar';
import RecipeCardDrink from '../../components/RecipeCardDrink';
import CategoriesButtons from '../../components/CategoriesButtons';

function DrinkPage() {
  document.title = 'Bebidas';
  const { recipes, setRecipes } = useContext(RecipeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [choosedCategory, toggleCategory] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getCategoriesDrinks(setCategories);
    initialDrinks(setRecipes);
    setIsLoading(false);
  }, [setRecipes]);
  useEffect(() => {
    if (choosedCategory) {
      setIsLoading(true);
      drinksByCategory(setRecipes, choosedCategory);
    }
    setIsLoading(false);
  }, [choosedCategory, setRecipes]);
  if (isLoading) {
    console.log('loading...');
    return <p>Loading...</p>;
  }
  const maxLength = 11;
  return (
    <section>
      <SearchBar />
      { categories
        && <CategoriesButtons
          categories={ categories }
          toggleCategory={ toggleCategory }
        /> }
      <ul>
        { !isLoading && recipes
          .filter((_, index) => index <= maxLength)
          .map((drink, index) => (
            <RecipeCardDrink
              key={ drink.idDrink }
              drink={ drink }
              index={ index }
            />
          ))}
      </ul>
    </section>
  );
}

export default DrinkPage;
