import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { arrayOf, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { getDrinks } from '../../../actions/drinks';

function DrinkCards(props) {
  const { fetchDrinks, drinks, filter } = props;
  const [mountComponent, finishMounting] = useState(true);
  const size = 12;

  useEffect(() => {
    const firstFetch = async () => {
      await fetchDrinks(filter);
      finishMounting(false);
    };
    firstFetch();
  }, [fetchDrinks, filter]);

  useEffect(() => {
    if (drinks.length === 0 && !mountComponent) alert('Sinto muito, não encontramos nenhuma receita para esses filtros.') // eslint-disable-line
  }, [drinks, mountComponent]);

  return (
    <div>
      { drinks.length === 1 ? <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />
        : drinks.slice(0, size).map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <div key={ strDrink } data-testid={ `${index}-recipe-card` }>
            <Link to={ `/bebidas/${idDrink}` }>
              <h2 data-testid={ `${index}-card-name` }>{strDrink}</h2>
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
              />
            </Link>
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
