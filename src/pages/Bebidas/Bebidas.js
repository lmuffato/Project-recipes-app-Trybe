import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import CardList from '../../components/CardList';
import Header from '../../components/Header';
import ReceitasContext from '../../contexts/ReceitasContext';
import Footer from '../../components/Footer';
import Filter from '../../components/Filter';

function Bebidas({ location }) {
  const { APIDrink,
    fetchApi,
    setFilterByIngredient,
    drinksByIngredient,
  } = useContext(ReceitasContext);

  useEffect(() => {
    fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'bebidas');

    if (location.state && location.state.ingredientName.length >= 1) {
      setFilterByIngredient(location.state.ingredientName, 'drinks');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (drinksByIngredient !== undefined
  ) {
    if (drinksByIngredient.drinks !== null
      && drinksByIngredient.drinks.length >= 1) {
      return (
        <div>
          <Header title="Bebidas" />
          <Filter page="bebidas" />
          <CardList
            list={ drinksByIngredient.drinks }
          />
          <Footer />
        </div>
      );
    }

    return (
      <div>
        <Header title="Bebidas" />
        <Footer />
      </div>
    );
  }

  if (APIDrink !== undefined && drinksByIngredient) {
    if (APIDrink.drinks !== null && APIDrink.drinks.length >= 1) {
      return (
        <div>
          <Header title="Bebidas" />
          <Filter page="bebidas" />
          <CardList
            list={ APIDrink.drinks }
          />
          <Footer />
        </div>
      );
    }

    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return (
      <div>
        <Header title="Bebidas" />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header title="Bebidas" />
      <Filter page="bebidas" />
      <Footer />
    </div>
  );
}

Bebidas.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.shape({
      ingredientName: PropTypes.string,
    }),
  }),
};

Bebidas.defaultProps = {
  location: {
    pathname: '',
    state: {
      ingredientName: '',
    },
  },
};

export default Bebidas;
