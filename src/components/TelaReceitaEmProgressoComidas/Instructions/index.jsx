import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getIngredients from '../../../services/getIngredients';
import styles from './styles.module.scss';

function Instructions() {
  const [instructions, setInstructions] = useState([]);
  const { id } = useParams();
  const objeto = 'strInstructions';

  useEffect(() => {
    getIngredients(id, objeto, setInstructions);
  },
  [id]);

  return (
    instructions.map((instr) => (
      <div id={ styles.instructions } data-testid="instructions" key="instructions">
        <h4>Instructions</h4>
        <div data-testid="recipe-category">
          {instr}
        </div>
      </div>
    ))

  );
}

export default Instructions;
