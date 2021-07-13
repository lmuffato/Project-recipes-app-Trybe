import React from 'react';

function RecomendationCards(props) {
  const { recipe } = props;
  return (
    <section data-testid="0-recomendation-card">
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="some food"
        width="80"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">
        { recipe.strMeal || recipe.strDrink }
      </h3>
    </section>
  );
}

export default RecomendationCards;
