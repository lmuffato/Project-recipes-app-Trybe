import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Categorias from '../components/Categorias';
import ContextComidas from '../provider/ContextComida';
import { filterCategoriaComidas } from '../services/apisCategories';
import { mealsAPI } from '../services/apisMealsAndCocktails';
import { apiSearchMeals } from '../services/fetchApiSearch';
import Cards from '../components/Card';

function Comidas() {
  const {
    data,
    texto,
    categoria,
    ingredient,
    setData,
  } = useContext(ContextComidas);

  const fetchapi = async () => {
    const comidas = await mealsAPI();
    setData(comidas);
  };

  const fetchApiIngredient = async () => {
    const ingredientResp = await apiSearchMeals(ingredient);
    // console.log(ingredientResp);
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
    const apiFoods = await filterCategoriaComidas(texto);
    if (apiFoods !== null && apiFoods !== undefined) {
      return setData(apiFoods);
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
      <Header title="Comidas" />
      <Categorias param={ categoria } />
      <div className="pb-5">
        <div className="d-flex w-75 flex-wrap mx-auto justify-content-center pb-4">
          <Cards param="comidas" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Comidas;
