import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function FilterDrinks(props) {
  const { address } = props;

  return (
    <>
      <div>
        <Link to={ address.ingredients }>
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
      </div>
      <div>
        <Link to={ address.random }>
          <button type="button" data-testid="explore-surprise">
            Me Surpreenda!
          </button>
        </Link>
      </div>
    </>
  );
}

FilterDrinks.propTypes = {
  address: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
