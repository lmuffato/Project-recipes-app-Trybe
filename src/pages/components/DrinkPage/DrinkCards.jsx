import { arrayOf, func, object } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDrinks } from '../../../actions/drinks';

function DrinkCards(props) {
  const { fetchDrinks, drinks, filter } = props;
  const size = 12;

  useEffect(() => {
    fetchDrinks(filter);
  }, [fetchDrinks, filter]);

  return (
    <div>
      { drinks.slice(0, size).map(({ strDrink, strDrinkThumb }, index) => (
        <div key={ strDrink } data-testid={ `${index}-recipe-card` }>
          <h2 data-testid={ `${index}-card-name` }>{strDrink}</h2>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            data-testid={ `${index}-card-img` }
          />
        </div>
      )) }
    </div>
  );
}

DrinkCards.propTypes = {
  drinks: arrayOf(object),
  fetchMeals: func,
}.isRequired;

const mapStateToProps = (state) => ({
  drinks: state.drinks.drinks,
  filter: state.drinks.filter,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDrinks: (filter) => dispatch(getDrinks(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkCards);
