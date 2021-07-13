// Filtros doneRecipes
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Context from '../../context/Context';

function ButtonFilter() {
  const {
    setDoneFilter,
    setDoneRecipes,
    setShowFilter,
    informationDone,
    doneRecipes } = useContext(Context);
  const handleClick = (e) => {
    const { innerText } = e.target;
    setDoneFilter([]);
    setDoneRecipes(informationDone);
    if (innerText === 'All') {
      setShowFilter(false);
      setDoneRecipes(informationDone);
      setDoneFilter([]);
    }
    if (innerText === 'Food') {
      setShowFilter(true);
      const newRecipes = doneRecipes
        .filter((recipe) => (recipe.type === 'comida') && recipe);
      setDoneFilter(newRecipes);
    }
    if (innerText === 'Drinks') {
      setShowFilter(true);
      const newRecipes = doneRecipes
        .filter((recipe) => (recipe.type === 'bebida') && recipe);
      setDoneFilter(newRecipes);
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
