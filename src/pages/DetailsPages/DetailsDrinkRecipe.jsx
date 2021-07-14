import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
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
import './Styles.css';

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
    loading ? <Spinner animation="border" className="spinner" />
      : <ComponentAux recipeDrink={ recipeDrink } />
  );
};

export default DetailsDrinkRecipe;
