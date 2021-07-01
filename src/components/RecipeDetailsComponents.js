import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import RecipeImage from './RecipeComponents/RecipeImage';
import RecipeTitle from './RecipeComponents/RecipeTitle';
import ShareBtn from './RecipeComponents/ShareButton';
import FavBtn from './RecipeComponents/FavoriteButton';
import RecipeCatg from './RecipeComponents/RecipeCategory';
import BottomBtn from './RecipeComponents/BottomButton';
import RecipeInst from './RecipeComponents/RecipeInstructions';

function ComponentGen(props) {
  const { info, listCreator, recomendList } = props;
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = info;
  const { strDrinkThumb, strDrink, strAlcoholic } = info;
  return (
    <div className="recipe_details">
      <RecipeImage origin={ strMealThumb || strDrinkThumb } />
      <RecipeTitle title={ strMeal || strDrink } />
      <ShareBtn />
      <FavBtn />
      { strAlcoholic !== undefined
        ? <RecipeCatg category={ `${strCategory} ${strAlcoholic}` } />
        : <RecipeCatg category={ strCategory } />}
      <h3>Ingredientes</h3>
      {listCreator}
      <h3>Instruções</h3>
      <RecipeInst instructions={ strInstructions } />
      <h3>Vídeo</h3>
      <video src={ strYoutube } data-testid="video"><track kind="captions" /></video>
      <h3>Recomendadas</h3>
      <Carousel>
        {recomendList}
      </Carousel>
      <BottomBtn />
    </div>
  );
}

ComponentGen.propTypes = {
  info: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  listCreator: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  recomendList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default ComponentGen;
