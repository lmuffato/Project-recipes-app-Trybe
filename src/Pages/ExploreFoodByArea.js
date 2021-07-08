import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fetchFoodByArea from '../helpers/fetchFoodByArea';
import fetchMealsByArea from '../helpers/fetchMealsByArea';

function ExploreFoodByArea() {
  const [foodByArea, setFoodByArea] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [filteredMeals, setFilteredMeals] = useState();

  useEffect(() => {
    const getArea = async () => {
      const { meals } = await fetchFoodByArea();
      setFoodByArea(meals);
    };
    getArea();
    const areaUpdate = async () => {
      const { meals } = await fetchMealsByArea(selectedArea);
      setFilteredMeals(meals);
    };
    areaUpdate();
  }, [selectedArea]);
  function RenderCardMeals(meals) {
    const LIMIT = 12;
    if (meals) {
      return (
        meals.map((meal, index) => index < LIMIT && (
          <Link to={ `/comidas/${meal.idMeal}` } key={ meal.idMeal }>
            <div
              className="card"
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <img
                alt="recipe"
                data-testid={ `${index}-card-img` }
                className="recipe-card-image"
                src={ meal.strMealThumb }
              />
              <div className="title-div">
                <h4
                  data-testid={ `${index}-card-name` }
                  className="title"
                >
                  {meal.strMeal}
                </h4>
              </div>
            </div>
          </Link>
        ))
      );
    }
  }
  function renderArea() {
    return (
      foodByArea && (
        <select
          onChange={ ({ target }) => setSelectedArea(target.value) }
          data-testid="explore-by-area-dropdown"
        >
          <option
            value=""
            data-testid="All-option"
          >
            All
          </option>
          {
            foodByArea.map((area, index) => (
              <option
                key={ index }
                data-testid={ `${area.strArea}-option` }
                value={ area.strArea }
              >
                {area.strArea}
              </option>
            ))

          }
        </select>
      )
    );
  }
  return (
    <>
      <Header props={ { search: true, title: 'Explorar Origem' } } />
      {renderArea()}
      {RenderCardMeals(filteredMeals)}
      <Footer />
    </>
  );
}

export default ExploreFoodByArea;
