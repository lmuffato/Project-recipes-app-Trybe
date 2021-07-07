import React from 'react';
import { useParams } from 'react-router';
import useClipBoard from '../hooks/useClipboard';

export default function RecipeDoneCard(recipe) {
  const { id } = useParams();
  const { strThumb, strTags, strName, strArea, strData, strCategory, index } = recipe;
  const shareLink = strThumb.includes('meal') ? 'comida' : 'bebida';
  const { copyToClipBoard } = useClipBoard(id, shareLink);

  const spliteredTags = strTags.split(',');
  const firstTag = spliteredTags[0];
  const secondTag = spliteredTags[1];

  return (
    <section>
      <img data-testid={ `${index}-horizontal-image` } alt="Recipe" src={ strThumb } />
      <h1 data-testid={ `${index}-horizontal-horizontal-name` }>{strName}</h1>
      <p data-testid={ `${index}-horizontal-top-text` }>{strCategory}</p>
      <p>{strArea}</p>
      <span data-testid={ `${index}-horizontal-done-date` }>{strData}</span>
      <span data-testid={ `${firstTag}-horizontal-top-text` }>{firstTag}</span>
      <span data-testid={ `${secondTag}-horizontal-top-text` }>{secondTag}</span>
      <button
        data-testid={ `${index}-horizontal-share-btn` }
        type="button"
        onClick={ copyToClipBoard }
      >
        Share
      </button>
    </section>
  );
}
