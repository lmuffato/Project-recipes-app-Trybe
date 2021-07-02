import React from 'react';
import { string, number } from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function RecipeCard({ index, thumb, title, id }) {
  const { location, push } = useHistory();

  return (
    <section
      data-testid={ `${index}-recipe-card` }
      onClick={ () => push(`${location.pathname}/${id}`) }
      onKeyDown={ () => push(`${location.pathname}/${id}`) }
      role="button"
      tabIndex="0"
    >
      <p data-testid={ `${index}-card-name` }>{title}</p>
      <img data-testid={ `${index}-card-img` } src={ thumb } alt="Recipe" />
    </section>
  );
}

RecipeCard.propTypes = {
  index: number,
  thumb: string,
  title: string,
  id: string,
}.isRequired;
