import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMeals } from '../../../actions/meals';
import './AreaCards.css';

function AreaCards() {
  const size = 12;
  const loading = useSelector((state) => state.meals.loading);
  const meals = useSelector((state) => state.meals.meals);
  const dispatch = useDispatch();
  const [selectedOrigin, setSelectedOrigin] = useState('All');
  const [shownCards, setShownCards] = useState(meals);
  const [originList, setOriginList] = useState([]);

  useEffect(() => {
    dispatch(getMeals());
    const initialFetch = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const { meals: origins } = await (await fetch(endpoint)).json();
      setOriginList(origins);
    };
    initialFetch();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (selectedOrigin === 'All') setShownCards(meals);
    else {
      const fetchMealsByOrigin = async () => {
        const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedOrigin}`;
        const { meals: mealsByOrigin } = await (await fetch(endpoint)).json();
        setShownCards(mealsByOrigin);
      };
      fetchMealsByOrigin();
    }
  }, [selectedOrigin, meals]); // eslint-disable-line

  return (
    <div className="explore-container">
      <div className="exploreRecipes-div">
        <select
          name="explore-by-area-dropdown"
          data-testid="explore-by-area-dropdown"
          value={ selectedOrigin }
          onChange={ ({ target: { value } }) => setSelectedOrigin(value) }
          className="explore-select"
        >
          <option value="All" data-testid="All-option">All</option>
          { originList
            .map(({ strArea }) => strArea)
            .filter((area, index, array) => array.indexOf(area) === index)
            .map((area) => (
              <option data-testid={ `${area}-option` } key={ area } value={ area }>
                { area }
              </option>)) }
        </select>
      </div>
      <div className="exploreRecipes-div">
        { loading ? null
          : shownCards.slice(0, size).map(({ idMeal, strMeal, strMealThumb }, index) => (
            <div
              key={ strMeal }
              data-testid={ `${index}-recipe-card` }
              className="exploreRecipes-card"
            >
              <Link to={ `/comidas/${idMeal}` }>
                <h2
                  data-testid={ `${index}-card-name` }
                  className="exploreRecipes-title"
                >
                  {strMeal}
                </h2>
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${index}-card-img` }
                  className="exploreRecipes-card-img"
                />
              </Link>
            </div>
          )) }
      </div>
    </div>
  );
}

export default AreaCards;
