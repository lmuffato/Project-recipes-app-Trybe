import { arrayOf, func, object } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMeals } from '../../../actions/meals';

function MealCards(props) {
  const { fetchMeals, meals, filter } = props;
  const size = 12;

  useEffect(() => {
    fetchMeals(filter);
  }, [fetchMeals, filter]);

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
  meals: arrayOf(object),
  fetchMeals: func,
}.isRequired;

const mapStateToProps = (state) => ({
  meals: state.meals.meals,
  filter: state.meals.filter,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMeals: (filter) => dispatch(getMeals(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MealCards);
