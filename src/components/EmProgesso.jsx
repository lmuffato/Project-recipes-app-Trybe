import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Ingredientes from './EmProgressPage/Ingredientes';
import '../App.css';

function EmProgresso({ props }) {
  const [data, setData] = useState({});
  // const [isChecked, setIsChecked] = useState(false);

  const magicNumber = 0;

  useEffect(() => {
    const fetchData = () => {
      setData(props[magicNumber]);
    };
    fetchData();
  }, [props]);

  // const verifyLocalStorage = () => {
  //   const progressRecipes = JSON.parse(localStorage
  //     .getItem('inProgressRecipes'));

  //   if (progressRecipes !== null) {
  //     const { cocktails, meals } = progressRecipes;
  //     // console.log(meals);
  //     // console.log(cocktails);
  //     const test = Object.values(meals);
  //     // console.log(test);
  //     // test[0].find((item) => console.log(item));
  //   }
  // };

  if (!data) return <h1>Loading...</h1>;

  const ingredients = Object.entries(data)
    .filter((item) => item[0].includes('Ingredient'))
    .filter((element) => element[1] !== '' && element[1] !== null);

  const obj = { ingredients, data };

  return (
    <div className="m-1 pb-4">
      <div className="d-flex flex-column">
        <img
          data-testid="recipe-photo"
          src={ data.strMealThumb || data.strDrinkThumb }
          alt="meals-img"
          width="350px"
          height="auto"
        />
        <div className="py-4">
          <h2 data-testid="recipe-title">{ data.strMeal || data.strDrink }</h2>
        </div>
        <div className="p-2">
          <button type="button" data-testid="share-btn">Compartilhar</button>
          <button type="button" data-testid="favorite-btn">Favoritar</button>
        </div>
        <div className="py-2">
          <h3 data-testid="recipe-category">{ data.strCategory }</h3>
        </div>

        <Ingredientes ingredients={ obj } />

        <div className="py-2">
          <h4>Instruções</h4>
        </div>
        <p
          data-testid="instructions"
          className="text-justify"
        >
          { data.strInstructions }
        </p>
        <Link to="/receitas-feitas" className="align-self-center w-50">
          <button type="button" data-testid="finish-recipe-btn" className="w-100 py-3">
            Finalizar
          </button>
        </Link>
      </div>
    </div>
  );
}

EmProgresso.propTypes = {
  props: object,
}.isRequired;

export default EmProgresso;
