import React, { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Pagination,
} from 'swiper/core';
import { Link, useRouteMatch } from 'react-router-dom';
import Loading from '../../../components/Loading';
import ComponentGen from '../../../components/RecipeDetailsComponents';
import '../../../styles/RecipeDetails.css';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

function Receita() {
  const { params } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState('');
  const [recomend, setRecomend] = useState();
  SwiperCore.use([Pagination]);

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
          <SwiperSlide
            className="swiper__slide"
            key={ i }
            data-testid={ `${i}-recomendation-title` }
          >
            <Link className="swiper__link" to={ `/comidas/${e.idMeal}` }>
              <div className="swiper__div" data-testid={ `${i}-recomendation-card` }>
                <h4 className="swiper__title">{ e.strMeal }</h4>
                <img
                  className="swiper__img"
                  src={ e.strMealThumb }
                  data-testid={ `${i}-card-img` }
                  alt="foto da receita"
                />
              </div>
            </Link>
          </SwiperSlide>
        )));
    } return (<Loading />);
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
