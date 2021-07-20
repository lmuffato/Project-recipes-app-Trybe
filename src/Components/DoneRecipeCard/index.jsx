import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.css';
import TitleDoneRecipes from './TitleDoneRecipes';

function DoneRecipeCard({ doneRecipes }) {
  return (
    <div className="recipe-cards-parent">
      { doneRecipes.map((recipe, index) => (
        <Card
          key={ `recipe-card-${index}` }
          className="card-recipes-done"
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
              className="img-card-done"
            />
          </Link>
          <div>
            <Card.Header
              data-testid={ `${index}-horizontal-top-text` }
              className="header-done"
            >
              {recipe.type === 'comida'
                ? ` ${recipe.area} - ${recipe.category} `
                : recipe.alcoholicOrNot}
            </Card.Header>
            <Card.Body className="c-body">
              <TitleDoneRecipes recipe={ recipe } index={ index } />
              <div className="done-bottom">
                <p data-testid={ `${index}-horizontal-done-date` } className="p-done">
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
              </div>
            </Card.Body>
          </div>
        </Card>
      ))}
    </div>
  );
}

DoneRecipeCard.propTypes = {
  doneRecipes: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default DoneRecipeCard;
