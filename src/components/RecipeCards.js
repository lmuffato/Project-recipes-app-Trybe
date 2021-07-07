import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function GoToDetails(data) {
  const typePt = window.location.href.split('/')[3];
  const history = useHistory();
  const { showDetails } = useSelector((state) => state.searchReducer);
  let url = '';
  if (data && data.length === 1 && showDetails) {
    if (typePt === 'bebidas') {
      url = `bebidas/${data[0].idDrink}`;
    } else {
      url = `comidas/${data[0].idMeal}`;
    }
    return history.push(url);
  }
  if (data && data.length === 1 && !showDetails) {
    return (
      <Link to={ `/comidas/${data[0].idMeal}` } key={ data[0].name }>
        <div
          className="card"
          data-testid="0-recipe-card"
        >
          <img
            alt="recipe"
            data-testid="0-card-img"
            className="recipe-card-image"
            src={ data[0].strMealThumb }
          />
          <div className="title-div">
            <h4 data-testid="0-card-name" className="title">{data[0].strMeal}</h4>
          </div>
        </div>
      </Link>
    );
  }
}

const obj = {
  bebidas: 'bebidas',
  comidas: 'comidas',
};

export const renderCards = (data, type) => {
  const showLimit = 12;
  let thumb = '';
  let name = '';
  let id = '';
  if (data && data.length > 0 && data !== 'error' && data.length !== 1) {
    return (
      data.map((recipe, index) => {
        if (type === 'comidas') {
          thumb = recipe.strMealThumb;
          name = recipe.strMeal;
          id = recipe.idMeal;
        } else {
          thumb = recipe.strDrinkThumb;
          name = recipe.strDrink;
          id = recipe.idDrink;
        }
        if (index < showLimit) {
          return (
            <Link to={ `/${type}/${id}` } key={ name }>
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
  return '';
};

export default function RecipeCards() {
  const typePt = window.location.href.split('/')[3];
  const type = obj[typePt];
  const data1 = useSelector((state) => state.searchReducer.data);
  const data2 = useSelector((state) => (typePt === 'bebidas'
    ? state.searchReducer.initialDrinks : state.searchReducer.initialMeals));
  const data = (data1 !== '' ? data1 : data2);

  return (
    <div className="list">
      { renderCards(data, type) }
      { GoToDetails(data) }
    </div>
  );
}
