import React from 'react';
import './styles.module.scss';
import Header from './Header';
import FoodImage from './FoodImage';
import LikeShareButton from './LikeShareButton';
import NameTypeRecipe from './NameTypeRecipe';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import TelaReceitaVideo from './TelaReceitaVideo';
import ReceitasRecomendadas from './ReceitasRecomendadas';

function TelaReceitaEmProgresso() {
  return (
    <div className="backGround">
      <Header />
      <FoodImage />
      <LikeShareButton />
      <NameTypeRecipe />
      <Ingredients />
      <Instructions />
      <TelaReceitaVideo />
      <ReceitasRecomendadas />
    </div>
  );
}

export default TelaReceitaEmProgresso;
