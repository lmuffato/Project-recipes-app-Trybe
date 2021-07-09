import React from 'react';
import PropTypes from 'prop-types';

export default function List({ list, dataTestid }) {
  return (
    <ul>
      { list.map((item, index) => (
        <li
          data-testid={ `${index}${dataTestid}` }
          key={ index }
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
