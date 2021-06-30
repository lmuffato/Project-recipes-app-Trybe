import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';

function ReceitasProvider({ children }) {
  const [email, setEmail] = useState('mchusemann@gmail.com');
  const [senha, setSenha] = useState();
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
        senha,
        APIresponse,
        setEmail,
        setSenha,
        fetchApi,
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
