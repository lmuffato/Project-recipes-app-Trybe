import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function FilterFood(props) {
  const { address, display } = props;

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
        <Link to={ address.area }>
          <button type="button" data-testid="explore-by-area">
            Por Local de Origem
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

FilterFood.propTypes = {
  display: PropTypes.string.isRequired,
  address: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
