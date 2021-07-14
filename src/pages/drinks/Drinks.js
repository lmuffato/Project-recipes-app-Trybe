import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useStateEasyRedux } from 'easy-redux-trybe';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import Cards from '../../components/Cards';
import FilterButtons from '../../components/FilterButtons';
import Footer from '../../components/Footer';

import styles from '../../styles/MainPages.module.scss';

export default function Drinks(props) {
  const { match: { params, path } } = props;
  const { id } = params;

  const [stateRedux, setStateRedux] = useStateEasyRedux({ name: 'Search' }, {});

  useEffect(() => {
    if (!(stateRedux && stateRedux.actionType === 'FETCH_INGREDIENT_COMPLETED')) {
      const fetchApi = async () => {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        const results = data.drinks;
        const INDEX_END = 12;
        const resultsTwelveItems = results.slice(0, INDEX_END);
        setStateRedux({ resultsTwelveItems });
      };
      fetchApi();
    }
    // eslint-disable-next-line
  }, []);

  const resultsTwelveItems = useSelector((state) => (
    state.Search ? state.Search.resultsTwelveItems : undefined));
  if (resultsTwelveItems && resultsTwelveItems.length === 1) {
    const { idDrink } = resultsTwelveItems[0];
    return <Redirect to={ `bebidas/${idDrink}` } />;
  }
  return (
    <div className={ styles.container }>
      <Header title="Bebidas" showButton showHeader={ !!id } { ...{ path } } />
      <FilterButtons { ...{ path, resultsTwelveItems } } />
      <main className={ styles.cardsArea }>
        {resultsTwelveItems && resultsTwelveItems.map(
          (el, index) => (<Cards
            key={ el.idDrink }
            { ...{ path, el, index } }
          />
          ),
        )}
      </main>
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    path: PropTypes.string,
  }).isRequired,
};
