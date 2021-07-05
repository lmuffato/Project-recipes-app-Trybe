import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function GoToDetails(data) {
  const typePt = window.location.href.split('/')[3];
  const history = useHistory();
  let url = '';
  if (data && data.length === 1) {
    if (typePt === 'bebidas') {
      url = `${typePt}/${data[0].idDrink}`;
    } else {
      url = `${typePt}/${data[0].idMeal}`;
    }
    return history.push(url);
  }
}

const obj = {
  bebidas: 'drinks',
  comidas: 'meals',
};

export default function RecipeCards() {
  const typePt = window.location.href.split('/')[3];
  const type = obj[typePt];
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
              <Link to={ `${ptType}/${id}` } key={ name }>
                <div
                  className="card"
                  data-testid={ `${index}-recipe-card` }
                >
                  <img
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
      { GoToDetails(data) }
    </div>
  );
}
