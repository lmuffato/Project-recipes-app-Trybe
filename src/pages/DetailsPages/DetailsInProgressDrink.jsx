import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import ComponentAuxProgress from './ComponentAuxProgress';

function DetailsInProgressDrink() {
  // const { recipeFood } = useContext(Context);
  const id = window.location.pathname.match(/(\d+)/)[0];
  const [loading, setLoading] = useState(true);
  const [recipeDrinkProgress, setRecipeDrinkProgress] = useState({});
  useEffect(() => {
    async function getRecipe() {
      const req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await req.json();
      setRecipeDrinkProgress(data.drinks[0]);
      setLoading(false);
    }
    getRecipe();
  }, [id]);
  return (
    loading ? <Spinner animation="border" className="spinner" />
      : <ComponentAuxProgress recipeDrink={ recipeDrinkProgress } />
  );
}

export default DetailsInProgressDrink;
