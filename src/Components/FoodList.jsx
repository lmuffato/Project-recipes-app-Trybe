import React from 'react';
import { useHistory } from 'react-router-dom';
import { FoodContext } from '../Context/FoodProvider';
import Card from './Card';

function FoodList() {
  const { foods, identifier } = React.useContext(FoodContext);
  const maxLength = 11;
  const history = useHistory();

  const redirectRecipe = (foodsParam, identifierParam) => {
    let recipe = '';
    const idKey = `id${identifierParam}`;
    const idValue = foodsParam[0][idKey];
    if (identifierParam === 'Drink') recipe = 'bebidas';
    if (identifierParam === 'Meal') recipe = 'comidas';
    history.push(`/${recipe}/${idValue}`);
  };

  return (
    <div className="foodlist">
      {foods.map((food, index) => {
        if (foods.length === 1) {
          redirectRecipe(foods, identifier);
        } if (index <= maxLength) {
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
