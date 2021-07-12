import React from 'react';
import { string, number } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ContainerCard, ButtonCard } from './styles';

export default function RecipeCard({ index, thumb, title, id }) {
  const { location, push } = useHistory();
  const isDrinkOrFood = location.pathname.includes('comidas')
    ? 'comidas'
    : 'bebidas';

  return (
    <ContainerCard
      data-testid={ `${index}-recipe-card` }
      onClick={ () => push(`/${isDrinkOrFood}/${id}`) }
      onKeyDown={ () => push(`/${isDrinkOrFood}/${id}`) }
      role="button"
      tabIndex="0"
    >
      <img data-testid={ `${index}-card-img` } src={ thumb } alt="Recipe" />
      <ButtonCard type="button" data-testid={ `${index}-card-name` }>
        {title}
      </ButtonCard>
    </ContainerCard>
  );
}

RecipeCard.propTypes = {
  index: number,
  thumb: string,
  title: string,
  id: string,
}.isRequired;
