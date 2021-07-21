import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../../images/shareIcon.svg';
import unFavoriteIcon from '../../../images/blackHeartIcon.svg';
import './cards.css';

export default function FavoriteMeals({ props:
  { recipe, index, unFavorite } }) {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    const treeSeconds = 6000;
    setShow(true);
    setTimeout(() => { setShow(false); }, treeSeconds);
  };

  if (recipe) {
    const { name, id, image, area, category } = recipe;
    return (
      <div key={ name } className="favoriteRecipes-card">
        <h1 style={ show ? {} : { display: 'none' } }>Link copiado!</h1>
        <Link to={ `/comidas/${id}` } className="favoriteRecipes-link">
          <h2
            data-testid={ `${index}-horizontal-name` }
            className="favoriteRecipes-title"
          >
            {name}
          </h2>
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
            className="favoriteRecipes-img"
          />
        </Link>
        <h3
          data-testid={ `${index}-horizontal-top-text` }
          className="favoriteRecipes-text"
        >
          { `${area} - ${category}` }
        </h3>
        {/* https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
          Site em que aprendi a copiar para o clipboard
        */}
        <section className="share-favorite">
          <button
            type="button"
            className="share-button"
            onClick={ async () => {
              await navigator.clipboard
                .writeText(`http://localhost:3000/comidas/${recipe.id}`);
              return handleClick;
            } }
          >
            <img
              src={ shareIcon }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <button
            name={ name }
            className="favorite-button"
            type="button"
            onClick={ unFavorite }
          >
            <img
              src={ unFavoriteIcon }
              alt="unfavorite"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </section>
      </div>
    );
  }
  return ('');
}
