import React from 'react';
import PropTypes from 'prop-types';

export default function List({ list, dataTestid }) {
  return (
    <ul className="details-cards">
      { list.map((item, index) => (
        <li
          key={ index }
          data-testid={ `${index}${dataTestid}` }
        >
          { item }
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.instanceOf(Array).isRequired,
  dataTestid: PropTypes.string.isRequired,
};
