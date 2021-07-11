import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from '../ShareButton';

function FavoritesCard({ recipeArray }) {
  const { pathname } = useLocation();

  const toggleLink = (pathname.includes('comidas')) ? 'comidas' : 'bebidas';
  return (
    <div>
      {recipeArray.map((recipe, index) => (
        <Card
          key={ `recipe-card-${index}` }
        >
          <Link
            key={ index }
            to={ {
              pathname: pathname.includes('comidas')
                ? `/${toggleLink}/${recipe.idMeal}`
                : `/${toggleLink}/${recipe.idDrink}`,
              state: recipe,
            } }
          >
            <Card.Img
              variant="top"
              src={ recipe[`${toggleApiReturn}Thumb`] }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <Card.Header
            data-testid={ `${index}-horizontal-top-text` }
          >
            Teste
          </Card.Header>
          <Card.Body>
            <Card.Title
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe[toggleApiReturn]}
            </Card.Title>

            <ShareButton dataTest={ `${index}-horizontal-share-btn` } />
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

FavoritesCard.propTypes = {
  recipeArray: PropTypes.objectOf(PropTypes.string),

}.isRequired;

export default FavoritesCard;
