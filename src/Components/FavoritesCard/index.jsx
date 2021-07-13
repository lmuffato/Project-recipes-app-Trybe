import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import ShareButtonRecipes from '../ShareButtonRecipes';
import './styles.css';

function FavoritesCard({ recipes, setStorage }) {
  const removeFavorite = (recipe) => {
    const removedItem = recipes.filter((item) => item.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removedItem));
    setStorage(removedItem);
  };

  return (
    <div className="recipe-cards-parent">
      {recipes.map((recipe, index) => (
        <Card
          key={ `recipe-card-${index}` }
          className="card-recipes-done"
        >
          <div>
            <Link
              to={ recipe.type === 'comida'
                ? `comidas/${recipe.id}`
                : `bebidas/${recipe.id}` }
            >
              <Card.Img
                variant="top"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                className="img-card-done "
              />
            </Link>
          </div>
          <div>
            <Card.Header
              data-testid={ `${index}-horizontal-top-text` }
              className="header-done header-fav"
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
              <div className="btns-fav">
                <ShareButtonRecipes
                  dataTest={ `${index}-horizontal-share-btn` }
                  recipe={ recipe }
                />
                <input
                  type="image"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="favorite button"
                  onClick={ () => removeFavorite(recipe) }
                />
              </div>
            </Card.Body>
          </div>
        </Card>
      ))}
    </div>
  );
}

FavoritesCard.propTypes = {
  recipes: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default FavoritesCard;
