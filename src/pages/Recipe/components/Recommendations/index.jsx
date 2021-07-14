import React from 'react';
import PropTypes from 'prop-types';

import RecipeSimpleCard
  from '../../../../components/RecipesCardsGrid/components/RecipeSimpleCard';

import styles from './styles.module.scss';

function Recommendations({ data }) {
  return (
    <div className={ styles.content }>
      {data.map((recommendation, index) => {
        const alcoholic = recommendation.strAlcoholic;
        return (
          <RecipeSimpleCard
            key={ recommendation.id }
            recipe={ recommendation }
            index={ index }
            alcoholic={
              alcoholic && alcoholic === 'Alcoholic'
            }
            recommendationCard
          />
        );
      })}
    </div>
  );
}

Recommendations.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Recommendations;
