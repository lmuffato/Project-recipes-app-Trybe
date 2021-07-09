// Filtros favoriteRecipes
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Context from '../../context/Context';

function ButtonFilter() {
  const {
    setFavFilter,
    setFavRecipes,
    setShowFilter,
    informationFavarite,
    favRecipes,
  } = useContext(Context);

  const handleClick = (e) => {
    const { innerText } = e.target;
    setFavFilter([]);
    setFavRecipes(informationFavarite);
    if (innerText === 'All') {
      setShowFilter(false);
      setFavRecipes(informationFavarite);
      setFavFilter([]);
    }
    if (innerText === 'Food') {
      setShowFilter(true);
      const newRecipes = favRecipes
        .filter((recipe) => (recipe.type === 'comida') && recipe);
      setFavFilter(newRecipes);
    }
    if (innerText === 'Drinks') {
      setShowFilter(true);
      const newRecipes = favRecipes
        .filter((recipe) => (recipe.type === 'bebida') && recipe);
      setFavFilter(newRecipes);
    }
  };
  return (
    <div className="buttons-filter-done">
      <Button
        bsPrefix="btn"
        className="buttons-filter"
        variant="secondary"
        size="sm"
        data-testid="filter-by-all-btn"
        onClick={ (e) => handleClick(e) }
      >
        All
      </Button>
      <Button
        bsPrefix="btn"
        className="buttons-filter"
        variant="secondary"
        size="sm"
        data-testid="filter-by-food-btn"
        onClick={ (e) => handleClick(e) }
      >
        Food
      </Button>
      <Button
        bsPrefix="btn"
        className="buttons-filter"
        variant="secondary"
        size="sm"
        data-testid="filter-by-drink-btn"
        onClick={ (e) => handleClick(e) }
      >
        Drinks
      </Button>
    </div>);
}
export default ButtonFilter;
