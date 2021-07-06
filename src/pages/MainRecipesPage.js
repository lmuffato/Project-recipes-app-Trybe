import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DrinkCards from '../compenents/DrinkCards';
import MealCards from '../compenents/MealCards';
import RecipesContext from '../contexts/RecipesContext';
// import RecipeCard from '../compenents/RecipeCard';
import SearchbarContext from '../contexts/SearchbarContext';
import apiRequester from '../services/fetchApi';
import '../styles/MealAndDrinkCards.css';

function MainMealsRecipes() {
  // const [recipes, setRecipes] = useState(null); // Guarda as 25 receitas vindas da API, sendo um backup
  const [twelveRecipes, setTwelveRecipes] = useState(null);
  const [categories, setCategories] = useState(null);
  const [returnedCategoty, setReturnedCategory] = useState(null);
  // const [loading, setLoading] = useState(false);

  const {
    mealOrDrink, searchCategory, setSearchCategory,
  } = useContext(SearchbarContext);
  const { states: { type,
  },
  setStates: { setType,
  } } = useContext(RecipesContext);

  let recipes;
  const history = useHistory();

  if (history.location.pathname === '/bebidas' || mealOrDrink === 'cocktail') {
    setType('cocktail');
  } else if (history.location.pathname === '/comidas' || mealOrDrink === 'meal') {
    setType('meal');
  }

  useEffect(() => {
    const endpoints = {
      endpointMealOrDrink: `https://www.the${type}db.com/api/json/v1/1/search.php?s=`,
      lastRecipe: 12,
      endpointCategories: `https://www.the${type}db.com/api/json/v1/1/list.php?c=${searchCategory}`,
      lastCategory: 5,
      endpointCategory: `https://www.the${type}db.com/api/json/v1/1/filter.php?c=${searchCategory}`,
    };
    console.log(endpoints.endpointCategories);
    apiRequester(endpoints.endpointMealOrDrink)
      .then((response) => {
        // setRecipes(response); // Salva as 25 receitas retornadas da API, faz um backup
        setTwelveRecipes(Object.values(response)[0].slice(0, endpoints.lastRecipe));
        // setLoading(false);
      });

    apiRequester(endpoints.endpointCategories)
      .then((response) => {
        setCategories(Object.values(response)[0].slice(0, endpoints.lastCategory));
      });

    console.log(`searchCategory: ${searchCategory}`);
    if (searchCategory !== 'list') {
      apiRequester(endpoints.endpointCategory)
        .then((response) => {
          console.log(Object.values(response));
          setReturnedCategory(Object.values(response)[0]
            .splice(0, endpoints.lastRecipe));
        });
    }
  }, [type, searchCategory]);

  if (searchCategory !== 'list') {
    recipes = returnedCategoty;
  } else { recipes = twelveRecipes; }

  if (recipes !== null && categories !== null) {
    return (
      <>
        <section>
          <button
            type="button"
            onClick={ () => setSearchCategory('list') }
          >
            All
          </button>
          {categories.map(({ strCategory }, index) => (
            <button
              key={ index }
              type="button"
              value={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ (e) => setSearchCategory(e.target.value) }
            >
              { strCategory }
            </button>
          ))}
        </section>
        <section className="recipes-container">
          { type === 'meal' ? recipes.map((recipe, index) => (
            <MealCards
              data={ recipe }
              index={ index }
              key={ recipe.idMeal }
            />
          )) : recipes.map((recipe, index) => (
            <DrinkCards
              data={ recipe }
              index={ index }
              key={ recipe.idDrink }
            />
          ))}
        </section>
      </>
    );
  }
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

export default MainMealsRecipes;
