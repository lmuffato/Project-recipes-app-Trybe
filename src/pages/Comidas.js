import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useStateEasyRedux } from 'easy-redux-trybe';
import Header from '../components/Header';

function Comidas(props) {
  const { match: { params, path } } = props;
  const { id } = params;

  const [, setStateRedux] = useStateEasyRedux({ name: 'Search' }, {});

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const results = data.meals;
      const INDEX_END = 12;
      const resultsTwelveItems = results.slice(0, INDEX_END);
      setStateRedux({ actionType: 'FETCH_COMPLETED_DID_MOUNT', resultsTwelveItems });
    };
    fetchApi();
  }, []);

  const resultsTwelveItems = useSelector((state) => (
    state.Search ? state.Search.resultsTwelveItems : undefined));

  if (resultsTwelveItems && resultsTwelveItems.length === 1) {
    const { idMeal } = resultsTwelveItems[0];
    return <Redirect to={ `comidas/${idMeal}` } />;
  }
  return (
    <div>
      <Header title="Comidas" showButton showHeader={ !!id } { ...{ path } } />
      {`COMIDAAAAAAAAAAAAA ${!!id}`}
      <main className="card-painel">
        {resultsTwelveItems && resultsTwelveItems.map(
          (el, index) => (
            <div
              className="card-meal-drink"
              key={ el.idMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ el.strMealThumb }
                alt="Drink"
                width="100%"
                data-testid={ `${index}-card-img` }
              />
              <p
                className="card-name"
                data-testid={ `${index}-card-name` }
              >
                { el.strMeal }
              </p>
            </div>
          ),
        )}
      </main>
    </div>
  );
}

Comidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    path: PropTypes.string,
  }).isRequired,
};

export default Comidas;
