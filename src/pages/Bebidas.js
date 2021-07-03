import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useStateEasyRedux } from 'easy-redux-trybe';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

export default function Bebidas(props) {
  const { match: { params, path } } = props;
  const { id } = params;

  const [, setStateRedux] = useStateEasyRedux({ name: 'Search' }, {});

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const results = data.drinks;
      const INDEX_END = 12;
      const resultsTwelveItems = results.slice(0, INDEX_END);
      setStateRedux({ resultsTwelveItems });
    };
    fetchApi();
  }, []);

  const resultsTwelveItems = useSelector((state) => (
    state.Search ? state.Search.resultsTwelveItems : undefined));
  if (resultsTwelveItems && resultsTwelveItems.length === 1) {
    const { idDrink } = resultsTwelveItems[0];
    return <Redirect to={ `bebidas/${idDrink}` } />;
  }
  return (
    <div>
      <Header title="Bebidas" showButton showHeader={ !!id } { ...{ path } } />
      <main className="card-painel">
        {resultsTwelveItems && resultsTwelveItems.map(
          (el, index) => (
            <div
              className="card-meal-drink"
              key={ el.idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ el.strDrinkThumb }
                alt="Drink"
                width="50px"
                data-testid={ `${index}-card-img` }
              />
              <p
                className="card-name"
                data-testid={ `${index}-card-name` }
              >
                { el.strDrink }
              </p>
            </div>
          ),
        )}
      </main>
    </div>
  );
}

Bebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    path: PropTypes.string,
  }).isRequired,
};
