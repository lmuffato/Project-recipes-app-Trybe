import React from 'react';
import { string } from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import shareIcon from '../../../images/shareIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';

function DetailsHeader(props) {
  const { recipe, type } = props;
  const title = recipe.strDrink || recipe.strMeal;
  const img = recipe.strDrinkThumb || recipe.strMealThumb;
  const category = recipe.strAlcoholic || recipe.strCategory;

  const favoriteRecipe = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
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
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites || [recipe]));
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
          <img src={ shareIcon } alt="Share icon" data-testid="share-btn" />
          <button type="button" onClick={ favoriteRecipe }>
            <img src={ whiteHeartIcon } alt="Share icon" data-testid="favorite-btn" />
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
