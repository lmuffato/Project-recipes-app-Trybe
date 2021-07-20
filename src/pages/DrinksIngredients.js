import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../compenents/Footer';
import Header from '../compenents/Header';
import RecipesContext from '../contexts/RecipesContext';
import SearchbarContext from '../contexts/SearchbarContext';

function DrinksIngredients() {
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const {
    setMealsAndDrinkByIngredients,
  } = useContext(RecipesContext);
  const { setHideSearchBtn, setPageName } = useContext(SearchbarContext);
  const numberOfIngredients = 12;

  useEffect(() => {
    const getIngredients = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setDrinkIngredients(drinks);
    };
    getIngredients();
    setHideSearchBtn(false);
    setPageName('Explorar Ingredientes');
  }, []);

  const getRecipesByIngredient = async (param) => {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${param}`;
    const { drinks } = await fetch(endpoint).then((data) => data.json());
    setMealsAndDrinkByIngredients(drinks.slice(0, numberOfIngredients));
  };

  const getTwelveIngredients = () => {
    const twelveIngredients = drinkIngredients
      .filter((ingredient, index) => index < numberOfIngredients);
    return (
      twelveIngredients.map((ingredient, index) => {
        const name = ingredient.strIngredient1;
        return (
          <Link
            to="/bebidas"
            key={ index }
            className="ingredient"
            data-testid={ `${index}-ingredient-card` }
            onClick={ (e) => getRecipesByIngredient(e.target.innerText || e.target.alt) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png` }
              alt={ name }
            />
            <p
              data-testid={ `${index}-card-name` }
              className="ingredient-title"
            >
              { name }
            </p>
          </Link>
        );
      })
    );
  };

  return (
    <>
      <Header />
      <main className="main-ingredients">
        <section className="ingredients-container">
          { getTwelveIngredients() }
        </section>
      </main>
      <Footer />
    </>
  );
}

export default DrinksIngredients;
