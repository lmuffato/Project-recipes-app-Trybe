import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styles from '../styles/Cards.module.scss';

function Cards({ el, index, path }) {
  const history = useHistory();
  const verifyPath = String(path).includes('comidas');
  const choiceRecipie = (element) => {
    if (verifyPath) {
      history.push(`/comidas/${element}`);
    } else {
      history.push(`/bebidas/${element}`);
    }
  };

  return (
    <div
      className={ styles.cardMealDrink }
      data-testid={ `${index}-recipe-card` }
      onClick={ () => choiceRecipie(`${verifyPath ? el.idMeal : el.idDrink}`) }
      aria-hidden="true"
    >
      <img
        src={ verifyPath ? el.strMealThumb : el.strDrinkThumb }
        alt={ verifyPath ? 'Food' : 'Drink' }
        width="100%"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>
        { verifyPath ? el.strMeal : el.strDrink }
      </p>
    </div>
  );
}

Cards.propTypes = {
  el: PropTypes.shape({
    strMealThumb: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Cards;
