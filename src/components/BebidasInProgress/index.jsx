import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';
import getIngredientsWithNumber from '../../services/getIngredientsWithNumber';
import getIngredients from '../../services/getIngredients';

const setDoneRecipes = (recipe) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipes) {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...doneRecipes, recipe]),
    );
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe]));
  }
};

function DrinksInProgress({ data: recipe }) {
  const { id } = useParams();
  const [checkedIngredients, setChecked] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const ingredients = getIngredients(recipe, 'strIngredient');

  useEffect(() => {
    const updateChecked = () => {
      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (storage) {
        const cocktail = storage.cocktails[id];
        if (cocktail) {
          const newArr = [];
          cocktail.forEach((item) => newArr.push(recipe[`strIngredient${item}`]));
          setChecked(newArr);
        } else {
          storage.cocktails[id] = [];
          localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
        }
      } else {
        const obj = {
          cocktails: {},
          meals: {},
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
      }
    };
    updateChecked();
  }, [recipe, id]);

  useEffect(() => {
    const updateLocalStorage = () => {
      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const numberIngredients = getIngredientsWithNumber(recipe);
      const newArr = checkedIngredients.map(
        (element) => numberIngredients[element],
      );
      storage.cocktails[id] = newArr;
      localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
    };
    updateLocalStorage();
  }, [checkedIngredients, id, recipe]);

  const handdleButton = () => {
    const {
      strDrink: name,
      strArea: area,
      strTags,
      strCategory: category,
      strDrinkThumb: image,
      strAlcoholic: alcoholicOrNot,
    } = recipe;
    const type = 'bebida';
    const tags = strTags.split(',').slice(0, 2);
    const doneDate = new Date();
    setDoneRecipes({
      id,
      name,
      area,
      tags,
      category,
      doneDate,
      type,
      image,
      alcoholicOrNot,
    });
    setRedirect(true);
  };

  const handleCheked = ({ target }) => {
    if (checkedIngredients.includes(target.name)) {
      const filtered = checkedIngredients.filter(
        (element) => element !== target.name,
      );
      setChecked(filtered);
    } else {
      const newArr = [...checkedIngredients, target.name];
      setChecked(newArr);
    }
  };

  return (
    <div>
      <div className="top-recipe-details" id={ recipe.strDrink }>
        <img
          src={ recipe.strDrinkThumb }
          alt="thumb"
          data-testid="recipe-photo"
          width="200px"
        />
        <div className="recipes-buttons-actions">
          <ShareButton urlCopied={ `http://localhost:3000/bebidas/${id}` } />
          <FavoriteButton data={ recipe } path={ id } />
        </div>
      </div>
      <div className="recipe-title">
        <h3 data-testid="recipe-title">{recipe.strDrink}</h3>
        <p data-testid="recipe-category">{recipe.strCategory}</p>
      </div>
      <div className="recipe-ingredients-container">
        {Object.values(ingredients).map((element, index) => (
          <label
            key={ index }
            htmlFor={ `${index}-${element}` }
            data-testid={ `data-testid=${index}-ingredient-step` }
          >
            <input
              data-testid={ `${index}-ingredient-step` }
              type="checkbox"
              id={ `${index}-${element}` }
              name={ element }
              onChange={ handleCheked }
              checked={ checkedIngredients.includes(element) }
            />
            {element}
          </label>
        ))}
      </div>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handdleButton }
        disabled={ checkedIngredients.length < Object.values(ingredients).length }
      >
        Finalizar Receita!
      </button>
      {redirect ? <Redirect to="/receitas-feitas" /> : null}
    </div>
  );
}

DrinksInProgress.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DrinksInProgress;
