import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchById } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

function DrinkDetails() {
  const id = window.location.href.split('/')[4];
  const dispatch = useDispatch();
  const data = useSelector((state) => state.detailsReducer.data);

  useEffect(() => {
    dispatch(fetchById('bebidas', id));
  }, [id]);

  const renderDrinkRecipe = () => {
    const ingredients = [];
    const measure = [];
    if (data) {
      const array = Object.entries(data[0]);

      array.forEach((item) => {
        if (item[0].includes('strIngredient') && item[1] !== null) {
          ingredients.push(item[1]);
        }
        if (item[0].includes('strMeasure')) {
          measure.push(item[1]);
        }
      });

      const { strDrink, strCategory, strDrinkThumb, strInstructions } = data[0];
      return (
        <div>
          <img
            data-testid="recipe-photo"
            className="recipe-img"
            alt="recipe"
            src={ strDrinkThumb }
          />
          <div>
            <h2 data-testid="recipe-title">{strDrink}</h2>
            <img alt="share" data-testid="share-btn" src={ shareIcon } />
            <img alt="favorite" data-testid="favorite-btn" src={ favoriteIcon } />
          </div>
          <h3 data-testid="recipe-category">{strCategory}</h3>
          <h2>Ingredients</h2>
          <ul>
            { ingredients.map((item, index) => {
              if (item !== '') {
                if (measure[index].length > 1) {
                  return (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {`${item} - ${measure[index]}`}
                    </li>
                  );
                }
                return (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${item} - ${measure[index]} un`}
                  </li>
                );
              }
              return '';
            })}
          </ul>
          <h2>Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
          <h2>Recomendadas</h2>
          <div data-testid={ `${0}-recomendation-card` }>cards de receitas aqui</div>
          <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
        </div>
      );
    }
  };

  return (
    <div>
      {renderDrinkRecipe()}
    </div>
  );
}

export default DrinkDetails;
