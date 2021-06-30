import { arrayOf, func, object } from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getMeals } from '../../../actions/meals';

function MealCards(props) {
  const { fetchMeals, meals } = props;
  const size = 12;
  console.log(meals);

  useState(() => {
    fetchMeals();
  }, []);

  return (
    <div>
      { meals.slice(0, size).map(({ strMeal, strMealThumb }, index) => (
        <div key={ strMeal } data-testid={ `${index}-recipe-card` }>
          <h2 data-testid={ `${index}-card-name` }>{strMeal}</h2>
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid={ `${index}-card-img` }
          />
        </div>
      )) }
    </div>
  );
}

MealCards.propTypes = {
  meal: arrayOf(object),
  fetchMeals: func,
}.isRequired;

const mapStateToProps = (state) => ({
  meals: state.meals.meals,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMeals: () => dispatch(getMeals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MealCards);
