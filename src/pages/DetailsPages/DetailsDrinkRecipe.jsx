import React, { useEffect, useState } from 'react';
// import {
//   Image,
//   Heading,
//   Ingredients,
//   Instructions,
//   Recommends,
//   // ButtonStartRecipe,
// } from './components/index';
// import Context from '../../context/Context';

import ComponentAux from './ComponentAux';

const DetailsDrinkRecipe = () => {
  // const { recipeDrink } = useContext(Context); // variavel q guarda a receita
  const id = window.location.pathname.match(/(\d+)/)[0];
  const [loading, setLoading] = useState(true);
  const [recipeDrink, setRecipeDrink] = useState({});
  useEffect(() => {
    async function getRecipe() {
      const req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await req.json();
      setRecipeDrink(data.drinks[0]);
      setLoading(false);
    }
    getRecipe();
  }, [id]);

  return (
    loading ? <h1>Carregando....</h1>
      : <ComponentAux recipeDrink={ recipeDrink } />
  );
};

export default DetailsDrinkRecipe;
