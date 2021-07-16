import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Ingredientes from './EmProgressPage/Ingredientes';
import Loading from './Loading';
import FavoriteFood from './FavoriteFood';
import '../App.css';

function EmProgresso({ props }) {
  const [data, setData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  const magicNumber = 0;
  const history = useHistory();

  useEffect(() => {
    const fetchData = () => {
      setData(props[magicNumber]);
    };
    fetchData();
  }, [props]);

  if (!data) {
    return history.location.pathname.includes('comidas')
      ? (
        <div className="d-flex w-100 min-vh-100 align-items-center">
          <Loading param="food" />
        </div>
      )
      : (
        <div className="d-flex w-100 min-vh-100 align-items-center">
          <Loading param="drink" />
        </div>
      );
  }

  const ingredientsList = Object.entries(data)
    .filter((item) => item[0].includes('Ingredient'))
    .filter((element) => element[1] !== '' && element[1] !== null);

  const obj = { ingredientsList, data, setIsDisabled, isDisabled };

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
        <div className="pb-4">
          <FavoriteFood params={ obj } />
        </div>
        <div className="py-2">
          <h3 data-testid="recipe-category">{ data.strCategory }</h3>
        </div>

        <Ingredientes params={ obj } />

        <div className="py-2">
          <h4>Instruções</h4>
        </div>
        <p
          data-testid="instructions"
          className="text-justify"
        >
          { data.strInstructions }
        </p>
        <div className="align-self-center w-50">
          <button
            type="button"
            className="w-100 py-3"
            data-testid="finish-recipe-btn"
            onClick={ () => history.push('/receitas-feitas') }
            disabled={ isDisabled }
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}

EmProgresso.propTypes = {
  props: object,
}.isRequired;

export default EmProgresso;
