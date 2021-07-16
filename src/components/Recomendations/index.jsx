import React from 'react';
import PropTypes from 'prop-types';

export default function Recomendations({ data }) {
  const title = data[0].strMeal !== undefined ? 'strMeal' : 'strDrink';
  return (
    <div>
      <ul>
        { data.map((reco, index) => {
          if (index < 2) {
            return (
              <li data-testid={ `${index}-recomendation-card` }>
                <span data-testid={ `${index}-recomentaion-tile` }>{ reco[title] }</span>
              </li>
            );
          }
          return (
            <li
              key={ reco[title] }
              data-testid={ `${index}-recomendation-card` }
            >
              <span data-testid={ `${index}-recomendation-title` }>{ reco[title] }</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Recomendations.propTypes = {
  data: PropTypes.arrayOf({}).isRequired,
};
