import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { arrayOf, func, object } from 'prop-types';
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
      { meals.length === 1 ? <Redirect to={ `/comidas/${meals[0].idMeal}` } />
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

const mapStateToProps = (state) => ({
  meals: state.meals.meals,
  filter: state.meals.filter,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMeals: (filter) => dispatch(getMeals(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MealCards);
