import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import shareIcon from '../../../images/shareIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';

const favoriteRecipe = (recipe, type, isFavorited) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (isFavorited) {
    const removeFromList = favorites.filter((item) => !(
      item.id === recipe.idMeal
      || item.id === recipe.idDrink
    ));
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFromList));
  } else {
    const currentRecipe = {
      id: recipe.idMeal || recipe.idDrink,
      type: type === 'meals' ? 'comida' : 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strDrinkThumb || recipe.strMealThumb,
    };

    if (favorites) favorites.push(currentRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites || [currentRecipe]));
  }
};

function DetailsHeader(props) {
  const { recipe, type, pathname } = props;
  const title = recipe.strDrink || recipe.strMeal;
  const img = recipe.strDrinkThumb || recipe.strMealThumb;
  const category = recipe.strAlcoholic || recipe.strCategory;

  const [isFavorited, isFavoritedToggle] = useState(false);
  const [copyMessage, copyMessageToggle] = useState(true);

  // eslint-disable-next-line
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favorites) return;
    const checkFavorited = favorites.find((favoritedRecipe) => (
      favoritedRecipe.id === recipe.idMeal
      || favoritedRecipe.id === recipe.idDrink
    ));
    if (checkFavorited) isFavoritedToggle(true);
  });

  const copyToClipboard = () => {
    const link = `http://localhost:3000${pathname}`;
    navigator.clipboard.writeText(link);

    copyMessageToggle(false);

    const threeSeconds = 3000;
    setTimeout(() => {
      copyMessageToggle(true);
    }, threeSeconds);
  };

  return (
    <Container>
      <Row>
        <img src={ img } alt={ title } data-testid="recipe-photo" />
      </Row>
      <Row>
        <Col>
          <h1 data-testid="recipe-title">{ title }</h1>
        </Col>
        <Col>
          <span hidden={ copyMessage }>
            Link copiado!
          </span>
          <button
            type="button"
            onClick={ copyToClipboard }
          >
            <img src={ shareIcon } alt="Share icon" data-testid="share-btn" />
          </button>
          <button
            type="button"
            onClick={ () => {
              favoriteRecipe(recipe, type, isFavorited);
              isFavoritedToggle(!isFavorited);
            } }
          >
            <img
              src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
              alt="Share icon"
              data-testid="favorite-btn"
            />
          </button>
        </Col>
      </Row>
      <Row>
        <Col data-testid="recipe-category">
          { category }
        </Col>
      </Row>
    </Container>
  );
}

DetailsHeader.propTypes = {
  img: string,
  title: string,
}.isRequired;

export default DetailsHeader;
