import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Context from '../../../context/Context';

function FilterFoods() {
  const { categoryFoods, clickFilterFood: handleClick } = useContext(Context);
  const lengthMax = 5;

  const setButoons = () => {
    if (categoryFoods !== []) {
      const categorys = categoryFoods.slice(0, lengthMax);
      return (
        <div className="buttonsCategoryFood">
          <Button
            bsPrefix="btn"
            className="buttons-filter"
            key={ (0) }
            variant="secondary"
            size="sm"
            data-testid="All-category-filter"
            onClick={ (e) => handleClick(e) }
          >
            All
          </Button>
          {categorys.map((category, index) => (
            // https://react-bootstrap.netlify.app/components/buttons/#buttons
            <Button
              bsPrefix="btn"
              className="buttons-filter"
              key={ (index + 1) }
              variant="secondary"
              size="sm"
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ (e) => handleClick(e) }
            >
              { category.strCategory}
            </Button>
          ))}
        </div>
      );
    }
  };
  return (
    setButoons()
  );
}

export default FilterFoods;
