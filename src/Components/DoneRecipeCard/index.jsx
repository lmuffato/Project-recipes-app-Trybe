import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ShareButtonRecipes from '../ShareButtonRecipes';

function DoneRecipeCard({ doneRecipes }) {
  return (
    <div>
      { doneRecipes.map((recipe, index) => (
        <Card
          key={ `recipe-card-${index}` }
        >
          <Link
            to={ recipe.type === 'comida'
              ? `comidas/${recipe.id}`
              : `bebidas/${recipe.id}` }
          >
            <Card.Img
              variant="top"
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <Card.Header
            data-testid={ `${index}-horizontal-top-text` }
          >
            {recipe.type === 'comida'
              ? ` ${recipe.area} - ${recipe.category} `
              : recipe.alcoholicOrNot}
          </Card.Header>
          <Card.Body>
            <Link
              to={ recipe.type === 'comida'
                ? `comidas/${recipe.id}`
                : `bebidas/${recipe.id}` }
            >
              <Card.Title
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </Card.Title>
            </Link>
            <ShareButtonRecipes
              dataTest={ `${index}-horizontal-share-btn` }
              recipe={ recipe }
            />
            <p data-testid={ `${index}-horizontal-done-date` }>
              {`Feita em: ${recipe.doneDate}`}
            </p>
            <span
              data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }
            >
              {recipe.tags[0]}
            </span>
            <span
              data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }
            >
              {recipe.tags[1]}
            </span>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

DoneRecipeCard.propTypes = {
  doneRecipes: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default DoneRecipeCard;
