import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useRecipesContext from '../hooks/useRecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import { getMeals } from '../services/api';
import './exploreIngredientsPage.css';
import '../components/ingredientCard.css';

export default function ExploreIngredientsFood() {
  const [listIngredientFood, setListIngredientFood] = useState([]);
  const { fetchMealsRedirect } = useRecipesContext();

  useEffect(() => {
    getMeals('ingredient_list').then(({ meals }) => {
      const numberMaxOfIngredients = 12;
      const filtered = meals
        .filter((_, index) => index < numberMaxOfIngredients);
      setListIngredientFood(filtered);
    });
  }, [setListIngredientFood]);

  async function handleRedirectPage(ingredient) {
    fetchMealsRedirect('ingredient', ingredient);
  }

  return (
    <div className="exploreIngredientPage__Container">
      <Header title="Explorar Ingredientes">
        <div />
      </Header>

      <div className="exploreIngredientCards__container">
        {
          listIngredientFood && listIngredientFood
            .map(({ strIngredient: ingredient }, index) => (
              <Link
                to="/comidas"
                key={ index }
                className="ingredientCard__container"
                onClick={ () => handleRedirectPage(ingredient) }
              >
                <IngredientCard
                  index={ index }
                  thumbnail={ `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png` }
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
