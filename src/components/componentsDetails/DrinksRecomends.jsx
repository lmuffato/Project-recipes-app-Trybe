import React, { useState, useEffect } from 'react';
import { initialDrinks } from '../../services/apiRequests';
import RecDrinkCard from './RecDrinkCard';

export default function DrinksRecomends() {
  const [drinksRecommends, setDrinksRecommends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initialDrinks(setDrinksRecommends);
    setIsLoading(false);
  }, []);
  const maxLength = 5;

  return (
    <div>
      { !isLoading && drinksRecommends
        .filter((_, index) => index <= maxLength)
        .map((drink, index) => (
          <RecDrinkCard
            key={ drink.idDrink }
            drink={ drink }
            index={ index }
          />
        ))}
    </div>
  );
}
