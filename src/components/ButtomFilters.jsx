import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import getFiltredMeals from '../services/getFiltredMeals';
import getFiltredDrinks from '../services/getFiltredDrinks';

function ButtomFilters({ data, path }) {
  const { setCategory, setFiltredList } = useContext(Context);
  const [toggle, setToggle] = useState({});

  const handleButtom = async (value) => {
    setCategory(value);
    let list = [];
    if (value !== 'All') {
      list = path === 'comidas' ? await getFiltredMeals(value)
        : await getFiltredDrinks(value);
    }
    setFiltredList([...list]);
    if (toggle[value]) {
      setCategory('All');
    }
    setToggle({ ...toggle, [value]: !toggle[value] });
  };

  const renderButtoms = () => {
    const magicNum = 5;
    const first5 = data.slice(0, magicNum);
    const arr2Render = ['All', ...first5];
    return arr2Render.map((categoryName) => (
      <li key={ categoryName }>
        <button
          type="button"
          value={ categoryName }
          data-testid={ `${categoryName}-category-filter` }
          className="button-to-filter"
          onClick={ ({ target: { value } }) => handleButtom(value) }
        >
          { categoryName }
        </button>
      </li>
    ));
  };

  return (
    <fieldset className="button-filters-container">
      <ul className="buttons-list ">
        { renderButtoms() }
      </ul>
    </fieldset>
  );
}

ButtomFilters.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  path: PropTypes.string.isRequired,
};

export default ButtomFilters;
