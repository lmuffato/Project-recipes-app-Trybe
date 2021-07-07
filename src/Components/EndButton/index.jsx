import React from 'react';
import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function EndButton({ id, toggleURL, recipeStatus }) {
  return (
    <div className="btn-cntl">
      <Link to={ `/${toggleURL}/${id}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="init-btn btn btn-primary"
        >
          {recipeStatus}
        </button>
      </Link>
    </div>
  );
}

EndButton.propTypes = {
  id: PropTypes.string,
  toggleURL: PropTypes.string,
  recipeStatus: PropTypes.string,
}.isRequired;

export default EndButton;
