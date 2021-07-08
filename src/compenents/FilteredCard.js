import React from 'react';
import '../styles/SearchBar.css';
import { string, number } from 'prop-types';

function FilteredCard({ index, thumbnail, name }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ thumbnail }
        alt={ `${name} recipe` }
        className="filtered-cards"
      />
      <h2 data-testid={ `${index}-card-name` }>{name}</h2>
    </div>
  );
}

FilteredCard.propTypes = {
  index: number.isRequired,
  thumbnail: string.isRequired,
  name: string.isRequired,
};

export default FilteredCard;
