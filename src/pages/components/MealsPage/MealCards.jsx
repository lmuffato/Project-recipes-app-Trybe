import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { arrayOf, func, object } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getMeals, getMealsByIgredient } from '../../../actions/meals';

function MealCards() {
  const size = 12;
  const search = useSelector((state) => state.meals.search);
  const loading = useSelector((state) => state.meals.loading);
  const ingredient = useSelector((state) => state.meals.ingredient);
  const meals = useSelector((state) => state.meals.meals);
  const filter = useSelector((state) => state.meals.ingredient);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!search) dispatch(getMeals(filter));
    else dispatch(getMealsByIgredient(ingredient));
  }, []); // eslint-disable-line

  return (
    <div>
      { loading ? null
        : meals.slice(0, size).map(({ idMeal, strMeal, strMealThumb }, index) => (
          <div key={ strMeal } data-testid={ `${index}-recipe-card` }>
            <Link to={ `/comidas/${idMeal}` }>
              <h2 data-testid={ `${index}-card-name` }>{strMeal}</h2>
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
            </Link>
          </div>
        )) }
    </div>
  );
}

MealCards.propTypes = {
  meals: arrayOf(object),
  fetchMeals: func,
}.isRequired;

export default MealCards;
