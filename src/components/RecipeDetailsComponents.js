import React from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';

function ComponentGen(props) {
  const { info, listCreator, recomendList } = props;
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = info;
  const { strDrinkThumb, strDrink, strAlcoholic } = info;
  return (
    <div className="recipe_details">
      <img
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt="recipe"
        style={ { height: '200px' } }
      />
      <p data-testid="recipe-title">{strMeal || strDrink }</p>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      { strAlcoholic !== undefined
        ? <p data-testid="recipe-category">{`${strCategory} ${strAlcoholic}`}</p>
        : <p data-testid="recipe-category">{strCategory}</p>}
      {listCreator}
      <ul data-testid="instructions">{strInstructions}</ul>
      <video src={ strYoutube } data-testid="video"><track kind="captions" /></video>
      <Carousel>
        {recomendList}
      </Carousel>
      <div className="btnDiv">
        <Button
          type="button"
          data-testid="start-recipe-btn"
          variant="secondary"
          className="startBtn"
        >
          Iniciar Receita
        </Button>
      </div>
    </div>
  );
}

ComponentGen.propTypes = {
  info: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  listCreator: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  recomendList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default ComponentGen;
