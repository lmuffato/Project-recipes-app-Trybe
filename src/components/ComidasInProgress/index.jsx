import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import getIngredients from '../../services/getIngredients';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';
import getIngredientsWithNumber from '../../services/getIngredientsWithNumber';
import fetchFoodDetails from '../../services/fetchFoodDetails';

function FoodsInProgress({ data }) {
  const [food, setFood] = useState({});
  const ingredients = getIngredients(food, 'strIngredient').map((e) => e[1]);
  const { id } = useParams();
  // const [keys, setKeys] = useState([]);
  const [checkedIngredients, setChecked] = useState([]);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    // function saveState() {
    //   const { strMealThumb, strMeal, strCategory } = data;
    //   const obj = [{
    //     image: strMealThumb,
    //     title: strMeal,
    //     category: strCategory,
    //   }];
    //   setKeys(obj);
    // }
    // saveState();
    const updateChecked = () => {
      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (storage) {
        const meal = storage.meals[id];
        if (meal) {
          const newArr = [];
          meal.forEach((item) => newArr.push(data[`strIngredient${item}`]));
          setChecked(newArr);
        } else {
          storage.meals[id] = [];
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
    const getFood = async () => {
      const { meals } = await fetchFoodDetails(id);
      setFood(meals[0]);
    };
    getFood();
  }, [data, id]);

  useEffect(() => {
    const updateLocalStorage = () => {
      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const numberIngredients = getIngredientsWithNumber(data);
      const newArr = checkedIngredients.map((element) => numberIngredients[element]);
      storage.meals[id] = newArr;
      localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
    };
    updateLocalStorage();
  }, [checkedIngredients, id, data]);

  const handleButton = () => {
    setRedirect(true);
  };

  const handleCheked = ({ target }) => {
    console.log(target);
    if (checkedIngredients.includes(target.name)) {
      const filtered = checkedIngredients.filter((element) => element !== target.name);
      setChecked(filtered);
    } else {
      const newArr = [...checkedIngredients, target.name];
      setChecked(newArr);
    }
  };
  return (
    <div>
      <h1>teste</h1>
      <img
        src={ food.strMealThumb }
        alt="thumb"
        data-testid="recipe-photo"
        width="200px"
      />
      <h3 data-testid="recipe-title">{ food.strMeal }</h3>
      <ShareButton urlCopied={ `http://localhost:3000/comidas/${id}` } />
      <FavoriteButton data={ data } path={ id } />
      <p data-testid="recipe-category">{ food.strCategory }</p>
      { ingredients.map((element, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          key={ index }
          htmlFor={ `${index}-${element}` }
        >
          { element }
          <input
            type="checkbox"
            id={ `${index}-${element}` }
            name={ element }
            onChange={ handleCheked }
            checked={ checkedIngredients.includes(element) }
          />
        </label>
      )) }
      <p data-testid="instructions">{ food.strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleButton }
        disabled={ checkedIngredients.length < ingredients.length }
      >
        Finalizar Receita!
      </button>
      { redirect ? <Redirect to="/receitas-feitas" /> : null }
    </div>
  );
}

FoodsInProgress.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FoodsInProgress;
