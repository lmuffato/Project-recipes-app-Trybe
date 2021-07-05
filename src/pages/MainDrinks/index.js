import React, { useContext } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import context from '../../context/RecipesContext';

const MainDrinks = () => {
  const { recipesDrinks } = useContext(context);
  const MAX_LENGTH_RECIPES = 12;
  const recipes = recipesDrinks.slice(0, MAX_LENGTH_RECIPES);

  return (
    <section>
      <Header title="Bebidas" />
      {recipes.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
        <div key={ idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
        </div>
      ))}
      <Footer />
    </section>
  );
};

export default MainDrinks;
