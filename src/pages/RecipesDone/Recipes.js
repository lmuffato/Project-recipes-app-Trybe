import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './index.css';
import Share from '../../images/shareIcon.svg';

function Recipes() {
  // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'))
  const doneRecipes = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
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
        {/* <Card.Text>
          {`${recipe.alcoholicOrNot}`}
        </Card.Text>
        <Card.Text data-testid={ `${index}-horizontal-top-text` }>
          {`${recipe.area} - ${recipe.category} `}
        </Card.Text> */}
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
