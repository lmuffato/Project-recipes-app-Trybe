import React from 'react';
import { FoodContext } from '../Context/FoodProvider';
import Card from './Card';

function FoodList() {
  const { foods, identifier } = React.useContext(FoodContext);
  const maxLength = 11;

  return (
    <div className="foodlist">
      {foods.map((food, index) => {
        if (index <= maxLength) {
          return (
            <Card
              thumb={ food[`str${identifier}Thumb`] }
              name={ food[`str${identifier}`] }
              key={ food[`str${identifier}`] }
              index={ index }
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export default FoodList;
