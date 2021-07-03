import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import CocktailsContext from './CocktailsContext';
import { ApiRandom } from '../services/theCockTailAPI';

function CocktailsProvider(props) {
  const [cocktails, setCocktails] = useState({});

  const history = useHistory();
  const handleRandomDrinkDetails = async () => {
    const result = await ApiRandom();
    const { drinks } = result;
    const [drink] = drinks;
    const { idDrink } = drink;
    history.push(`/bebidas/${idDrink}`);
  };

  const context = {
    cocktails,
    setCocktails,
    handleRandomDrinkDetails,
  };
  const { children } = props;
  return (
    <CocktailsContext.Provider value={ context }>
      {children}
    </CocktailsContext.Provider>
  );
}

CocktailsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default CocktailsProvider;
