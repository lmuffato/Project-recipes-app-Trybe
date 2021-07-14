import React from 'react';
import PropTypes from 'prop-types';

export default function TagMaker(props) {
  const { index, local } = props;
  // const retrieveLocalInfo = () => {
  //   const local = JSON.parse(localStorage.getItem('doneRecipes'));
  //   return (local !== null && local);
  // };
  return (
    <div>
      {local.tags[0] && local.tags[0].split(',').filter((ele, i) => i < 3)
        .map((ele, i) => (
          <li
            className="tag"
            data-testid={ `${index}-${ele}-horizontal-tag` }
            key={ i }
          >
            {ele}
          </li>
        ))}
    </div>
  );
}

TagMaker.propTypes = {
  index: PropTypes.number.isRequired,
  local: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
