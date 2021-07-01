import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from '../contexts/ReceitasContext';

function Button({ clas, index, page }) {
  const { fetchApi, setFilter, selected, setSelected } = useContext(ReceitasContext);

  function handleChange(event) {
    if (page === 'comidas' && event.target.value !== 'All') {
      fetchApi(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${event.target.value}`, 'comidas');
      setFilter(true);
      setSelected(event.target.value);
    } else if (page === 'bebidas' && event.target.value !== 'All') {
      fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${event.target.value}`, 'bebidas');
      setFilter(true);
      setSelected(event.target.value);
    }
  }

  function handleClick(event) {
    if (selected === event.target.value || event.target.value === 'All') {
      event.target.checked = false;
      if (page === 'comidas') {
        fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'comidas');
      } else {
        fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'bebidas');
      }
    }
  }

  return (
    <label key={ index } htmlFor={ clas.strCategory }>
      <input
        type="radio"
        data-testid={ `${clas.strCategory}-category-filter` }
        onChange={ handleChange }
        id={ clas.strCategory }
        name="class"
        value={ clas.strCategory }
        onClick={ handleClick }
      />
      {clas.strCategory}
    </label>

  );
}

Button.propTypes = {
  clas: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  page: PropTypes.string.isRequired,
};

export default Button;
