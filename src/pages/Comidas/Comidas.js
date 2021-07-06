import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import CardList from '../../components/CardList';
import Header from '../../components/Header';
import ReceitasContext from '../../contexts/ReceitasContext';
import Footer from '../../components/Footer';
import Filter from '../../components/Filter';

function Comidas({ location }) {
  const { APIFood,
    fetchApi,
    foodsByIngredient,
    setFilterByIngredient } = useContext(ReceitasContext);

  useEffect(() => {
    fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'comidas');

    if (location.state && location.state.ingredientName.length >= 1) {
      setFilterByIngredient(location.state.ingredientName, 'food');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (foodsByIngredient !== undefined
  ) {
    if (foodsByIngredient.meals !== null
        && foodsByIngredient.meals.length >= 1) {
      return (
        <div>
          <Header title="Comidas" />
          <Filter page="comidas" />
          <CardList
            list={ foodsByIngredient.meals }
          />
          <Footer />
        </div>
      );
    }

    return (
      <div>
        <Header title="comidas" />
        <Footer />
      </div>
    );
  }

  if (APIFood !== undefined && foodsByIngredient === undefined) {
    if (APIFood.meals !== null && APIFood.meals.length >= 1) {
      return (
        <div>
          <Header title="Comidas" />
          <Filter page="comidas" />
          <CardList
            list={ APIFood.meals }
          />
          <Footer />
        </div>
      );
    }
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return (
      <div>
        <Header title="Comidas" />
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <Header title="Comidas" />
      <Filter page="comidas" />
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.shape({
      ingredientName: PropTypes.string,
    }),
  }),
};

Comidas.defaultProps = {
  location: {
    pathname: '',
    state: {
      ingredientName: '',
    },
  },
};

export default Comidas;
