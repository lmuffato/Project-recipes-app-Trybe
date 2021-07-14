import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useStateEasyRedux, useClassState } from 'easy-redux-trybe';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import styles from '../../styles/MainPages.module.scss';
import Cards from '../../components/Cards';

function FoodArea({ match: { path } }) {
  const [state, setState] = useClassState({ area: 'American' });
  const [, setStateRedux] = useStateEasyRedux({ name: 'Search' }, {});

  useEffect(() => {
    const fetchApi = async () => {
      const responseArea = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const { meals: areas } = await responseArea.json();
      setState({ areas });

      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/filter.php?a=American',
      );
      const { meals } = await response.json();
      const INDEX_END = 12;
      const resultsTwelveItems = meals.slice(0, INDEX_END);
      console.log(resultsTwelveItems);
      await setStateRedux(
        { actionType: 'FETCH_COMPLETED_DID_MOUNT', resultsTwelveItems },
      );
    };
    fetchApi();
  }, []);

  const resultsTwelveItems = useSelector((stt) => (
    stt.Search ? stt.Search.resultsTwelveItems : undefined));

  const handleAreaChange = ({ target: { name, value } }) => {
    setState({
      [name]: value,
    }, async (stt) => {
      let response;
      if (stt.area === 'All') {
        response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        );
      } else {
        response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${stt.area}`,
        );
      }
      const { meals } = await response.json();
      const INDEX_END = 12;
      const resultsTwelveItemsAreas = meals.slice(0, INDEX_END);
      console.log(resultsTwelveItemsAreas);
      await setStateRedux(
        {
          actionType: 'FETCH_COMPLETED_DID_MOUNT',
          resultsTwelveItems: resultsTwelveItemsAreas },
      );
    });
  };

  return (
    <div className={ styles.container }>
      <Header title="Explorar Origem" showButton />
      <select
        name="area"
        value={ state.area }
        data-testid="explore-by-area-dropdown"
        onChange={ handleAreaChange }
      >
        <option data-testid="All-option">
          All
        </option>
        {state.areas && state.areas.map((area) => (
          <option key={ area.strArea } data-testid={ `${area.strArea}-option` }>
            {area.strArea}
          </option>))}
      </select>

      <main className={ styles.cardsArea }>
        {resultsTwelveItems && resultsTwelveItems.map(
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

FoodArea.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default FoodArea;
