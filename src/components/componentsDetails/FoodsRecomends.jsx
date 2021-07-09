import React, { useState, useEffect } from 'react';
import { initialFoods } from '../../services/apiRequests';
import RecFoodCard from './RecFoodCard';
import './Recommends.css';

export default function FoodsRecomends() {
  const [foodsRecommends, setFoodsRecommends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initialFoods(setFoodsRecommends);
    setIsLoading(false);
  }, []);
  const maxLength = 5;

  return (
    <div className="recommendsList">
      { !isLoading && foodsRecommends
        .filter((_, index) => index <= maxLength)
        .map((food, index) => (
          <RecFoodCard
            key={ food.idMeal }
            meal={ food }
            index={ index }
          />
        ))}
    </div>
  );
}
