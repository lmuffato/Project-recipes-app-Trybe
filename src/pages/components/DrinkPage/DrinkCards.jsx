import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { arrayOf, func, object } from 'prop-types';
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
      { drinks.slice(0, size).map(({ idDrink, strDrink, strDrinkThumb }, index) => (
        <Link key={ strDrink } to={ `/bebidas/${idDrink}` }>
          <div data-testid={ `${index}-recipe-card` }>
            <h2 data-testid={ `${index}-card-name` }>{strDrink}</h2>
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
            />
          </div>
        </Link>
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
