import React, { useState } from 'react';
import FavoriteFilters from './components/FavoritePage/FavoriteFilters';
import Header from './components/Header';
import FavoriteRecipes from './components/FavoritePage/FavoriteRecipes';

export default function Favotire() {
  const [filter, setFilter] = useState('All');
  const handleClick = (props) => {
    setFilter(props);
  };
  return (
    <div className="favoriteRecipes-div">
      <Header type="favorites" />
      <FavoriteFilters handleClick={ handleClick } />
      <FavoriteRecipes filter={ filter } />
    </div>
  );
}
