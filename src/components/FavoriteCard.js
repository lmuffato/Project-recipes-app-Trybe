import { number, string } from 'prop-types';
import React from 'react';
import Favorite from './Favorite';

function FavoriteCard({ id, type, area, category, alcoholicOrNot, name, image, index }) {
  return (
    <section>
      <Favorite.Image
        index={ index }
        url={ image }
        type={ type }
        id={ id }
      />
      <Favorite.Category
        index={ index }
        category={ type === 'comida' ? `${area} - ${category}` : alcoholicOrNot }
      />
      <Favorite.Title
        index={ index }
        title={ name }
        type={ type }
        id={ id }
      />
      <Favorite.Share
        id={ id }
        index={ index }
        type={ `${type}s` }
      />
      {type === 'comida' ? <Favorite.FavoriteMeal id={ id } index={ index } />
        : <Favorite.FavoriteDrink id={ id } index={ index } />}

    </section>
  );
}

FavoriteCard.propTypes = {
  id: string.isRequired,
  index: number.isRequired,
  type: string.isRequired,
  name: string.isRequired,
  image: string.isRequired,
  category: string.isRequired,
  area: string,
  alcoholicOrNot: string,
};

FavoriteCard.defaultProps = {
  area: '',
  alcoholicOrNot: '',
};

export default FavoriteCard;
