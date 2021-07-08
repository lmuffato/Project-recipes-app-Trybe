import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../../images/shareIcon.svg';
import unFavoriteIcon from '../../../images/blackHeartIcon.svg';

export default function FavoriteMeals({ props:
  { recipe, index, unFavorite } }) {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    const treeSeconds = 3000;
    setShow(true);
    setTimeout(() => { setShow(false); }, treeSeconds);
  };

  if (recipe) {
    const { name, id, image, area, category } = recipe;
    return (
      <div key={ name }>
        <span style={ show ? {} : { display: 'none' } }>Link copiado!</span>
        <Link to={ `/comidas/${id}` }>
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          <img
            style={ { width: '50px' } }
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <h3
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${area} - ${category}` }
        </h3>
        {/* https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
          Site em que aprendi a copiar para o clipboard
        */}
        <button
          type="button"
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
          type="button"
          onClick={ unFavorite }
        >
          <img
            src={ unFavoriteIcon }
            alt="unfavorite"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
      </div>
    );
  }
  return ('');
}
