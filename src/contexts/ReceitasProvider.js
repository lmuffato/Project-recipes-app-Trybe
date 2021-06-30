import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';

function ReceitasProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [APIresponse, setAPIResponse] = useState();

  async function fetchApi(endpoint) {
    await fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setAPIResponse(response);
        console.log(response);
      });
  }

  return (
    <ReceitasContext.Provider
      value={ {
        email,
        APIresponse,
        setEmail,
        fetchApi,
        password,
        setPassword,
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
