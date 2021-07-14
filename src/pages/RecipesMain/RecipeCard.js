import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ recipe, index, isMain }) {
  // const [setGetImage] = useState('');

  // useEffect(() => {
  //   setGetImage(path.includes('/comidas') ? 'themealdb' : 'thecocktaildb');
  // }, [path]);

  return (

    <div
      className="recipe-card"
      data-testid={ isMain ? `${index}-recipe-card` : `${index}-ingredient-card` }
    >

      <img
        src={ isMain
          ? recipe.strMealThumb || recipe.strDrinkThumb
          : '' }
        data-testid={ isMain ? `${index}-card-img` : `${index}-card-img` }
        alt="recipe"
        width="150px"
      />
      <p
        data-testid={ isMain ? `${index}-card-name` : `${index}-card-name` }
      >
        { isMain
          ? recipe.strMeal || recipe.strDrink
          : recipe.strIngredient || recipe.strIngredient1 }

      </p>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.object,
  index: PropTypes.number,
}.isRequired;
