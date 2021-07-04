import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';

function ReceitasProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [APIresponse, setAPIResponse] = useState();
  const [APIFood, setAPIFood] = useState();
  const [APIDrink, setAPIDrink] = useState();
  const [selected, setSelected] = useState();
  const [filter, setFilter] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [filterValue, setFilterValue] = useState('All');

  async function fetchApi(endpoint, page) {
    await fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        if (page === 'comidas') {
          setAPIFood(response);
        } else if (page === 'bebidas') {
          setAPIDrink(response);
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
