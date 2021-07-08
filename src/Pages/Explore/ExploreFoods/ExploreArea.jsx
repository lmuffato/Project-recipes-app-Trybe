import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import context from '../../../store/Context';
import { Header, Footer } from '../../../components';

function ExploreArea() {
  const { mealArea, setOptions, dataOptions } = useContext(context);

  const cardSize = 12;
  return (
    <>
      <Header title="Explorar Origem" />
      <main>
        <select
          onChange={ ({ target }) => setOptions(target.value) }
          data-testid="explore-by-area-dropdown"
        >
          {mealArea.map(({ strArea }, index) => (
            <option
              onChange={ ({ target }) => setOptions(target.value) }
              value={ strArea }
              data-testid={ `${strArea}-option` }
              key={ index }
            >
              {strArea}
            </option>
          ))}
        </select>
        <div>
          {dataOptions && dataOptions.slice(0, cardSize).map((
            { strMeal, idMeal, strMealThumb }, index2,
          ) => (
            <div
              key={ idMeal }
              data-testid={ `${index2}-recipe-card` }
            >
              <Link to={ `/comidas/${idMeal}` }>
                <img
                  data-testid={ `${index2}-card-img` }
                  src={ strMealThumb }
                  alt="strMeal"
                />
              </Link>
              <Link to={ `/comidas/${idMeal}` }>
                <p
                  data-testid={ `${index2}-card-name` }
                >
                  {strMeal}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ExploreArea;
