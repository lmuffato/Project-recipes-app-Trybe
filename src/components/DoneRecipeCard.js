import React from 'react';
import { useStateEasyRedux } from 'easy-redux-trybe';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard(doneRecipeProps, indexProps) {
  const [copyUrl, setCopyUrl] = useStateEasyRedux({ name: 'copyDrink' }, {});

  const { copyRecipe } = copyUrl;

  const copyUrlLink = (recipeID, recipeType) => {
    const currentURL = window.location.href.toString();
    const splitURL = currentURL.split('/receitas-feitas');
    copy(`${splitURL[0]}/${recipeType}s/${recipeID}`);
    setCopyUrl({ copyRecipe: true });
    const time = 2000;
    setTimeout(() => {
      setCopyUrl({ copyRecipe: false });
    }, time);
  };

  return (
    <div key={ `Recipe ${doneRecipeProps.id} card` }>
      <img
        src={ doneRecipeProps.image }
        alt={ doneRecipeProps.name }
        width="200"
        data-testid={ `${indexProps}-horizontal-image` }
      />
      <p data-testid={ `${indexProps}-horizontal-top-text` }>
        { doneRecipeProps.alcoholicOrNot
          ? `${doneRecipeProps.alcoholicOrNot}`
          : `${doneRecipeProps.area} - ${doneRecipeProps.category}` }
      </p>
      <h3 data-testid={ `${indexProps}-horizontal-name` }>{ doneRecipeProps.name }</h3>
      <p
        data-testid={ `${indexProps}-horizontal-done-date` }
      >
        { doneRecipeProps.doneDate }
      </p>
      {copyRecipe && <span>Link copiado!</span>}
      <button
        type="button"
        src={ shareIcon }
        data-testid={ `${indexProps}-horizontal-share-btn` }
        onClick={ () => copyUrlLink(doneRecipeProps.id, doneRecipeProps.type) }
      >
        <img src={ shareIcon } alt="Compartilhar" />
      </button>
      { doneRecipeProps.tags
        ? doneRecipeProps.tags.map((tagName) => (
          <p
            key={ tagName }
            data-testid={ `${indexProps}-${tagName}-horizontal-tag` }
          >
            { tagName }
          </p>
        ))
        : ' '}
    </div>
  );
}

export default DoneRecipeCard;
