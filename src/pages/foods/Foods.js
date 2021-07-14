/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useStateEasyRedux } from 'easy-redux-trybe';
import Header from '../../components/Header';
import Cards from '../../components/Cards';
import FilterButtons from '../../components/FilterButtons';
import Footer from '../../components/Footer';

import styles from '../../styles/MainPages.module.scss';

function Foods(props) {
  const { match: { params, path } } = props;
  const { id } = params;

  const [stateRedux, setStateRedux] = useStateEasyRedux({ name: 'Search' }, {});

  useEffect(() => {
    if (!(stateRedux && stateRedux.actionType === 'FETCH_INGREDIENT_COMPLETED')) {
      const fetchApi = async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        const results = data.meals;
        const INDEX_END = 12;
        const resultsTwelveItems = results.slice(0, INDEX_END);
        setStateRedux({ actionType: 'FETCH_COMPLETED_DID_MOUNT', resultsTwelveItems });
      };
      fetchApi();
    }
  }, []);

  const resultsTwelveItems = useSelector((state) => (
    state.Search ? state.Search.resultsTwelveItems : undefined));

  const isLoading = useSelector((state) => (
    state.Search ? state.Search.isLoading : false));

  return (
    <div className={ styles.container }>
      <Header title="Comidas" showButton showHeader={ !!id } { ...{ path } } />
      <FilterButtons { ...{ path } } />
      <main className={ styles.cardsArea }>
        {!isLoading && resultsTwelveItems && resultsTwelveItems.map(
          (el, index) => (<Cards
            key={ el.idMeal }
            { ...{ path, el, index } }
          />
          ),
        )}
      </main>
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    path: PropTypes.string,
  }).isRequired,
};

export default Foods;
