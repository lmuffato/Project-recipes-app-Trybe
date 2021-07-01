import React from 'react';
import { useSelector } from 'react-redux';

export default function RecipeCards() {
  const data = useSelector((state) => state.searchReducer.data);
  const type = useSelector((state) => state.searchReducer.item);

  const renderCards = () => {
    if (data && data.length > 0 && data !== 'error' && data.length !== 1) {
      return (
        data.map((recipe, index) => {
          let thumb = '';
          let name = '';
          if (type === 'drinks') {
            thumb = recipe.strDrinkThumb;
            name = recipe.strDrink;
          } else {
            thumb = recipe.strMealThumb;
            name = recipe.strMeal;
          }
          const showLimit = 12;
          if (index < showLimit) {
            return (
              <div key={ index } className="card" data-testid={ `${index}-recipe-card` }>
                <img
                  key={ `recipe-${index}` }
                  alt="recipe"
                  data-testid={ `${index}-card-img` }
                  className="recipe-card-image"
                  src={ thumb }
                />
                <div className="title-div">
                  <h4 data-testid={ `${index}-card-name` } className="title">{name}</h4>
                </div>
              </div>
            );
          }
          return '';
        })
      );
    }
  };

  return (
    <div className="list">
      { renderCards() }
    </div>
  );
}
