import React, { useContext } from 'react';
import Context from '../context/Context';

function ButtomFilters({ data }) {
  const { setCategory } = useContext(Context);

  const renderButtoms = () => {
    const magicNum = 5;
    const first5 = data.slice(0, magicNum);
    const arr2Render = ['All', ...first5];
    return arr2Render.map((categoryName) => (
      <li>
        <button
          type="button" 
          value={ categoryName }
          data-testid={ `${categoryName}-category-filter` }
          className="buttons"
          onClick={ ({ target: { value } }) => setCategory(value) }
        >
          { categoryName }
        </button>
      </li>
    ))
  }
  return (
    <fieldset className="Buttom-filters">
      <ul className="buttons-list ">
        { renderButtoms() }
      </ul>
    </fieldset>
  )
}

export default ButtomFilters
