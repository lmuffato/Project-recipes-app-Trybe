import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../../context/RecipeContext';
import {
  getCategoriesDrinks,
  initialDrinks, drinksByCategory } from '../../services/apiRequests';

import Header from '../../components/Header';
import FooterMenu from '../../components/footerMenu';
import RecipeCardDrink from '../../components/RecipeCardDrink';
import CategoriesButtons from '../../components/CategoriesButtons';

function DrinkPage() {
  document.title = 'Bebidas';
  const { recipes, setRecipes, redirect } = useContext(RecipeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [choosedCategory, toggleCategory] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCategoriesDrinks(setCategories);
    if (redirect !== 'from-explore') {
      initialDrinks(setRecipes);
    }
    setIsLoading(false);
  }, [redirect, setRecipes]);
  useEffect(() => {
    if (choosedCategory) {
      setIsLoading(true);
      drinksByCategory(setRecipes, choosedCategory);
    } else if (choosedCategory === '') {
      setIsLoading(true);
      initialDrinks(setRecipes);
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
      <Header searchBar="true" type="drink" />
      { categories
        && <CategoriesButtons
          categories={ categories }
          toggleCategory={ toggleCategory }
        /> }
      { !isLoading && recipes
        .filter((_, index) => index <= maxLength)
        .map((drink, index) => (
          <RecipeCardDrink
            key={ drink.idDrink }
            drink={ drink }
            index={ index }
          />
        ))}
      <FooterMenu />
      { redirect }
    </section>
  );
}

export default DrinkPage;
