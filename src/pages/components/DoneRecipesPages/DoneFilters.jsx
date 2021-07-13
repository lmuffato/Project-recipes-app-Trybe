import React, { useState } from 'react';
import Header from '../Header';
import RecipeFilters from './RecipeFilters';
import RecipesDone from './RecipesDone';

export default function DoneFilters() {
  const [filter, setFilter] = useState('All');
  const handleClick = (props) => {
    setFilter(props);
  };
  return (
    <div className="doneRecipes-div">
      <Header type="done-recipes" />
      <RecipeFilters handleClick={ handleClick } />
      <RecipesDone filter={ filter } />
    </div>
  );
}
