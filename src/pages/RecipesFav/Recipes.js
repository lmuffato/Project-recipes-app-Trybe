// Receitas favoriteRecipes
import React, { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import './index.css';
import { Link } from 'react-router-dom';
import Share from '../../images/shareIcon.svg';
import Favorite from '../../images/blackHeartIcon.svg';
import Context from '../../context/Context';

const copy = require('clipboard-copy');

function Recipes() {
  const [showCopyFood, setShopFood] = useState(false);
  const [showCopyDrinks, setShopDrinks] = useState(false);
  const {
    favRecipes: noFilter,
    favFilterRecipes,
    showFilter,
    setFavRecipes } = useContext(Context);
  let favoriteRecipes = noFilter;
  if (!showFilter) {
    favoriteRecipes = noFilter;
  } else {
    favoriteRecipes = favFilterRecipes;
  }
  const copyLinkFood = (id) => {
    setShopFood(true);
    const show = () => {
      copy(`http://localhost:3000/comidas/${id}`);
    };
    show();
  };
  const copyLinkDrink = (id) => {
    setShopDrinks(true);
    const show = () => {
      copy(`http://localhost:3000/bebidas/${id}`);
    };
    show();
  };

  const desfavoiteRecipe = (id) => {
    // console.log(id);
    const newRecipes = noFilter.filter((recipe) => (recipe.id !== id) && recipe);
    console.log(newRecipes);
    setFavRecipes(newRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
  };

  const handleFood = (recipe, index) => (
    <Card
      bsPrefix="card-favorite"
      key={ index }
    >
      <Link
        className="card-img-favorite"
        key={ index }
        to={ `comidas/${recipe.id}` }
      >
        <Card.Img
          bsPrefix="card-image-favorite"
          variant="bottom"
          src={ recipe.image }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Card.Body>
        {showCopyFood ? <p className="text-copy">Link copiado!</p>
          : (
            <Button
              bsPrefix="button-favorite"
              variant="primary"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ Share }
              onClick={ () => copyLinkFood(recipe.id) }
            >
              <Card.Img
                variant="top"
                src={ Share }
              />
            </Button>)}
        <Button
          bsPrefix="button-favorite"
          variant="primary"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ Favorite }
          onClick={ () => desfavoiteRecipe(recipe.id) }
        >
          <Card.Img
            variant="top"
            src={ Favorite }
          />
        </Button>
        <Card.Text
          bsPrefix="card-text-category"
          data-testid={ `${index}-horizontal-top-text` }
        >
          {` ${recipe.area} - ${recipe.category} `}
        </Card.Text>
        <Link key={ index } to={ `comidas/${recipe.id}` }>
          <Card.Title
            bsPrefix="card-title-favorite"
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.name}
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
  const handleDrink = (recipe, index) => (
    <Card
      bsPrefix="card-favorite"
      key={ index }
    >
      <Link
        className="card-img-favorite"
        key={ index }
        to={ `bebidas/${recipe.id}` }
      >
        <Card.Img
          bsPrefix="card-image-favorite"
          variant="bottom"
          src={ recipe.image }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Card.Body>
        {showCopyDrinks ? <p className="text-copy">Link copiado!</p>
          : (
            <Button
              bsPrefix="button-favorite"
              variant="primary"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ Share }
              onClick={ () => copyLinkDrink(recipe.id) }
            >
              <Card.Img
                variant="top"
                src={ Share }
              />
            </Button>)}
        <Button
          bsPrefix="button-favorite"
          variant="primary"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ Favorite }
          onClick={ () => desfavoiteRecipe(recipe.id) }
        >
          <Card.Img
            variant="top"
            src={ Favorite }
          />
        </Button>
        <Card.Text
          data-testid={ `${index}-horizontal-top-text` }
          bsPrefix="card-text-category"
        >
          {`${recipe.alcoholicOrNot}`}
        </Card.Text>
        <Link key={ index } to={ `bebidas/${recipe.id}` }>
          <Card.Title
            bsPrefix="card-title-favorite"
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.name}
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
  return (
    <div className="cards-favorite">
      { (favoriteRecipes) && favoriteRecipes.map((recipe, index) => (
        recipe.type === 'comida' ? handleFood(recipe, index) : handleDrink(recipe, index)
      ))}
    </div>
  );
}

export default Recipes;
