import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import './index.css';
import Share from '../../images/shareIcon.svg';
import Context from '../../context/Context';

function Recipes() {
  const { doneRecipes: noFilter, doneFilterRecipes, showFilter } = useContext(Context);
  let doneRecipes = noFilter;
  if (!showFilter) {
    doneRecipes = noFilter;
  } else {
    doneRecipes = doneFilterRecipes;
  }
  const changeTags = (t, index) => {
    const tags = t.slice(0, 2);
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
      <Card.Img
        variant="bottom"
        src={ recipe.image }
        data-testid={ `${index}-horizontal-image` }
      />
      <Card.Body>
        <Button
          variant="primary"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ Share }
        >
          <Card.Img
            variant="top"
            src={ Share }
          />
        </Button>
        <Card.Text data-testid={ `${index}-horizontal-top-text` }>
          {` ${recipe.area} - ${recipe.category} `}
        </Card.Text>
        <Card.Title
          data-testid={ `${index}-horizontal-name` }
        >
          {recipe.name}
        </Card.Title>
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
      <Card.Img
        variant="bottom"
        src={ recipe.image }
        data-testid={ `${index}-horizontal-image` }
      />
      <Card.Body>
        <Button
          variant="primary"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ Share }
        >
          <Card.Img
            variant="top"
            src={ Share }
          />
        </Button>
        <Card.Text data-testid={ `${index}-horizontal-top-text` }>
          {`${recipe.alcoholicOrNot}`}
        </Card.Text>
        <Card.Title
          data-testid={ `${index}-horizontal-name` }
        >
          {recipe.name}
        </Card.Title>
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
    <>
      {doneRecipes.map((recipe, index) => (
        recipe.type === 'comida' ? handleFood(recipe, index) : handleDrink(recipe, index)
      ))}
    </>
  );
}

export default Recipes;
