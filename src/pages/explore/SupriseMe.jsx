import React from 'react';

function SupriseMe({ type }) {
  console.log(type);
  return (
    <>
      Me Surpreenda!
    </>
  );
}

SupriseMe.propTypes = {
  type: string,
}.isRequired;

export default SupriseMe;
