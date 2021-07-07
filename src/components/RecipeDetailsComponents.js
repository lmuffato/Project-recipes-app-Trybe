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
import VideoCtn from './RecipeComponents/VideoContainer';

function ComponentGen(props) {
  const { info, listCreator, recomendList } = props;
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = info;
  const { strDrinkThumb, strDrink, strAlcoholic, idDrink, idMeal, strArea } = info;
  let currentInfo = [];

  if (idDrink !== undefined) {
    currentInfo = [{
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    }];
  } else {
    currentInfo = [{
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory || '',
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    }];
  }
  return (
    <div className="recipe_details">
      <RecipeImage origin={ strMealThumb || strDrinkThumb } />
      <RecipeTitle title={ strMeal || strDrink } />
      <ShareBtn dataTest="share-btn" />
      <FavBtn info={ currentInfo } />
      { strAlcoholic !== undefined
        ? <RecipeCatg category={ `${strCategory} ${strAlcoholic}` } />
        : <RecipeCatg category={ strCategory } />}
      <h3>Ingredientes</h3>
      {listCreator}
      <h3>Instruções</h3>
      <RecipeInst instructions={ strInstructions } />
      { strMeal !== undefined && <VideoCtn src={ strYoutube } /> }
      <h3>Recomendadas</h3>
      <Carousel>
        {recomendList}
      </Carousel>
      <BottomBtn info={ info } />
    </div>
  );
}

ComponentGen.propTypes = {
  info: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  listCreator: PropTypes.func.isRequired,
  recomendList: PropTypes.func.isRequired,
};

export default ComponentGen;
