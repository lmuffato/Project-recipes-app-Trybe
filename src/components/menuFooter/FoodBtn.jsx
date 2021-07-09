import React from 'react';
import { Link } from 'react-router-dom';
import FoodIcon from '../../images/mealIcon.svg';

export default function FoodBtn() {
  return (
    <div>
      <Link to="/comidas">
        <img src={ FoodIcon } alt="Food icon" data-testid="food-bottom-btn" />
      </Link>
    </div>
  );
}
