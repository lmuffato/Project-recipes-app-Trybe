import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchAPI from '../services/index';
import heartWhite from '../images/whiteHeartIcon.svg';
// import heartBlack from '../images/blackHeartIcon.svg';
import share from '../images/shareIcon.svg';

function ComidasEmProcesso() {
  const { id } = useParams();
  console.log(id);
  const [meal, setMeal] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchMeal = async () => {
      const data = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setMeal(data);
      setLoading(false);
      console.log(data);
    };

    fetchMeal();
  }, [id]);

  console.log(meal[0]);

  if (loading) return <p>carregando</p>;

  return (
    <section>
      <img
        src={ meal.strMealThumb }
        data-testid="recipe-photo"
        alt="imagem da refeição"
      />
      <h3 data-testid="recipe-title">{ meal.strMeal }</h3>
      <p data-testid="recipe-category">{ meal.strMeal }</p>

      <button type="button" data-testid="share-btn">
        <img src={ share } alt="icone compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ heartWhite } alt="icone coração" />
      </button>

      <p data-testid="recipe-category">{ meal.strInstructions }</p>
      <button type="button" data-testid="finish-recipe-btn">finalizar</button>
    </section>
  );
}

export default ComidasEmProcesso;
