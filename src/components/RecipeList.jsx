import React, { useEffect, useState } from 'react';
import { Button, Item } from 'semantic-ui-react';
import RecipeItem from './RecipeItem';

function RecipeList(Props) {
  const [filter, setFilter] = useState('');
  const { data } = Props;
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    if (filter === '') {
      setFilteredData(data);
    } else {
      const dataFilter = data.filter((filterRecipe) => filterRecipe.type === filter);
      setFilteredData(dataFilter);
    }
  }, [data, filter]);
  if (!data) return <div>Nenhuma receita encontrada</div>;
  return (
    <>
      <Button.Group fluid>
        <Button
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('') }
        >
          All
        </Button>
        <Button
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('comida') }
        >
          Food
        </Button>
        <Button
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('bebida') }
        >
          Drinks
        </Button>
      </Button.Group>
      <Item.Group divided unstackable style={ { margin: 5 } }>
        {filteredData.map((recipe, index) => (
          <RecipeItem key={ index } index={ index } data={ recipe } />
        ))}
      </Item.Group>
    </>
  );
}

export default RecipeList;
