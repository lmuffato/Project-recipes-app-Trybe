import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router';
import { getRecipeByID } from '../../services/fetchRecipes';

function Details() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [recipesDetails, setRecipesDetails] = useState();
  const toggleApi = (pathname.includes('comidas')) ? 'meals' : 'drinks';

  useEffect(() => {
    getRecipeByID(pathname, id).then((response) => {
      setRecipesDetails(response[toggleApi]);
    });
  }, [id, pathname, toggleApi]);

  return (
    <Container>
      <Row>
        <Col>
          <Image thumbnail data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">Titulo</h1>
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <p data-testid="recipe-category">Texto</p>
          <Form.Check data-testid={ `${0}-ingredient-name-and-measure` } />
          <p data-testid="instructions">Instruções</p>
          { (pathname.includes('comidas'))
            ? <video data-testid="video"><track kind="captions" /></video>
            : ''}
          <Card data-testid={ `${0}-recomendation-card` }>Card</Card>
          <Button data-testid="start-recipe-btn">Iniciar Receita</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Details;
