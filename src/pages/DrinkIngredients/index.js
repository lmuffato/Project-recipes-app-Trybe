import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import FooterMenu from '../../components/footerMenu';
import IngredientCardDrinks from '../../components/IngredientCardDrinks';
import './css/DrinkIngredients.css';

import RecipeContext from '../../context/RecipeContext';
import { getDrinksIngredientList, drinksByIngredient } from '../../services/apiRequests';

export default function DrinkIngredients() {
  document.title = 'Explorar Ingredientes';
  const maxLength = 11;
  const { setRecipes, setRedirect } = useContext(RecipeContext);
  const [ingredients, setIngredients] = useState([]);
  const [exploreRedirect, setExploreRedirect] = useState(false);
  useEffect(() => {
    getDrinksIngredientList(setIngredients);
  }, []);
  const selectIngredient = async (ingredient) => {
    await drinksByIngredient(ingredient, setRecipes);
    await setRedirect('from-explore');
    setExploreRedirect(true);
  };
  return (
    <>
      <Header />
      <div className="ingredients-list">
        { ingredients.length > 0 ? ingredients
          .filter((_, index) => index <= maxLength)
          .map((ingredient, index) => (<IngredientCardDrinks
            key={ index }
            index={ index }
            ingredient={ ingredient }
            selector={ selectIngredient }
          />)) : '...loading' }
      </div>
      <FooterMenu />
      { exploreRedirect && <Redirect to="/bebidas" /> }
    </>
  );
}
