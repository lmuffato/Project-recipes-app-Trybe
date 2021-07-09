import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './styles.css';

function RecipeCard({ recipesArray }) {
  const NUMBER_OF_CARDS = 12;
  const { pathname } = useLocation();
  const toggleApiReturn = (pathname.includes('comidas')) ? 'strMeal' : 'strDrink';
  const toggleLink = (pathname.includes('comidas')) ? 'comidas' : 'bebidas';

  return (
    <div className="recipe-cards-parent">
      { recipesArray.reduce((acc, curr, index) => (
        index < NUMBER_OF_CARDS ? [...acc, curr] : acc
      ), []).map((recipe, index) => (
        <Card
          className="card"
          data-testid={ `${index}-recipe-card` }
          key={ `recipe-card-${index}` }
        >
          <Link
            key={ index }
            to={ { pathname: (pathname.includes('comidas'))
              ? `/${toggleLink}/${recipe.idMeal}`
              : `/${toggleLink}/${recipe.idDrink}`,
            state: recipe,
            } }
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
          </Link>
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
