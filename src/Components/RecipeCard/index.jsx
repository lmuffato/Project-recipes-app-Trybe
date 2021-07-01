import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './styles.css';

function RecipeCard({ recipesArray }) {
  const { pathname } = useLocation();

  const toggleApiReturn = (pathname.includes('comidas')) ? 'strMeal' : 'strDrink';

  return (
    <div className="recipe-cards-parent">
      { recipesArray.map((recipe, index) => (
        <Card
          className="card"
          data-testid={ `${index}-recipe-card` }
          key={ `recipe-card-${index}` }
        >
          <Card.Img
            variant="top"
            src={ recipe[`${toggleApiReturn}Thumb`] }
            data-testid={ `${index}-card-img` }
          />
          <Card.Body>
            <Card.Title
              className="card-title"
              data-testid={ `${index}-card-name` }
            >
              { recipe[toggleApiReturn]}
            </Card.Title>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

RecipeCard.propTypes = {
  recipesArray: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string),
  ),
}.isRequired;

export default RecipeCard;
