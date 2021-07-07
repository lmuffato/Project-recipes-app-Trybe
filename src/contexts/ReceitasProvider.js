import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';

function ReceitasProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [APIresponse, setAPIResponse] = useState();
  const [APIFood, setAPIFood] = useState();
  const [APIDrink, setAPIDrink] = useState();
  const [APIIngredientsFood, setAPIIngredientsFood] = useState();
  const [APIIngredientsDrink, setAPIIngredientsDrink] = useState();
  const [selected, setSelected] = useState();
  const [filter, setFilter] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [filterValue, setFilterValue] = useState('All');
  const [explore, setExplore] = useState(false);
  const [foodAreas, setFoodAreas] = useState();

  async function fetchApi(endpoint, page) {
    await fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        if (page === 'comidas') {
          setAPIFood(response);
        } else if (page === 'bebidas') {
          setAPIDrink(response);
        } else if (page === 'ingredientes-comidas') {
          setAPIIngredientsFood(response);
        } else if (page === 'ingredientes-bebidas') {
          setAPIIngredientsDrink(response);
        } else if (page === 'areas-comidas') {
          setFoodAreas(response);
        }
        setAPIResponse(response);
      });
  }

  return (
    <ReceitasContext.Provider
      value={ {
        email,
        APIresponse,
        setAPIResponse,
        setEmail,
        fetchApi,
        password,
        setPassword,
        filter,
        setFilter,
        selected,
        setSelected,
        canRender,
        setCanRender,
        APIFood,
        setAPIFood,
        APIDrink,
        setAPIDrink,
        filterValue,
        setFilterValue,
        APIIngredientsFood,
        APIIngredientsDrink,
        explore,
        setExplore,
        foodAreas,
      } }
    >
      {children}
    </ReceitasContext.Provider>
  );
}

ReceitasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReceitasProvider;
