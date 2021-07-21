import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function RenderSelect({ setArea }) {
  const [apiAreaName, setApiAreaName] = useState([]);

  const requestAreaName = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const date = await response.json();
    setApiAreaName(date.meals);
  };

  const handleChange = (({ target: { value } }) => {
    setArea(value);
  });

  useEffect(() => {
    requestAreaName();
  }, []);

  return (
    <div className="select-container-explore">
      <p className="slogan-explore">Desbrave o mundo gastronômico</p>
      { apiAreaName && (
        <select
          onChange={ handleChange }
          data-testid="explore-by-area-dropdown"
        >
          <option selected value="placeholder">Selecione um país...</option>
          <option data-testid="All-option">All</option>
          { apiAreaName.map(({ strArea }, index) => (
            <option data-testid={ `${strArea}-option` } key={ index }>
              {strArea}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

RenderSelect.propTypes = {
  setArea: PropTypes.func.isRequired,
};

export default RenderSelect;
