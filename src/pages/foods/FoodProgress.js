import React from 'react';
import PropTypes from 'prop-types';

function FoodProgress(props) {
  const { match: { params: { id } } } = props;
  return (
    <div>
      Comida de ID :
      { id }
      em progresso
    </div>
  );
}

FoodProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default FoodProgress;
