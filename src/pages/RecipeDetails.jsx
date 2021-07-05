import React from 'react';
import DetailsHeader from './components/DetailsPage/DetailsHeader';
import Ingredients from './components/DetailsPage/Ingredients';
import Instructions from './components/DetailsPage/Instructions';
import Video from './components/DetailsPage/Video';
import Recommendations from './components/DetailsPage/Recommendations';

function RecipeDetails() {
  return (
    <div>
      <DetailsHeader title="Recipe" />
      <Ingredients ingredients={ ['cebola', 'alho'] } />
      <Instructions />
      <Video />
      <Recommendations recommendations={ [{ name: 'Drink' }] } />
      <button type="button" data-testid="start-recipe-btn">Começar receita</button>
    </div>
  );
}

export default RecipeDetails;
