import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FoodContext } from '../Context/FoodProvider';

const Card = ({ thumb, name, index, id }) => {
  const history = useHistory();
  const { foods, identifier } = React.useContext(FoodContext);
  const handleClick= () => {
    let recipe = '';
    if (identifier === 'Drink') recipe = 'bebidas';
    if (identifier === 'Meal') recipe = 'comidas';
    history.push(`/${recipe}/${id}`);
  };
  return (<div className="card-container" data-testid={ `${index}-recipe-card` } onClick={ handleClick } >
    <img
      src={ thumb }
      alt={ name }
      className="img-card"
      data-testid={ `${index}-card-img` }
    />
    <h3 data-testid={ `${index}-card-name` }>{name}</h3>
  </div>)
};

Card.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
