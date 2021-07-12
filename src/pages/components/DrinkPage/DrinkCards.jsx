import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { arrayOf, func, object } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getDrinks, getDrinksByIgredient } from '../../../actions/drinks';

function DrinkCards() {
  const size = 12;
  const search = useSelector((state) => state.drinks.search);
  const loading = useSelector((state) => state.drinks.loading);
  const ingredient = useSelector((state) => state.drinks.ingredient);
  const drinks = useSelector((state) => state.drinks.drinks);
  const filter = useSelector((state) => state.drinks.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!search) dispatch(getDrinks(filter));
    else dispatch(getDrinksByIgredient(ingredient));
  }, [filter]); // eslint-disable-line

  return (
    <div>
      { loading ? null
        : drinks.slice(0, size).map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <div key={ strDrink } data-testid={ `${index}-recipe-card` }>
            <Link to={ `/bebidas/${idDrink}` }>
              <h2 data-testid={ `${index}-card-name` }>{strDrink}</h2>
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
                className="main-page-card-img"
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

export default DrinkCards;
