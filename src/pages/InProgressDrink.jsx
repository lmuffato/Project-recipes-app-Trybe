import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';
import InProgressDrinkCard from '../components/InProgressDrinkCard';

function InProgressDrink({ match }) {
  const { id } = match.params;
  const { setGlobalId } = useContext(UserContext);

  useEffect(() => {
    setGlobalId(id);
  }, []);

  return (
    <div>
      <InProgressDrinkCard />
    </div>
  );
}

InProgressDrink.propTypes = {
  match: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default InProgressDrink;
