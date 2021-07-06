import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';
import DrinkCardDetail from '../components/DrinkCardDetail';

function DrinkDetails({ match }) {
  const { id } = match.params;
  const { setGlobalId } = useContext(UserContext);

  useEffect(() => {
    setGlobalId(id);
  }, []);

  return (
    <div>
      <DrinkCardDetail />
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default DrinkDetails;
