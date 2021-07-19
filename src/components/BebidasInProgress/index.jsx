import React, { useState, useEffect } from 'react';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// import getIngredients from '../../services/getIngredients';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';
import getIngredientsWithNumber from '../../services/getIngredientsWithNumber';

function DrinksInProgress({ data }) {
  const { state: { ingredients } } = useLocation();
  // const ingredients = getIngredients(data, 'strIngredient').map((e) => e[1]);
  const { id } = useParams();
  const [keys, setKeys] = useState([]);
  const [checkedIngredients, setChecked] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    function saveState() {
      const { strDrinkThumb, strDrink, strCategory } = data;
      const obj = [{
        image: strDrinkThumb,
        title: strDrink,
        category: strCategory,
      }];
      setKeys(obj);
    }
    saveState();
    const updateChecked = () => {
      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (storage) {
        const cocktail = storage.cocktails[id];
        if (cocktail) {
          const newArr = [];
          cocktail.forEach((item) => newArr.push(data[`strIngredient${item}`]));
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
  }, [data, id]);

  useEffect(() => {
    const updateLocalStorage = () => {
      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const numberIngredients = getIngredientsWithNumber(data);
      const newArr = checkedIngredients.map((element) => numberIngredients[element]);
      storage.cocktails[id] = newArr;
      localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
    };
    updateLocalStorage();
  }, [checkedIngredients, id, data]);

  const handdleButton = () => {
    setRedirect(true);
  };

  const handleCheked = ({ target }) => {
    if (checkedIngredients.includes(target.name)) {
      const filtered = checkedIngredients.filter((element) => element !== target.name);
      setChecked(filtered);
    } else {
      const newArr = [...checkedIngredients, target.name];
      setChecked(newArr);
    }
  };

  if (keys.length > 0) {
    return (
      <div>
        <img src={ keys[0].image } alt="thumb" data-testid="recipe-photo" width="200px" />
        <h3 data-testid="recipe-title">{ keys[0].title }</h3>
        <ShareButton urlCopied={ `http://localhost:3000/bebidas/${id}` } />
        <FavoriteButton data={ data } path={ id } />
        <p data-testid="recipe-category">{ keys[0].category }</p>
        <ul>
          { Object.values(ingredients).map((element, index) => (
            <li
              key={ element }
              data-testid={ `data-testid=${index}-ingredient-step` }
            >
              <label htmlFor={ `${index}-${element}` }>
                { element }
                <input
                  data-testid={ `${index}-ingredient-step` }
                  type="checkbox"
                  id={ `${index}-${element}` }
                  name={ element }
                  onChange={ handleCheked }
                  checked={ checkedIngredients.includes(element) }
                />
              </label>
            </li>)) }
        </ul>
        <p data-testid="instructions">{ data.strInstructions }</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ handdleButton }
          disabled={ checkedIngredients.length < ingredients.length }
        >
          Finalizar Receita!
        </button>
        {redirect ? <Redirect to="/receitas-feitas" /> : null}
      </div>
    );
  }

  return (
    <div>
      { null }
    </div>
  );
}

DrinksInProgress.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DrinksInProgress;
