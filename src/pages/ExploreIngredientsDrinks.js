import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import { getCocktails } from '../services/api';
import './exploreIngredientsPage.css';

export default function ExploreIngredientsDrinks() {
  const [listIngredient, setListIngredient] = useState([]);

  useEffect(() => {
    getCocktails('ingredient_list').then(({ drinks }) => {
      const numberMaxOfIngredients = 12;
      const filtered = drinks
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
          listIngredient && listIngredient.map(({ strIngredient1 }, index) => (
            <IngredientCard
              key={ index }
              index={ index }
              thumbnail={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              name={ strIngredient1 }
            />
          ))
        }
      </div>

      <Footer />
    </div>
  );
}
