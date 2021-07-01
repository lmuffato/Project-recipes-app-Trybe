import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import recipesContext from '../../context/RecipesContext';
import './styles.css';

function RecipeCard() {
  const { recipes } = useContext(recipesContext);
  const { pathname } = useLocation();

  const toggle = (pathname.includes('comidas')) ? 'meals' : 'drinks';
  const toggleApiReturn = (pathname.includes('comidas')) ? 'strMeal' : 'strDrink';
  const recipesArray = recipes[toggle].results;

  return (
    <div className="recipe-cards-parent">
      { recipesArray.map((recipe, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ `recipe-card-${index}` }>
          <img
            src={ recipe[`${toggleApiReturn}Thumb`] }
            alt={ recipe[toggleApiReturn] }
            data-testid={ `${index}-card-img` }
          />
          <span data-testid={ `${index}-card-name` }>
            { recipe[toggleApiReturn]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default RecipeCard;
