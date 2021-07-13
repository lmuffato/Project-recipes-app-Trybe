import React from 'react';
import { Button, Item } from 'semantic-ui-react';
import RecipeItem from './RecipeItem';

function RecipeList(Props) {
  const { data } = Props;
  if (!data) return <div>Nenhuma receita encontrada</div>;
  return (
    <>
      <Button.Group fluid>
        <Button data-testid="filter-by-all-btn">All</Button>
        <Button data-testid="filter-by-food-btn">Food</Button>
        <Button data-testid="filter-by-drink-btn">Drinks</Button>
      </Button.Group>
      <Item.Group divided unstackable style={ { margin: 5 } }>
        {data.map((recipe, index) => (
          <RecipeItem key={ index } index={ index } data={ recipe } />
        ))}
      </Item.Group>
    </>
  );
}

export default RecipeList;
