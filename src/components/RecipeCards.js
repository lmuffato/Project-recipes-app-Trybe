import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const typePt = window.location.href.split('/')[3];
const type = (typePt === 'bebidas' ? 'drinks' : 'meals');

export default function RecipeCards() {
  const data1 = useSelector((state) => state.searchReducer.data);

  const data2 = useSelector((state) => (typePt === 'bebidas'
    ? state.searchReducer.initialDrinks : state.searchReducer.initialMeals));

  const data = (data1 !== '' ? data1 : data2);

  const renderCards = () => {
    if (data && data.length > 0 && data !== 'error' && data.length !== 1) {
      return (
        data.map((recipe, index) => {
          let thumb = '';
          let name = '';
          let id = 0;
          let ptType = '';
          if (type === 'drinks') {
            thumb = recipe.strDrinkThumb;
            name = recipe.strDrink;
            id = recipe.idDrink;
            ptType = 'bebidas';
          } else {
            thumb = recipe.strMealThumb;
            name = recipe.strMeal;
            id = recipe.idMeal;
            ptType = 'comidas';
          }
          const showLimit = 12;
          if (index < showLimit) {
            return (
              <Link to={ `${ptType}/${id}` }>
                <div
                  key={ index }
                  className="card"
                  data-testid={ `${index}-recipe-card` }
                >
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
              </Link>
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
