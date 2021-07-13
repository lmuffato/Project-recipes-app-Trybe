import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ShareButtonRecipes from '../ShareButtonRecipes';
import './styles.css';

function TitleDoneRecipes({ recipe, index }) {
  return (
    <div className="top-group">
      <Link
        to={ recipe.type === 'comida'
          ? `comidas/${recipe.id}`
          : `bebidas/${recipe.id}` }
      >
        <Card.Title
          data-testid={ `${index}-horizontal-name` }
          className="title-done"
        >
          {recipe.name}
        </Card.Title>
      </Link>
      <ShareButtonRecipes
        dataTest={ `${index}-horizontal-share-btn` }
        recipe={ recipe }
      />
    </div>
  );
}

TitleDoneRecipes.propTypes = {
  index: PropTypes.string,
  recipe: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default TitleDoneRecipes;
