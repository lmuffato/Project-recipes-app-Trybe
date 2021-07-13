import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import { getCocktails } from '../services/api';
import './exploreIngredientsPage.css';
import '../components/ingredientCard.css';

export default function ExploreIngredientsDrinks() {
  const [listIngredientDrinks, setListIngredientDrinks] = useState([]);

  useEffect(() => {
    getCocktails('ingredient_list').then(({ drinks }) => {
      const numberMaxOfIngredients = 12;
      const filtered = drinks
        .filter((_, index) => index < numberMaxOfIngredients);
      setListIngredientDrinks(filtered);
    });
  }, [setListIngredientDrinks]);

  return (
    <div className="exploreIngredientPage__Container">
      <Header title="Explorar Ingredientes">
        <div />
      </Header>

      <div className="exploreIngredientCards__container">
        {
          listIngredientDrinks && listIngredientDrinks
            .map(({ strIngredient1: ingredient }, index) => (
              <Link
                to="/bebidas"
                key={ index }
                class="ingredientCard__container"
              >
                <IngredientCard
                  index={ index }
                  thumbnail={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
                  name={ ingredient }
                />
              </Link>
            ))
        }
      </div>

      <Footer />
    </div>
  );
}
