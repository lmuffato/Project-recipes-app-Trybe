import React from 'react';
import { string } from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import shareIcon from '../../../images/shareIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';

function DetailsHeader(props) {
  const { img, title, category } = props;
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
          Categoria
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
