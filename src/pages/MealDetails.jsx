import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';
import MealCardDetail from '../components/MealCardDetail';

function MealDetails({ match }) {
  const { id } = match.params;
  const { setGlobalId } = useContext(UserContext);

  useEffect(() => {
    setGlobalId(id);
  }, []);

  return (
    <div>
      <MealCardDetail />
    </div>
  );
}

MealDetails.propTypes = {
  match: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default MealDetails;
