import React from 'react';
import PropTypes from 'prop-types';

function DrinkProgress(props) {
  const { match: { params: { id } } } = props;
  return (
    <div>
      Bebida de ID :
      { id }
      em progresso
    </div>
  );
}

DrinkProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default DrinkProgress;
