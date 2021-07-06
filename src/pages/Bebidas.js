import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Categorias from '../components/Categorias';
import ContextBebidas from '../provider/ContextBebida';
import { filterCategoriaBebidas } from '../services/apisCategories';
import { cocktailsAPI } from '../services/apisMealsAndCocktails';
import { apiSearchCocktails } from '../services/fetchApiSearch';
import Cards from '../components/Card';

function Bebidas() {
  const {
    data,
    texto,
    categoria,
    ingredient,
    setData,
  } = useContext(ContextBebidas);

  const fetchapi = async () => {
    const bebidas = await cocktailsAPI();
    setData(bebidas);
  };

  const fetchApiIngredient = async () => {
    const ingredientResp = await apiSearchCocktails(ingredient);
    setData(ingredientResp);
  };

  useEffect(() => {
    setData([]);
    if (ingredient) {
      fetchApiIngredient();
    } else {
      fetchapi();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getApis = async () => {
    const apiDrinks = await filterCategoriaBebidas(texto);
    if (apiDrinks !== null && apiDrinks !== undefined) {
      return setData(apiDrinks);
    }
  };

  useEffect(() => {
    if (texto === 'All') {
      fetchapi();
    } else if (texto !== '') {
      getApis();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texto]);

  if (data.length < 1) return <h1>Loading...</h1>;

  return (
    <div>
      <Header title="Bebidas" />
      <Categorias param={ categoria } />
      <div className="pb-5">
        <div className="d-flex w-75 flex-wrap mx-auto justify-content-center pb-4">
          <Cards param="bebidas" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Bebidas;
