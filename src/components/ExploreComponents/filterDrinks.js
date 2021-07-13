import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/Explore.css';

export default function FilterDrinks(props) {
  const { address } = props;

  return (
    <div className="path-buttons-container">
      <div>
        <Link to={ address.ingredients }>
          <button className="path-btn" type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
      </div>
      <div>
        <Link to={ address.random }>
          <button className="path-btn" type="button" data-testid="explore-surprise">
            Me Surpreenda!
          </button>
        </Link>
      </div>
    </div>
  );
}

FilterDrinks.propTypes = {
  address: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
