import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipesContext from '../hooks/useRecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import './exploreIngredientsPage.css';
import '../components/ingredientCard.css';

export default function ExploreIngredientsFood() {
  const { fetchMealsNoFilter, foodDataNoFilter } = useRecipesContext();

  useEffect(() => {
    fetchMealsNoFilter('ingredient_list');
  }, []);

  async function handleRedirectPage(ingredient) {
    fetchMealsNoFilter('ingredient', ingredient);
  }

  return (
    <div className="exploreIngredientPage__Container">
      <Header title="Explorar Ingredientes">
        <div />
      </Header>

      <div className="exploreIngredientCards__container">
        {
          foodDataNoFilter && foodDataNoFilter
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
