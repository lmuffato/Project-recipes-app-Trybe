import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import searchAreas from '../../services/searchAreas';
import SearchFoods from '../../services/searchFoods';
import searchFoodByArea from '../../services/searchFoodByArea';

export default function ExploreByArea() {
  const maxLenght = 12;
  const [area, setAreas] = useState([]);
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const getApi = async () => {
      const result = await searchAreas();
      setAreas(result);
      const newMeals = await SearchFoods('name', '');
      setMeals(newMeals.slice(0, maxLenght));
    };
    getApi();
  }, []);
  const handleChange = async ({ target }) => {
    const { value } = target;
    if (value === 'All') {
      const api = await SearchFoods('name', '');
      setMeals(api.slice(0, maxLenght));
    } else {
      const api = await searchFoodByArea(value);
      setMeals(api.slice(0, maxLenght));
    }
  };
  return (
    <div>
      <div>
        <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
          {area.map((element) => (
            <option
              data-testid={ `${element}-option` }
              value={ element }
              key={ element }
            >
              {element}
            </option>
          ))}
        </select>
        <div>
          {meals.map((meal, index) => (
            <Link
              key={ index }
              to={ {
                pathname: `/comidas/${meal.idMeal}`,
                state: { recipe: meal },
              } }
            >
              <div data-testid={ `${index}-recipe-card` }>
                <h1 data-testid={ `${index}-card-name` }>{meal.strMeal}</h1>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt="meal"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
