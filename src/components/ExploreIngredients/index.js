import React, { useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import searchIngredient from '../../services/searchIngredient';
import RecipesContext from '../../context/RecipesContext';
import SearchFoods from '../../services/searchFoods';
import searchDrinks from '../../services/searchDrinks';

export default function ExploreIngredients() {
  const { setRecipesDrinks, setRecipesFoods } = useContext(RecipesContext);
  const maxNumber = 12;
  const [ingredientsList, setList] = useState([]);
  const [place, setPlace] = useState('');
  const history = useHistory();
  const { pathname } = history.location;
  const linkPath = pathname.split('/')[2];
  const handleLink = async (name) => {
    if (pathname.includes('comidas')) {
      const api = await SearchFoods('ingredient', name);
      setRecipesFoods(api);
    } else {
      const api = await searchDrinks('ingredient', name);
      console.log(api);
      setRecipesDrinks(api);
    }
  };

  useEffect(() => {
    const getApi = async () => {
      if (pathname.includes('comidas')) {
        const apiResult = await searchIngredient('meal');
        setList(apiResult.slice(0, maxNumber));
        setPlace('meal');
      } else {
        const apiResult = await searchIngredient('cocktail');
        setList(apiResult.slice(0, maxNumber));
        setPlace('cocktail');
      }
    };
    getApi();
  }, [pathname]);
  return (
    <div>
      {ingredientsList.map((ingredient, index) => (
        <Link
          to={ `/${linkPath}` }
          key={ index }
          name={ ingredient }
          onClick={ () => handleLink(ingredient) }
        >
          <div data-testid={ `${index}-ingredient-card` }>
            <img data-testid={ `${index}-card-img` } alt="ingredient" src={ `https://www.the${place}db.com/images/ingredients/${ingredient}-Small.png` } />
            <h1 data-testid={ `${index}-card-name` }>{ingredient}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
}
