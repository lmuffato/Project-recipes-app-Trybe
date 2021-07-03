import React from 'react';
import PropTypes from 'prop-types';

export default function TagMaker(props) {
  const { index } = props;
  const retrieveLocalInfo = () => {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    return (local !== null && local);
  };
  return (
    <div>
      { retrieveLocalInfo() !== false
      && retrieveLocalInfo()
        .map((e) => e.tags
          .filter((ele, i) => i < 2).map((ele, i) => (
            <li data-testid={ `${index}-${ele}-horizontal-tag` } key={ i }>
              {ele}
            </li>)))}
    </div>
  );
}

TagMaker.propTypes = {
  index: PropTypes.number.isRequired,
};
