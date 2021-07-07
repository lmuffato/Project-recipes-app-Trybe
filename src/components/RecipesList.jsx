import React from 'react';
import PropTypes, { object } from 'prop-types';
import { Link } from 'react-router-dom';
import './RecipeList.css';

function RecipesList({ data }) {
  const renderCards = (param) => {
    console.log('data aqui mermão', data);
    const TWELVE = 12;
    if (param === undefined || param === null) {
      console.log('quebrei, ops');
    } else {
      const first12 = param.slice(0, TWELVE);
      const toReturn = first12.map((recipe, index) => {
        const { name, imgSrc, id } = recipe;
        return (
          // eslint-disable-next-line react/jsx-key
          <div className="card-container">
            <li data-testid={ `${index}-recipe-card` }>
              <Link to={ { pathname: `/comidas/${id}` } }>
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
          </div>
        );
      });
      return toReturn;
    }
  };

  return (
    <div className="component">
      <ul className="card-list">
        { renderCards(data) }
      </ul>
    </div>
  );
}

RecipesList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.arrayOf(object).isRequired,
};

export default RecipesList;
