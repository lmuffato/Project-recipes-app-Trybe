import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import ShareButtonRecipes from '../ShareButtonRecipes';

function FavoritesCard({ recipeArray, setFavRecipesStorage }) {
  const removeFavorite = (recipe) => {
    const removedItem = recipeArray.filter((item) => item.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removedItem));
    setFavRecipesStorage(removedItem);
  };

  return (
    <div>
      {recipeArray.map((recipe, index) => (
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
            <div>
              <input
                type="image"
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="favorite button"
                onClick={ () => removeFavorite(recipe) }
              />
            </div>
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
