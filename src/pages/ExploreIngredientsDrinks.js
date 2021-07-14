import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipesContext from '../hooks/useRecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import './exploreIngredientsPage.css';
import '../components/ingredientCard.css';

export default function ExploreIngredientsDrinks() {
  const { fetchCocktailsNoFilter, drinkDataNoFilter } = useRecipesContext();

  useEffect(() => {
    fetchCocktailsNoFilter('ingredient_list');
  }, []);

  async function handleRedirectPage(ingredient) {
    fetchCocktailsNoFilter('ingredient', ingredient);
  }

  return (
    <div className="exploreIngredientPage__Container">
      <Header title="Explorar Ingredientes">
        <div />
      </Header>

      <div className="exploreIngredientCards__container">
        {
          drinkDataNoFilter && drinkDataNoFilter
            .map(({ strIngredient1: ingredient }, index) => (
              <Link
                to="/bebidas"
                key={ index }
                className="ingredientCard__container"
                onClick={ () => handleRedirectPage(ingredient) }
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
