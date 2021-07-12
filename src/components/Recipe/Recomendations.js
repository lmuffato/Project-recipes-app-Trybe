import { arrayOf, shape } from 'prop-types';
import React from 'react';
import Carousel from './Carousel';

function mapToDrink(item) {
  const { strDrink, strAlcoholic, strDrinkThumb } = item;
  return { title: strDrink, alcoholic: strAlcoholic, imgLink: strDrinkThumb };
}
function mapToMeal(item) {
  const { strMeal, strCategory, strMealThumb } = item;
  return { title: strMeal, alcoholic: strCategory, imgLink: strMealThumb };
}
function mapper(item) {
  if (item.idDrink) return mapToDrink(item);
  return mapToMeal(item);
}
function Recomendations({ list }) {
  const CAROUSEL_TOTAL_ITEMS = 6;
  return (
    <Carousel
      items={ list
        .filter((_, index) => index < CAROUSEL_TOTAL_ITEMS)
        .map(mapper) }
    />
  );
}

Recomendations.propTypes = {
  list: arrayOf(shape({})).isRequired,
};

export default Recomendations;
// { strDrink, strAlcoholic, strDrinkThumb }
// { title, alcoholic, imgLink }
