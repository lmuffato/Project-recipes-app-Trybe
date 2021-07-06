import React from 'react';
import { string } from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import shareIcon from '../../../images/shareIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';

function DetailsHeader(props) {
  const { recipe } = props;
  const title = recipe.strDrink || recipe.strMeal;
  const img = recipe.strDrinkThumb || recipe.strMealThumb;
  const category = recipe.strAlcoholic || recipe.strCategory;

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
          <img src={ whiteHeartIcon } alt="Share icon" data-testid="favorite-btn" />
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
