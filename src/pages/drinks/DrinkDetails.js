import React from 'react';
import PropTypes from 'prop-types';

function DrinkDetails(props) {
  const { match: { params: { id } } } = props;
  return (
    <div>
      Bebida de ID :
      { id }
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetails;
