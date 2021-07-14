import React, { useContext } from 'react';
import ContextRecipes from '../context/ContextRecipes';
import '../styleSheets/NavegateButtons.css';

function NavegateButtons() {
  const { setFilter } = useContext(ContextRecipes);
  return (
    <nav>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        className="button-navegation"
        onClick={ () => setFilter('All') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        className="button-navegation"
        onClick={ () => setFilter('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        className="button-navegation"
        onClick={ () => setFilter('bebida') }
      >
        Drinks
      </button>
    </nav>
  );
}

export default NavegateButtons;
