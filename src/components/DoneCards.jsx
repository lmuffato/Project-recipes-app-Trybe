import React, { useContext } from 'react';
import RecipesContext from '../contexts/RecipesContext';
import shareIcon from '../images/shareIcon.svg';

export default function DoneCards() {
  const {
    doneRecipes,
  } = useContext(RecipesContext);
  console.log(doneRecipes);

  return (
    doneRecipes.map(({ name, image, category, doneDate, tags }, index) => (
      <div key={ index }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="receita"
        />
        <div className="doneCards-descriptions">
          <h3 data-testid={ `${index}-horizontal-top-text` }>
            {category}
          </h3>
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          <h4 data-testid={ `${index}-horizontal-done-date` }>
            {doneDate}
          </h4>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share icon"
          />
          {tags.map((tagName, i) => (
            <div
              key={ i }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              { tagName }
            </div>
          ))}
        </div>
      </div>
    ))
  );
}
