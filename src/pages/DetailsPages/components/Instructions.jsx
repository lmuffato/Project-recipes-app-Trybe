// Componente q vai renderizar as intruções da receita.
// Foi criado aqui
import React from 'react';
import PropTypes from 'prop-types';

const Instructions = ({ recipe }) => (
  <>
    <h4>Instructions</h4>
    <section>
      <p data-testid="instructions">
        { recipe.strInstructions }
      </p>
    </section>
  </>
);

Instructions.propTypes = {
  instruct: PropTypes.string,
}.isRequired;

export default Instructions;
