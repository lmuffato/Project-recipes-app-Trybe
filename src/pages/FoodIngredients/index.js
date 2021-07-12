import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import FooterMenu from '../../components/footerMenu';
import IngredientCardFood from '../../components/IngredientCardFood';
import './css/FoodIngredients.css';

import RecipeContext from '../../context/RecipeContext';
import { getFoodIngredientList, foodsByIngredient } from '../../services/apiRequests';

export default function FoodIngredients() {
  document.title = 'Explorar Ingredientes';
  const maxLength = 11;
  const { setRecipes, setRedirect } = useContext(RecipeContext);
  const [ingredients, setIngredients] = useState([]);
  const [exploreRedirect, setExploreRedirect] = useState(false);
  useEffect(() => {
    getFoodIngredientList(setIngredients);
  }, []);
  const selectIngredient = async (ingredient) => {
    await foodsByIngredient(ingredient, setRecipes);
    await setRedirect('from-explore');
    setExploreRedirect(true);
  };
  return (
    <>
      <Header />
      <div className="ingredients-list">
        { ingredients.length > 0 ? ingredients
          .filter((_, index) => index <= maxLength)
          .map((ingredient, index) => {
            const { idIngredient } = ingredient;
            return (<IngredientCardFood
              key={ idIngredient }
              index={ index }
              ingredient={ ingredient }
              selector={ selectIngredient }
            />);
          }) : '...loading' }
      </div>
      <FooterMenu />
      { exploreRedirect && <Redirect to="/comidas" /> }
    </>
  );
}
