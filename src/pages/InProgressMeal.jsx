import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';
import InProgressMealCard from '../components/InProgressMealCard';

function InProgressMeal({ match }) {
  const { id } = match.params;
  const { setGlobalId } = useContext(UserContext);

  useEffect(() => {
    setGlobalId(id);
  }, []);

  return (
    <div>
      <InProgressMealCard />
    </div>
  );
}

InProgressMeal.propTypes = {
  match: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default InProgressMeal;
