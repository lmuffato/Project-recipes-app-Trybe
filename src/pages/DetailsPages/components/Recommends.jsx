import React from 'react';

const Recommends = () => {
  const index = 1;
  return (
    <section>
      <h4>Recommended</h4>
      <div data-testid={ `${index}-recomendation-card` } />
    </section>
  );
};

export default Recommends;
