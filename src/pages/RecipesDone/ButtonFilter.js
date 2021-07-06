import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Context from '../../context/Context';
// import Mock from '../../services/mokcInformation';

function ButtonFilter() {
  // const informationLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'))
  const { doneFilter: handleClick } = useContext(Context);
  // setDoneRecipes(informationLocalStorage)
  return (
    <div className="buttons-filter-done">
      <Button
        variant="secondary"
        size="sm"
        data-testid="filter-by-all-btn"
        onClick={ (e) => handleClick(e) }
      >
        All
      </Button>
      <Button
        variant="secondary"
        size="sm"
        data-testid="filter-by-food-btn"
        onClick={ (e) => handleClick(e) }
      >
        Food
      </Button>
      <Button
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
