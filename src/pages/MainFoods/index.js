import React, { useContext } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import context from '../../context/RecipesContext';

const MainFoods = () => {
  const { recipesFoods } = useContext(context);
  const MAX_LENGTH_RECIPES = 12;
  const foods = recipesFoods.slice(0, MAX_LENGTH_RECIPES);

  return (
    <section>
      <Header title="Comidas" />
      {foods.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
          <img src={ strMealThumb } alt={ strMeal } data-testid={ `${index}-card-img` } />
          <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
        </div>
      ))}
      <Footer />
    </section>
  );
};

export default MainFoods;
