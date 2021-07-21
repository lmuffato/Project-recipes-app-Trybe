import React, { useEffect, useState, useContext } from 'react';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';
import getByArea from '../../services/getFoodByArea';
import Context from '../../context/Context';
import { getMealsDefault } from '../../services/getMeals';
import RecipesList from '../../components/RecipesList';

export default function ExploreFoodByArea() {
  const { mealsList, setMealsList } = useContext(Context);
  const [areas, setAreas] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getArea = async () => {
      setLoading(true);
      const list = await getMealsDefault();
      const data = await getByArea();
      setMealsList(list);
      setAreas([...data, 'All']);
      setLoading(false);
    };
    getArea();
  }, []);

  const handleSelect = async (value) => {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
    const response = await fetch(endPoint);
    const data = await response.json();
    const { meals } = data;
    const list = meals.map((ele) => {
      const { strMeal, idMeal, strMealThumb } = ele;
      return ({
        id: idMeal,
        imgSrc: strMealThumb,
        name: strMeal,
      });
    });
    setMealsList(list);
    if (value === 'All') {
      const listM = await getMealsDefault();
      setMealsList(listM);
    }
  };

  const renderOptions = () => {
    const toReturn = areas.map((ele) => (
      <option
        value={ ele }
        data-testid={ `${ele}-option` }
        key={ ele }
      >
        { ele }
      </option>
    ));
    return toReturn;
  };

  const renderFilter = () => (
    <label htmlFor="areas">
      <select
        id="areas"
        data-testid="explore-by-area-dropdown"
        className="drop-down"
        onChange={ ({ target: { value } }) => handleSelect(value) }
      >
        { renderOptions() }
      </select>
    </label>
  );

  const renderLoading = () => (
    <h1>Loading...</h1>
  );

  const renderByArea = () => (
    <div>
      { renderFilter() }
      <RecipesList data={ mealsList } path="comidas" />
    </div>
  );

  return (
    <div className="food-page">
      <Header title="Explorar Origem" show />
      { isLoading ? renderLoading() : renderByArea() }
      <BottomMenu />
    </div>
  );
}
