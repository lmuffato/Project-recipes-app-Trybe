import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useRouteMatch } from 'react-router-dom';
import ComponentGen from '../../../components/RecipeDetailsComponents';
import '../../../styles/RecipeDetails.css';

function Receita() {
  const { params } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState('');
  const [recomend, setRecomend] = useState();

  useEffect(() => {
    async function FoodAPI() {
      const requesition = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`);
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
  }, [params.id]);

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
          <Carousel.Item key={ i } data-testid={ `${i}-recomendation-title` }>
            <Link to={ `/comidas/${e.idMeal}` }>
              <div data-testid={ `${i}-recomendation-card` }>
                <img
                  src={ e.strMealThumb }
                  data-testid={ `${i}-card-img` }
                  alt="foto da receita"
                  style={ { height: '200px' } }
                />
                <h4>{ e.strMeal }</h4>
              </div>
            </Link>
          </Carousel.Item>
        )));
    }
  };

  return (
    loading === false
      && <ComponentGen
        info={ info }
        listCreator={ listCreator() }
        recomendList={ recomendList() }
      />

  );
}

export default Receita;
