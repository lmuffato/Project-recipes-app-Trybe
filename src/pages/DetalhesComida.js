import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReceitaComidaDetalhe from '../components/ReceitaComidaDetalhe';

import { getFoodByID } from '../services/fetchApiDetailsRecipe';
import { getDrinkRecomendation } from '../services/fetchApiRecomendations';

import '../styles/DetalhesPaginas.css';

function DetalhesComida({ match: { params: { id } } }) {
  const [acctualyFood, setAcctualyFood] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [foodRecomendation, setFoodRecomendation] = useState();

  useEffect(() => {
    async function fetchFood() {
      setIsLoading(true);
      const food = await getFoodByID(id);
      const recomendations = await getDrinkRecomendation();

      setFoodRecomendation(recomendations.drinks);
      setAcctualyFood(food);
      setIsLoading(false);
    }

    fetchFood();
  }, [id]);

  const propsToSend = {
    acctualyFood,
    foodRecomendation,
    id,
  };

  return !isLoading ? <ReceitaComidaDetalhe props={ propsToSend } /> : <p>Loading...</p>;
}

DetalhesComida.propTypes = {
  props: object,
}.isRequired;

export default DetalhesComida;
