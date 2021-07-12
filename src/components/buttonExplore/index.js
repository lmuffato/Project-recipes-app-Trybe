import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ButtonExplore({ title, path, dataTestId }) {
  return (
    <div>
      <Link to={ path }>
        <button
          type="button"
          data-testid={ dataTestId }
        >
          {title}
        </button>
      </Link>
    </div>
  );
}

ButtonExplore.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
}.isRequired;
