import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import ContextBebidas from './ContextBebida';
import { cocktailsAPI } from '../services/apisMealsAndCocktails';
import { categoriaBebida } from '../services/apisCategories';

function ProviderBebidas({ children }) {
  const [data, setData] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [texto, setTexto] = useState('');

  const fetchapi = async () => {
    const bebidas = await cocktailsAPI();
    const categoriaBebidas = await categoriaBebida();

    setData(bebidas);
    setCategoria(categoriaBebidas);
  };

  useEffect(() => {
    fetchapi();
  }, []);

  const context = {
    data,
    categoria,
    texto,
    setTexto,
    setData,
    setCategoria,
  };

  return (
    <ContextBebidas.Provider value={ context }>
      { children }
    </ContextBebidas.Provider>
  );
}

ProviderBebidas.propTypes = {
  children: object,
}.isRequired;

export default ProviderBebidas;
