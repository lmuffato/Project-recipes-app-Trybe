import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import ContextComidas from './ContextComida';
import { categoriaComida } from '../services/apisCategories';
import { mealsAPI } from '../services/apisMealsAndCocktails';

function ProviderComidas({ children }) {
  const [data, setData] = useState([]);
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    const fetchapi = async () => {
      const comidas = await mealsAPI();
      const categorias = await categoriaComida();

      setData(comidas);
      setCategoria(categorias);
    };
    fetchapi();
  }, []);

  const context = {
    data,
    setData,
    categoria,
    setCategoria,
  };

  return (
    <ContextComidas.Provider value={ context }>
      { children }
    </ContextComidas.Provider>
  );
}

ProviderComidas.propTypes = {
  children: object,
}.isRequired;

export default ProviderComidas;
