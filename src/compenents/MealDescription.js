import React, { useState, useContext, useEffect } from 'react';
import SearchbarContext from '../contexts/SearchbarContext';

function MealDescription() {
  const { idMeal } = useContext(SearchbarContext);

  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const getMeal = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
      await fetch(endpoint).then((data) => data.json())
        .then((result) => setMeal(result));
    };
    getMeal();
  }, [idMeal]);

  return (
    <div>
      {console.log(meal)}
      <p>Descrição comida! Deu certo</p>
    </div>
  );
}

export default MealDescription;
