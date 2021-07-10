import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/mapDetails.css';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';

function RendersFiltersArea({ area }) {
  const [apiHandleArea, setApiHandleArea] = useState([]);
  const { recipes: { foods } } = useContext(RecipesContext);
  const history = useHistory();

  const requestFoodsByArea = async (option) => {
    const number = 11;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${option}`);
    const date = await response.json();
    if (date.meals) {
      const filter = date.meals.filter((elem, index) => index <= number);
      setApiHandleArea(filter);
    }
  };

  const handleClick = (idMeal) => {
    const path = `/comidas/${idMeal}`;
    history.replace(path);
  };

  useEffect(() => {
    requestFoodsByArea(area);
  }, [area]);

  useEffect(() => {
    if (area === 'All') setApiHandleArea(foods);
  });

  return (
    <div>
      { apiHandleArea ? apiHandleArea.map(({ strMeal, strMealThumb, idMeal }, index) => (
        <div key={ strMeal } data-testid={ `${index}-recipe-card` }>
          <button
            type="button"
            className="effectBtn"
            onClick={ () => handleClick(idMeal) }
          >
            <img
              data-testid={ `${index}-card-img` }
              style={ { width: '300px' } }
              src={ strMealThumb }
              alt={ strMeal }
            />
            <h1 data-testid={ `${index}-card-name` }>{strMeal}</h1>
          </button>
        </div>
      )) : null }

    </div>
  );
}

RendersFiltersArea.propTypes = {
  area: PropTypes.string.isRequired,
};

export default RendersFiltersArea;
