import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import getIngredients from '../../services/getIngredients';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';

function DrinksInProgress({ data }) {
  // const { state: { ingredients } } = useLocation();
  const ingredients = getIngredients(data, 'strIngredient');
  const { id } = useParams();
  const [checkedIngredients, setChecked] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const updateChecked = () => {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (inProgressRecipes) {
        const cocktail = inProgressRecipes.cocktails[id];
        if (cocktail) {
          setChecked(cocktail);
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
  }, [id]);

  useEffect(() => {
    const updateLocalStorage = () => {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        cocktails: { ...inProgressRecipes.cocktails, [id]: checkedIngredients },
      }));
    };
    updateLocalStorage();
  }, [checkedIngredients, id, data]);

  const handdleButton = () => {
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
      <div className="top-recipe-details">
        <img
          src={ data.strDrinkThumb }
          alt="thumb"
          data-testid="recipe-photo"
          width="200px"
        />
        <div className="recipes-buttons-actions">
          <ShareButton urlCopied={ `http://localhost:3000/bebidas/${id}` } />
          <FavoriteButton data={ data } path={ id } />
        </div>
      </div>
      <div className="recipe-title">
        <h3 data-testid="recipe-title">{data.strDrink}</h3>
        <p data-testid="recipe-category">{data.strCategory}</p>
      </div>
      <div className="recipe-ingredients-container">
        {Object.values(ingredients).map((element, index) => (
          <div
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            <input
              type="checkbox"
              id={ `${index}-${element}` }
              name={ element }
              onChange={ handleCheked }
              checked={ checkedIngredients.includes(element) }
            />
            {element}
          </div>
        ))}
      </div>
      <p data-testid="instructions">{data.strInstructions}</p>
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
