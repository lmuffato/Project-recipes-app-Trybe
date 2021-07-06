import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import context from '../../store/Context';
import { Header, Footer } from '../../components';

function Foods() {
  const {
    foods,
    catFoods,
    setCategoryF,
    categoryF,
  } = useContext(context);
  const stopCard = 11;
  const stopCat = 4;
  const handleClick = (categoryName) => {
    setCategoryF(categoryName);
    if (categoryName === categoryF) {
      setCategoryF('All');
    } else {
      setCategoryF(categoryName);
    }
  };

  return (
    <>
      <Header title="Comidas" />
      <button
        type="button"
        onClick={ () => setCategoryF('All') }
        data-testid="All-category-filter"
      >
        All
      </button>
      {
        catFoods.filter((_, index) => index <= stopCat)
          .map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => handleClick(strCategory) }
            >
              {strCategory}
            </button>
          ))
      }
      {
        foods.filter((_, index) => index <= stopCard)
          .map((food, index) => (
            <Link to={ `/comidas/${food.idMeal}` } key={ food.idMeal }>
              <div key={ food.idMeal } data-testid={ `${index}-recipe-card` }>
                <img
                  src={ food.strMealThumb }
                  alt="Receita pronta"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
              </div>
            </Link>
          ))
      }
      <Footer />
    </>
  );
}

export default Foods;
