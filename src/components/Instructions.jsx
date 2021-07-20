import React from 'react';
import PropTypes from 'prop-types';
import '../styleSheets/ContentDetail.css';

function Instructions(props) {
  const { instructions } = props;
  return (
    <section
      className="container-content"
    >
      <h3
        className="title-content"
      >
        Instructions
      </h3>
      <p
        data-testid="instructions"
        className="field-content"
      >
        { instructions }
      </p>
    </section>
  );
}

Instructions.propTypes = {
  instructions: PropTypes.string.isRequired,
};

export default Instructions;
