import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderWithSearch from '../../components/HeaderWithSearch';
import Footer from '../../components/Footer';
import {
  fetchMealsCountries,
  fetchSearchMealByCountry,
  fetchApiFoods,
} from '../../services/fetchApi';

function ExploreFoodByOrigin() {
  const [countriesList, setCountriesList] = useState([]);
  const [foodListByCountry, setFoodListByCountry] = useState([]);
  const history = useHistory();
  // console.log(countriesList);
  console.log(foodListByCountry);

  useEffect(() => {
    fetchMealsCountries()
      .then((res) => setCountriesList([{ strArea: 'All' }, ...res]));
  }, []);

  useEffect(() => {
    fetchApiFoods()
      .then((res) => setFoodListByCountry(res));
  }, []);
  // const allFoodOption = async () => {
  //   const food = await fetchMealsCountries();
  //   setFoodListByCountry(food);
  // };

  const filterMealByCountry = async ({ target: { value } }) => {
    if (value === 'All') {
      const allFood = await fetchApiFoods();
      setFoodListByCountry(allFood);
    }
    if (value !== 'All') {
      const foodCountry = await fetchSearchMealByCountry(value);
      setFoodListByCountry(foodCountry);
    // console.log(foodCountry);
    }
  };

  const TWELVE = 12;

  return (
    <>
      <HeaderWithSearch />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ filterMealByCountry }
      >
        { countriesList.map((area, index) => (
          <option
            data-testid={ `${area.strArea}-option` }
            key={ index }
          >
            { area.strArea }
          </option>
        ))}
      </select>
      { foodListByCountry.length > 0 && foodListByCountry
        .slice(0, TWELVE).map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <button
              type="button"
              onClick={ () => history.push(`/comidas/${recipe.idMeal}`) }
            >
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h4 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h4>
            </button>
          </div>
        ))}
      <Footer />
    </>
  );
}

export default ExploreFoodByOrigin;
