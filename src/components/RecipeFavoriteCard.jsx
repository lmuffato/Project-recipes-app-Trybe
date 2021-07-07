import React from 'react';
import { useHistory } from 'react-router-dom';
import { func, number, shape, string } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useClipBoard from '../hooks/useClipboard';
import useFavoriteRecipe from '../hooks/useFavoriteRecipe';

export default function RecipeFavoriteCard({
  recipeFavorite,
  setHasBeenChanged,
  index,
}) {
  const { id, type, area, category, alcoholicOrNot, name, image } = recipeFavorite;
  const isCategoryOrAlcoholic = alcoholicOrNot || category;
  const {
    showClipBoardMsg,
    copyToClipBoard,
    renderClipBoardMsg,
  } = useClipBoard(id, type.concat('s'));
  const { push } = useHistory();
  const styleImg = {
    width: '128px',
  };
  const { setHeart } = useFavoriteRecipe(type, id, true);

  return (
    <section>
      <div
        onClick={ () => push(`/${type.concat('s')}/${id}`) }
        onKeyDown={ () => push(`/${type.concat('s')}/${id}`) }
        role="button"
        tabIndex="0"
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          alt="Recipe"
          src={ image }
          style={ styleImg }
        />
      </div>

      <div
        onClick={ () => push(`/${type.concat('s')}/${id}`) }
        onKeyDown={ () => push(`/${type.concat('s')}/${id}`) }
        role="button"
        tabIndex="0"
      >
        <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
      </div>

      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${area} - ${isCategoryOrAlcoholic}`}
      </p>

      <button type="button" onClick={ copyToClipBoard }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          alt="Share recipe"
          src={ shareIcon }
        />
      </button>

      <button
        type="button"
        onClick={ () => {
          setHeart(recipeFavorite);
          setHasBeenChanged(true);
        } }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          alt="Favorite recipe"
          src={ blackHeartIcon }
        />
      </button>

      {showClipBoardMsg && renderClipBoardMsg()}
    </section>
  );
}

RecipeFavoriteCard.propTypes = {
  recipeDone: shape({
    id: string,
    type: string,
    area: string,
    category: string,
    alcoholicOrNot: string,
    name: string,
    image: string,
    doneDate: string,
    tags: string,
  }),
  index: number,
  setHasBeenChanged: func,
}.isRequired;
