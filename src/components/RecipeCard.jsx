import React from 'react';

export default function RecipeCard({ index, thumb, title }) {
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <p data-testid={ `${index}-card-name` }>{title}</p>
      <img data-testid={ `${index}-card-img` } src={ thumb } alt="Recipe" />
    </section>
  );
}
