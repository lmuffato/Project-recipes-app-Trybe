import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../../images/shareIcon.svg';

export default function MealsDoneCards({ props:
  { recipe, index } }) {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    const treeSeconds = 6000;
    setShow(true);
    setTimeout(() => { setShow(false); }, treeSeconds);
  };
  if (recipe) {
    const size = 2;
    const { name, id, image, area, category, doneDate, tags } = recipe;
    return (
      <div key={ name } className="doneRecipes-card">
        <h1 style={ show ? {} : { display: 'none' } }>Link copiado!</h1>
        <Link to={ `/comidas/${id}` } className="doneRecipes-link">
          <h2
            data-testid={ `${index}-horizontal-name` }
            className="doneRecipes-title"
          >
            {name}
          </h2>
          <img
            className="doneRecipes-img"
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <h3
          data-testid={ `${index}-horizontal-top-text` }
          className="doneRecipes-text"
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
        <p
          data-testid={ `${index}-horizontal-done-date` }
          className="doneRecipes-text"
        >
          { doneDate }
        </p>
        { console.log(tags) }
        {tags ? tags.slice(0, size).map((tagName) => (
          <p
            key={ tagName }
            data-testid={ `${index}-${tagName}-horizontal-tag` }
            className="doneRecipes-text"
          >
            {tagName}
          </p>
        )) : null }
      </div>
    );
  }
  return ('');
}
