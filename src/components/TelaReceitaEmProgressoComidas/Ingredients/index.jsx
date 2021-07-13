import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import getIngredients from '../../../services/getIngredients';
import styles from './styles.module.scss';

function Ingredients() {
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const { id } = useParams();
  const objeto = 'strIngredient';

  const capitalizeFirstLetter = (letter) => letter
    .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

  function handleCheck(ind) {
    setDisabled(ind);
  }

  useEffect(() => {
    getIngredients(id, objeto, setRecipeIngredients);
  },
  [id]);

  return (
    <div id={ styles.ingredients }>
      <h4>Ingredients</h4>
      {recipeIngredients.map((item, index) => (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <label htmlFor={ index } className={ styles.container }>
            <input
              type="checkbox"
              id={ index }
              name={ index }
              value={ item }
              onChange={ () => handleCheck(index) }
            />
            <span className={ styles.checkmark }>{capitalizeFirstLetter(item)}</span>
          </label>
        </div>
      ))}
      <Link to="/receitas-feitas">
        <button
          type="button"
          id={ styles.botaofinalizarReceita }
          data-testid="finish-recipe-btn"
          disabled={ disabled }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default Ingredients;
