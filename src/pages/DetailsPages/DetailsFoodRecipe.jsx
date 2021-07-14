import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
// import {
//   Image,
//   Heading,
//   Ingredients,
//   Instructions,
//   VideoComponent,
//   Recommends,
//   ButtonMakeRecipeFood,
// } from './components/index';
// import Context from '../../context/Context';
// import { fetchRecipeFood } from '../../services/fetchApi';

import ComponentAux from './ComponentAux';
import './Styles.css';

const DetailsFoodRecipe = () => {
  // const { recipeFood } = useContext(Context); // variavel q guarda a receita
  // https://www.geeksforgeeks.org/extract-a-number-from-a-string-using-javascript/#:~:text=The%20number%20from%20a%20string,(%5Cd%2B)%2F).
  const id = window.location.pathname.match(/(\d+)/)[0];
  const [loading, setLoading] = useState(true);
  const [recipeFood, setRecipeFood] = useState({});
  // componentDidUpdate observando "id"
  useEffect(() => {
    async function getRecipe() {
      const req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await req.json();
      setRecipeFood(data.meals[0]);
      setLoading(false);
    }
    getRecipe();
  }, [id]);

  return (
    loading ? <Spinner animation="border" className="spinner" />
      : <ComponentAux recipeFood={ recipeFood } />
  );
};

export default DetailsFoodRecipe;
