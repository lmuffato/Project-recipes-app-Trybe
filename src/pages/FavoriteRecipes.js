import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const getFavorites = [
    {
      id: 52771,
      type: 'comidas',
      area: 'Italian',
      category: 'Vegetarian',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: 1555,
      type: 'bebidas',
      area: 'area',
      category: 'categoria',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  const [isCopy, setIsCopy] = useState(false);

  // const getFavorites = localStorage.getItem('favoriteRecipes');

  const copyToClipboard = ({ target }) => {
    setIsCopy(true);
    console.log(target);
    const { alt } = target;
    console.log(alt);
    const path = `http://localhost:3000/${alt}`;
    navigator.clipboard.writeText(path);
  };

  const setMealOrDrink = ({ id, type, area, category, alcoholicOrNot, name, image }, index) => {    
    if (type === 'comidas') {
      return (
        <div key={ id }>
          { isCopy ? <p>Link copiado!</p>  : null }

          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ `${name} recipe` }
            width="150px"
          />

          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </span>

          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>

          <button type="button" onClick={ copyToClipboard }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ `${type}/${id}` }
            />
          </button>

          <button type="button">
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt={ `unfavorite ${name}` }
            />
          </button>
        </div>
      );
    }
    return (
      <div key={ id }>
        { isCopy ? <p>Link copiado!</p> : null }
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ `${name} recipe` }
          width="150px"
        />

        <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>

        <span data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot }
        </span>

        <button type="button" onClick={ copyToClipboard }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt={ `${type}/${id}` }
          />
        </button>

        <button type="button">
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt={ `unfavorite ${name}` }
          />
        </button>
      </div>
    );
  };

  return (
    <div>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn" onClick={ setMealOrDrink }>Food</button>
      <button type="button" data-testid="filter-by-drink-btn" onClick={ setMealOrDrink }>Drinks</button>

      {
        console.log(getFavorites)
      }

      {
        getFavorites.map(({ id, type, area, category, alcoholicOrNot, name, image }, index) => (
          setMealOrDrink({ id, type, area, category, alcoholicOrNot, name, image }, index)
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
