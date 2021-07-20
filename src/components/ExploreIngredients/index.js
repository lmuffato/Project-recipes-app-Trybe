import React, { useState, useContext, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import searchIngredient from '../../services/searchIngredient';
import RecipesContext from '../../context/RecipesContext';
import SearchFoods from '../../services/searchFoods';
import searchDrinks from '../../services/searchDrinks';

export default function ExploreIngredients() {
  const { setRecipesDrinks, setRecipesFoods } = useContext(RecipesContext);
  const [isExploring, setExploring] = useState(false);
  const maxRecipesLength = 12;
  const [ingredientsList, setList] = useState([]);
  const [place, setPlace] = useState('');
  const history = useHistory();
  const { pathname } = history.location;
  const linkPath = pathname.split('/')[2];
  const handleLink = async (name) => {
    if (pathname.includes('comidas')) {
      await SearchFoods('ingredient', name).then((meals) => {
        setRecipesFoods(meals.slice(0, maxRecipesLength));
      });
    }
    if (pathname.includes('bebidas')) {
      await searchDrinks('ingredient', name).then((drinks) => {
        setRecipesDrinks(drinks.slice(0, maxRecipesLength));
      });
    }
    setExploring(true);
  };

  useEffect(() => {
    const getApi = async () => {
      if (pathname.includes('comidas')) {
        const apiResult = await searchIngredient('meal');
        setList(apiResult.slice(0, maxRecipesLength));
        setPlace('meal');
      } else {
        const apiResult = await searchIngredient('cocktail');
        setList(apiResult.slice(0, maxRecipesLength));
        setPlace('cocktail');
      }
    };
    getApi();
  }, [pathname, setExploring]);

  if (isExploring) {
    return <Redirect to={ `/${linkPath}` } />;
  }

  return (
    <div>
      {ingredientsList.map((ingredient, index) => (
        // <Link
        //   to={ `/${linkPath}` }
        //   key={ index }
        //   name={ ingredient }
        //   onClick={ () => handleLink(ingredient) }
        // >
        <div
          data-testid={ `${index}-ingredient-card` }
          key={ index }
          name={ ingredient }
          onClick={ () => handleLink(ingredient) }
          aria-hidden
        >
          <img
            data-testid={ `${index}-card-img` }
            alt="ingredient"
            src={ `https://www.the${place}db.com/images/ingredients/${ingredient}-Small.png` }
          />
          <h1 data-testid={ `${index}-card-name` }>{ingredient}</h1>
        </div>
        // </Link>
      ))}
    </div>
  );
}
