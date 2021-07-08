// Receitas doneRecipes
import React, { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import './index.css';
import { Link } from 'react-router-dom';
import Share from '../../images/shareIcon.svg';
import Context from '../../context/Context';

const copy = require('clipboard-copy');

function Recipes() {
  const [showCopyFood, setShopFood] = useState(false);
  const [showCopyDrinks, setShopDrinks] = useState(false);
  const { doneRecipes: noFilter, doneFilterRecipes, showFilter } = useContext(Context);
  let doneRecipes = noFilter;
  if (!showFilter) {
    doneRecipes = noFilter;
  } else {
    doneRecipes = doneFilterRecipes;
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

  const changeTags = (t, index) => {
    const tags = t.slice(0, 2);
    if (!Array.isArray(tags)) return null;
    return tags.map((tagName) => (
      <Card.Text
        data-testid={ `${index}-${tagName}-horizontal-tag` }
        key={ tagName }
      >
        { tagName}
      </Card.Text>));
  };
  const handleFood = (recipe, index) => (
    <Card style={ { width: '22rem' } } bsPrefix="card-img" key={ index }>
      <Link key={ index } to={ `comidas/${recipe.id}` }>
        <Card.Img
          variant="bottom"
          src={ recipe.image }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Card.Body>
        {showCopyFood ? <p>Link copiado!</p>
          : (
            <Button
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
        <Card.Text data-testid={ `${index}-horizontal-top-text` }>
          {` ${recipe.area} - ${recipe.category} `}
        </Card.Text>
        <Link key={ index } to={ `comidas/${recipe.id}` }>
          <Card.Title
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.name}
          </Card.Title>
        </Link>
        <Card.Text data-testid={ `${index}-horizontal-done-date` }>
          {`Feita em : ${recipe.doneDate}`}
        </Card.Text>
        <span>
          {changeTags(recipe.tags, index)}
        </span>
      </Card.Body>
    </Card>
  );
  const handleDrink = (recipe, index) => (
    <Card style={ { width: '22rem' } } bsPrefix="card-img" key={ index }>
      <Link key={ index } to={ `bebidas/${recipe.id}` }>
        <Card.Img
          variant="bottom"
          src={ recipe.image }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Card.Body>
        {showCopyDrinks ? <p>Link copiado!</p>
          : (
            <Button
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
        <Card.Text data-testid={ `${index}-horizontal-top-text` }>
          {`${recipe.alcoholicOrNot}`}
        </Card.Text>
        <Link key={ index } to={ `bebidas/${recipe.id}` }>
          <Card.Title
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.name}
          </Card.Title>
        </Link>
        <Card.Text data-testid={ `${index}-horizontal-done-date` }>
          {`Feita em: ${recipe.doneDate}`}
        </Card.Text>
        <span>
          {changeTags(recipe.tags, index)}
        </span>
      </Card.Body>
    </Card>
  );
  return (
    <div>
      {(doneRecipes) && doneRecipes.map((recipe, index) => (
        recipe.type === 'comida' ? handleFood(recipe, index) : handleDrink(recipe, index)
      ))}
    </div>
  );
}

export default Recipes;
