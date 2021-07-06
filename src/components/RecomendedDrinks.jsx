import React, { useEffect, useState } from 'react';
import { fetchRandonDrink } from '../services/getApis';

function RecomendedDrinks() {
  const [recomendedDrinks, setRecomendedDrinks] = useState([]);
  useEffect(() => {
    const DRINKS_NUMBER = 6;
    const getRandonDrink = async () => {
      const result = await fetchRandonDrink();
      setRecomendedDrinks([...recomendedDrinks, result.drinks[0]]);
    };
    if (recomendedDrinks.length < DRINKS_NUMBER) getRandonDrink();
  }, [recomendedDrinks]);

  return (
    <div data-testid="0-recomendation-card">
      {recomendedDrinks.map((drink, index) => (
        <div key={ index } data-testid={ `${index}-recomendation-card"` }>
          <img src={ drink.strDrinkThumb } alt="Recomended drink" />
          <h3>{ drink.strDrink }</h3>
        </div>
      ))}
    </div>
  );
}

export default RecomendedDrinks;
