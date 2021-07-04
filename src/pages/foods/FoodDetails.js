import React from 'react';
import PropTypes from 'prop-types';

function FoodDetails(props) {
  const { match: { params: { id } } } = props;
  return (
    <div>
      Comida de ID :
      { id }
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default FoodDetails;
