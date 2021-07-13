import React from 'react';
import { BiShareAlt } from 'react-icons/bi';
import { number, shape, string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import useClipBoard from '../../hooks/useClipboard';
import {
  ContainerRecipeCardInfos,
  ContainerInfos,
  ContainerButton,
} from './styles';

export default function RecipeDoneCard({ recipeDone, index }) {
  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
  } = recipeDone;
  const {
    showClipBoardMsg,
    copyToClipBoard,
    renderClipBoardMsg,
  } = useClipBoard(id, type.concat('s'));
  const { push } = useHistory();

  const spliteredTags = tags.includes(',') ? tags.split(',') : tags;
  const firstTag = typeof spliteredTags === 'string' ? spliteredTags : spliteredTags[0];
  const secondTag = typeof spliteredTags === 'string' ? '' : spliteredTags[1];
  const isCategoryOrAlcoholic = alcoholicOrNot || category;

  const styleImg = {
    width: '128px',
  };

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
        <ContainerInfos>
          <span data-testid={ `${index}-horizontal-top-text` }>
            {`${area} - ${isCategoryOrAlcoholic}`}
          </span>

          <span data-testid={ `${index}-horizontal-done-date` }>{doneDate}</span>

          <span data-testid={ `${index}-${firstTag}-horizontal-tag` }>
            {firstTag}
          </span>

          <span data-testid={ `${index}-${secondTag}-horizontal-tag` }>
            {secondTag}
          </span>
        </ContainerInfos>

        <ContainerButton>
          <button type="button" onClick={ copyToClipBoard }>
            <BiShareAlt
              data-testid={ `${index}-horizontal-share-btn` }
              alt="Share recipe"
            />
          </button>
        </ContainerButton>
      </ContainerRecipeCardInfos>

      {showClipBoardMsg && renderClipBoardMsg()}
    </section>
  );
}

RecipeDoneCard.propTypes = {
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
}.isRequired;
