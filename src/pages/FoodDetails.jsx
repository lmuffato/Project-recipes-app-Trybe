import React, { useEffect, useState } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import { ApiCocktailFirstItems } from '../services/theCockTailAPI';
import { ApiRecipeDetail } from '../services/theMealAPI';

export default function FoodDetails() {
  const [currMeal, setCurrMeal] = useState({});
  const [firstCocktails, setFirstCocktails] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;
  const regExp = /[0-9]/gi;
  const getId = pathname.match(regExp).reduce((acc, item) => acc + item, '');

  useEffect(() => {
    const getCurrMeal = async () => {
      const recipe = await ApiRecipeDetail(getId);
      const cockTails = await ApiCocktailFirstItems();
      const { drinks } = cockTails;
      const ARR_LENGTH = 6;
      const arrDrinks = drinks.slice(0, ARR_LENGTH);
      const { meals: [meal] } = recipe;
      console.log(meal);
      setCurrMeal(meal);
      setFirstCocktails(arrDrinks);
    };
    getCurrMeal();
  }, []);
  const arrCurrMeal = Object.entries(currMeal);
  // src: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match
  const arrCurrMealIngredients = arrCurrMeal.filter((i) => i[0].match(/strIngredient/gi));
  const arrCurrMealMeasure = arrCurrMeal.filter((i) => i[0].match(/strMeasure/gi));
  return (
    <Card style={ { width: '18rem' } }>
      <h2 data-testid="recipe-title">{currMeal.strMeal}</h2>
      <img
        src={ currMeal.strMealThumb }
        alt={ currMeal.strMeal }
        data-testid="recipe-photo"
      />
      <img
        style={ { width: '2rem' } }
        data-testid="share-btn"
        src={ shareIcon }
        alt="compartilhar"
      />
      <img
        style={ { width: '2rem' } }
        data-testid="favorite-btn"
        src={ favoriteIcon }
        alt="favoritar"
      />
      <h3 data-testid="recipe-category">{currMeal.strCategory}</h3>
      <h3>Ingredientes:</h3>
      {arrCurrMealIngredients.map((ingredient, index) => {
        if (!ingredient[1]) return;
        return (
          <p
            key={ `${index}-${ingredient[1]}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient[1]}: `}
            <span>{arrCurrMealMeasure[index][1]}</span>
          </p>
        );
      })}
      <p data-testid="instructions">{ currMeal.strInstructions }</p>
      <iframe
        title={ currMeal.strMeal }
        width="240"
        height="120"
        data-testid="video"
        src={ currMeal.strYoutube }
      />
      <h4>Bebidas Recomendadas:</h4>

      <Carousel>
        {firstCocktails.map((item, index) => (
          <Carousel.Item key={ `${index}-${item.strDrink}` }>
            <img
              className="d-block w-100"
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              data-testid={ `${index}-recomendation-card` }
            />
            <Carousel.Caption>
              <h3 data-testid={ `${index}-recomendation-title` }>{item.strDrink}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* {firstCocktails.map((drink, index) => (
        <div key={ `${index}-${drink.strDrink}` }>
          <h4
            data-testid={ `${index}-recomendation-title` }
          >
            {drink.strDrink}
          </h4>
          <img
            style={ { width: '18rem' } }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid={ `${index}-recomendation-card` }
          />
        </div>
      ))} */}
      <button type="button" data-testid="start-recipe-btn">Começar Receita</button>
    </Card>
  );
}
