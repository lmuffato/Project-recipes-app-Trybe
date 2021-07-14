import React from 'react';
import { BiShareAlt } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { func, number, shape, string } from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import useClipBoard from '../../hooks/useClipboard';
import useFavoriteRecipe from '../../hooks/useFavoriteRecipe';
import {
  ContainerRecipeCardInfos,
  ContainerShareAndFavorite,
} from './styles';

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
        <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
      </div>

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

      <ContainerRecipeCardInfos>
        <span data-testid={ `${index}-horizontal-top-text` }>
          {`${area} - ${isCategoryOrAlcoholic}`}
        </span>

        <ContainerShareAndFavorite>
          <button type="button" onClick={ copyToClipBoard }>
            <BiShareAlt
              data-testid={ `${index}-horizontal-share-btn` }
              alt="Share recipe"
            />
          </button>

          <button
            type="button"
            onClick={ () => {
              setHeart(recipeFavorite);
              setHasBeenChanged(true);
            } }
          >
            <AiFillHeart
              data-testid={ `${index}-horizontal-favorite-btn` }
              alt="Favorite recipe"
              src={ blackHeartIcon }
            />
          </button>
        </ContainerShareAndFavorite>
      </ContainerRecipeCardInfos>

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
