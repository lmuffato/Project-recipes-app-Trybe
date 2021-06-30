import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Receita() {
  const id = window.location.pathname.match(/(\d+)/)[0];
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState('');
  const [recomend, setRecomend] = useState();

  useEffect(() => {
    async function FoodAPI() {
      const requesition = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const result = await requesition.json();
      async function recomendCard() {
        const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const recomendOptions = await data.json();
        setRecomend(recomendOptions.meals);
      }
      await recomendCard();
      setLoading(false);
      setInfo(result.drinks[0]);
    }
    FoodAPI();
  }, [id]);
  const { strDrinkThumb, strDrink, strCategory, strInstructions, strAlcoholic } = info;

  const listCreator = () => {
    const ingredients = [];
    const quantity = [];
    Object.entries(info)
      .filter((e) => e[0].indexOf('strIngredient') === 0 && e[1] !== null)
      .map((e) => ingredients.push(e[1]));
    Object.entries(info)
      .filter((e) => e[0].indexOf('strMeasure') === 0 && e[1] !== null)
      .map((e) => quantity.push(e[1]));
    return (
      ingredients.map((e, i) => (
        <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
          {`${e} ${quantity[i]}`}
        </li>
      )));
  };

  const recomendList = () => {
    const qtd = 6;
    if (loading === false) {
      return (
        recomend.filter((e, i) => i < qtd).map((e, i) => (
          <li key={ i } data-testid={ `${i}-recomendation-card` }>
            <Link to={ `/comidas/${e.idMeal}` }>
              <div data-testid={ `${i}-recipe-card` }>
                <img
                  src={ e.strMealThumb }
                  data-testid={ `${i}-card-img` }
                  alt="foto da receita"
                />
                <h4 data-testid={ `${i}-recomendation-title` }>{ e.strMeal }</h4>
              </div>
            </Link>
          </li>)));
    }
  };

  const componentGen = () => {
    if (loading === false) {
      return (
        <div>
          <img
            data-testid="recipe-photo"
            src={ strDrinkThumb }
            alt="recipe"
            style={ { height: '200px' } }
          />
          <p data-testid="recipe-title">{`${strDrink}`}</p>
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <p data-testid="recipe-category">{`${strCategory} ${strAlcoholic}`}</p>
          {listCreator()}
          <ul data-testid="instructions">{strInstructions}</ul>
          {recomendList()}
          <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
        </div>
      );
    }
  };

  return (
    <>
      <Header title="Receita" />
      {componentGen()}
      <Footer />
    </>
  );
}

export default Receita;
