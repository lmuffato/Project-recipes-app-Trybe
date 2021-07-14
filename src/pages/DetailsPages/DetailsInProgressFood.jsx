import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import ComponentAuxProgress from './ComponentAuxProgress';

function DetailsInProgressFood() {
  // const { recipeFood } = useContext(Context);
  const id = window.location.pathname.match(/(\d+)/)[0];
  const [loading, setLoading] = useState(true);
  const [recipeFoodProgress, setRecipeFoodProgress] = useState({});
  useEffect(() => {
    async function getRecipe() {
      const req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await req.json();
      setRecipeFoodProgress(data.meals[0]);
      setLoading(false);
    }
    getRecipe();
  }, [id]);
  return (
    loading ? <Spinner animation="border" className="spinner" />
      : <ComponentAuxProgress recipeFood={ recipeFoodProgress } />
  );
}

export default DetailsInProgressFood;
