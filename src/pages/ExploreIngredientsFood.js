import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import { getMeals } from '../services/api';
import './exploreIngredientsPage.css';

export default function ExploreIngredientsFood() {
  const [listIngredient, setListIngredient] = useState([]);

  useEffect(() => {
    getMeals('ingredient_list').then(({ meals }) => {
      const numberMaxOfIngredients = 12;
      const filtered = meals
        .filter((_, index) => index < numberMaxOfIngredients);
      setListIngredient(filtered);
    });
  }, [setListIngredient]);

  return (
    <div className="exploreIngredientPage__Container">
      <Header title="Explorar Ingredientes">
        <div />
      </Header>

      <div className="exploreIngredientCards__container">
        {
          listIngredient && listIngredient.map(({ strIngredient }, index) => (
            <IngredientCard
              key={ index }
              index={ index }
              thumbnail={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              name={ strIngredient }
            />
          ))
        }
      </div>

      <Footer />
    </div>
  );
}
