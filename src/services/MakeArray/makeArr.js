import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import generateIdSecondCard, { generateIdFirstCard } from '../MakeIds/generateIdByIndex';

export default function makeArray(array) {
  const arrReturn = [];
  for (let i = 0; i < array.length / 2; i += 1) {
    // const j = 0; const k = 1; const l = 2; const m = 3; const n = 4; const
    //   o = 5;

    arrReturn.push(
      <Carousel.Item key={ generateIdFirstCard(i) }>
        <section
          className="card card-left"
          data-testid={ `${generateIdFirstCard(i)}-recomendation-card` }
        >
          <Link
            to={ `/${array[generateIdFirstCard(i)].idMeal ? 'comidas'
              : 'bebidas'}/${array[generateIdFirstCard(i)].idMeal
                || array[generateIdFirstCard(i)].idDrink}` }
          >
            <img
              className="card-img-top"
              src={ array[generateIdFirstCard(i)].strMealThumb
              || array[generateIdFirstCard(i)].strDrinkThumb }
              alt="recipe"
              height="150px"
            />
          </Link>
          <p>
            { array[generateIdFirstCard(i)].strArea
          || array[generateIdFirstCard(i)].strAlcholic}
          </p>
          <h5
            className="card-title"
            data-testid={ `${generateIdFirstCard(i)}-recomendation-title` }
          >
            { array[generateIdFirstCard(i)].strMeal
          || array[generateIdFirstCard(i)].strDrink }
          </h5>
        </section>
        <section
          className="card card-right"
          data-testid={ `${generateIdSecondCard(i)}-recomendation-card` }
        >
          <Link
            to={ `/${array[generateIdSecondCard(i)].idMeal ? 'comidas'
              : 'bebidas'}/${array[generateIdSecondCard(i)].idMeal
                || array[generateIdSecondCard(i)].idDrink}` }
          >
            <img
              className="card-img-top"
              src={ array[generateIdSecondCard(i)].strMealThumb
              || array[generateIdSecondCard(i)].strDrinkThumb }
              alt="recipe"
              height="150px"
            />
          </Link>
          <p>{ array[generateIdSecondCard(i)].strArea}</p>
          <h5
            className="card-title"
            data-testid={ `${generateIdSecondCard(i)}-recomendation-title` }
          >
            { array[generateIdSecondCard(i)].strMeal
          || array[generateIdSecondCard(i)].strDrink }
          </h5>
        </section>
      </Carousel.Item>,
    );
  }
  return arrReturn;
}
