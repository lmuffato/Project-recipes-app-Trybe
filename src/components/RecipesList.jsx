import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './RecipeList.css';

function RecipesList({ data, path }) {
  const renderCards = () => {
    const magicNum = 12;
    const first12 = data.slice(0, magicNum);
    const toReturn = first12.map((recipe, index) => {
      const { name, imgSrc, id } = recipe;
      return (
        <li
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <Link to={ { pathname: `/${path}/${id}` } }>
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
  };

  return (
    <div className="component">
      <ul className="card-list">
        { renderCards() }
      </ul>
    </div>
  );
}

RecipesList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  path: PropTypes.string.isRequired,
};

export default RecipesList;
