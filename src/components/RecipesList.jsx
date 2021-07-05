import React from 'react';
import PropTypes, { object } from 'prop-types';
import { Link } from 'react-router-dom';
import './RecipeList.css';

function RecipesList({ data }) {
  
  const renderCards = (data) => {
    const first12 = data.slice(0, 12);
    const toReturn = first12.map((recipe, index) => {
      const { name, imgSrc, id } = recipe;
      return (
        <li
          data-testid={ `${index}-recipe-card` }
        >
          <Link to={ { pathname:`/comidas/${id}` } }>
            <div className="card">
              <img
                src={ `${imgSrc}` }
                alt={ `${name} thumb` }
                data-testid={ `${index}-card-img` }
                className="recipe-img"
              />
              <h4
                data-testid={ `${index}-card-name` }
                className="recipe-name"
              >
                { `${name}` }
              </h4>
            </div>
          </Link>
        </li>
      );
    });
    return toReturn;
  }

  return (
    <div className="component">
      <ul className="card-list">
        { renderCards(data) }
      </ul>
    </div>
  )
}

RecipesList.propTypes = {
  data: PropTypes.arrayOf(object).isRequired,
};

export default RecipesList
