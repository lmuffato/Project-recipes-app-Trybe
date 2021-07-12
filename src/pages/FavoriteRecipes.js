import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import FavoriteBtn from '../compenents/FavoriteBtn';

function FavoriteRecipes() {
  const [showRecipes, setShowRecipes] = useState();
  const [isCopy, setIsCopy] = useState(false);

  const recipe =            {
    id: 178319,
    type: 'cocktail',
    area: 'area',
    category: 'categoria',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  };

  const getFavorites = [
    // {
    //   id: 52771,
    //   type: 'meal',
    //   area: 'Italian',
    //   category: 'Vegetarian',
    //   name: 'Spicy Arrabiata Penne',
    //   image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    // },
    {
      id: 178319,
      type: 'cocktail',
      area: 'area',
      category: 'categoria',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  // const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  // setShowRecipes(getFavorites);

  const copyToClipboard = ({ target }) => {
    setIsCopy(true);
    const { alt } = target;
    const path = `http://localhost:3000/${alt}`;
    navigator.clipboard.writeText(path);
  };

  const renderCards = (
    { id, type, area, category, alcoholicOrNot, name, image }, index,
  ) => {
    if (type === 'meal') {
      return (
        <div key={ id }>
          { isCopy ? <p>Link copiado!</p> : null }
          <Link to={ `/comidas/${id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt={ `${name} recipe` }
              width="150px"
            />
          </Link>

          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </span>

          <Link to={ `/comidas/${id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          </Link>

          <button type="button" onClick={ copyToClipboard }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ `comidas/${id}` }
            />
          </button>

          <FavoriteBtn
            // recipe={ recipe }
          /> 
        </div>
      );
    }
    return (
      <div key={ id }>
        { isCopy ? <p>Link copiado!</p> : null }
        <Link to={ `/bebidas/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ `${name} recipe` }
            width="150px"
          />
        </Link>

        <span data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot }
        </span>

        <Link to={ `/bebidas/${id}` }>
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
        </Link>

        <button type="button" onClick={ copyToClipboard }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt={ `bebidas/${id}` }
          />
        </button>

        <FavoriteBtn
          recipe={ recipe }
        />
      </div>
    );
  };

  // const handleContent = (param) => {
  //   if (param === 'all') {
  //     return setShowRecipes(getFavorites);
  //   } if (param === 'meals') {
  //     const mealsRecipes = showRecipes.filter((recipe) => recipe.type === 'meal');
  //     setShowRecipes(mealsRecipes);
  //   } else if (param === 'cocktails') {
  //     const drinksRecipes = showRecipes.filter((recipe) => recipe.type === 'cocktail');
  //     setShowRecipes(drinksRecipes);
  //   }
  // };

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        // onClick={ () => handleContent('all') }
      >
      All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        // onClick={ () => handleContent('meals') }
      >
      Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        // onClick={ () => handleContent('cocktails') }
      >
      Drinks
      </button>

      {
        getFavorites.map(
          ({ id, type, area, category, alcoholicOrNot, name, image }, index) => (
            renderCards({ id, type, area, category, alcoholicOrNot, name, image }, index)
          ),
        )
      }
    </div>
  );
}

export default FavoriteRecipes;
