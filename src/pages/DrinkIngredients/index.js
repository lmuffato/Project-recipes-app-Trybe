import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import FooterMenu from '../../components/footerMenu';
import IngredientCardDrinks from '../../components/IngredientCardDrinks';
import './css/DrinkIngredients.css';

import RecipeContext from '../../context/RecipeContext';
import { getDrinksIngredientList, drinksByIngredient } from '../../services/apiRequests';

export default function DrinkIngredients() {
  const maxLength = 11;
  const { setRecipes, setRedirect } = useContext(RecipeContext);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exploreRedirect, setExploreRedirect] = useState(false);
  const startComponent = async () => {
    await getDrinksIngredientList(setIngredients);
    setLoading(false);
  };
  useEffect(() => {
    startComponent();
  });
  const selectIngredient = async (ingredient) => {
    await drinksByIngredient(ingredient, setRecipes);
    await setRedirect('from-explore');
    setExploreRedirect(true);
  };
  return (
    <>
      <Header />
      <div className="ingredients-list">
        { !loading ? ingredients
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
