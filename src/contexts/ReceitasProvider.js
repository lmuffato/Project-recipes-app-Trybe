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
  const [isLoading, setIsLoading] = useState(false);

  async function fetchApi(endpoint, page) {
    setIsLoading(true);
    await fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        if (page === 'comidas') {
          setIsLoading(false);
          setAPIFood(response);
        } else if (page === 'bebidas') {
          setIsLoading(false);
          setAPIDrink(response);
        } else if (page === 'ingredientes-comidas') {
          setIsLoading(false);
          setAPIIngredientsFood(response);
        } else if (page === 'ingredientes-bebidas') {
          setIsLoading(false);
          setAPIIngredientsDrink(response);
        } else if (page === 'areas-comidas') {
          setIsLoading(false);
          setFoodAreas(response);
        }
        setIsLoading(false);
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
        isLoading,
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
