import React, { useContext } from 'react';
import FavoriteCards from '../components/FavoriteCards';
import Header from '../components/Header';
import FavoritesContext from '../context/FavoritesContext';

export default function FavoriteRecipes() {
  const { renderAll,
    setRenderAll,
    renderMeals,
    setRenderMeals,
    renderDrinks,
    setRenderDrinks } = useContext(FavoritesContext);

  const handleAllClick = () => {
    if (!renderAll) {
      setRenderAll(true);
      setRenderDrinks(false);
      setRenderMeals(false);
    }
  };

  const handleFoodClick = () => {
    if (!renderMeals) {
      setRenderMeals(true);
      setRenderAll(false);
      setRenderDrinks(false);
    }
  };

  const handleDrinksClick = () => {
    if (!renderDrinks) {
      setRenderDrinks(true);
      setRenderAll(false);
      setRenderMeals(false);
    }
  };

  return (
    <div>
      <Header className="header">
        <h1 data-testid="page-title">Receitas Favoritas</h1>
      </Header>
      <div className="doneRecipesButtonsDiv">
        <button
          type="button"
          className="doneRecipesButtons"
          data-testid="filter-by-all-btn"
          onClick={ handleAllClick }
        >
          All
        </button>
        <button
          type="button"
          className="doneRecipesButtons"
          data-testid="filter-by-food-btn"
          onClick={ handleFoodClick }
        >
          Food
        </button>
        <button
          type="button"
          className="doneRecipesButtons"
          data-testid="filter-by-drink-btn"
          onClick={ handleDrinksClick }
        >
          Drinks
        </button>
      </div>
      <FavoriteCards />
    </div>
  );
}
