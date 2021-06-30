import { arrayOf, func, object } from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getDrinks } from '../../../actions/drinks';

function DrinkCards(props) {
  const { fetchDrinks, drinks } = props;
  const size = 12;
  console.log(drinks);

  useState(() => {
    fetchDrinks();
  }, []);

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
});

const mapDispatchToProps = (dispatch) => ({
  fetchDrinks: () => dispatch(getDrinks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkCards);
