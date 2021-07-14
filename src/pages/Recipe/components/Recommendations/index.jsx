import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import RecipeSimpleCard
  from '../../../../components/RecipesCardsGrid/components/RecipeSimpleCard';

import styles from './styles.module.scss';

function Recommendations({ data }) {
  return (
    <div className={ styles.content }>
      {data.list.map((recommendation, index) => {
        const alcoholic = recommendation.strAlcoholic;
        return (
          <Link key={ recommendation.id } to={ `${data.path}/${recommendation.id}` }>
            <RecipeSimpleCard
              recipe={ recommendation }
              index={ index }
              alcoholic={
                alcoholic && alcoholic === 'Alcoholic'
              }
              recommendationCard
            />
          </Link>
        );
      })}
    </div>
  );
}

Recommendations.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Recommendations;
