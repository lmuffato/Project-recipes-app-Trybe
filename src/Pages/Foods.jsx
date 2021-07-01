import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import context from '../store/Context';
import Footer from '../components/Footer';

function Foods() {
  const { foods, catFoods } = useContext(context);
  const stopCard = 11;
  const stopCat = 4;
  return (
    <>
      <Header title="Comidas" />
      {
        catFoods.filter((_, index) => index <= stopCat)
          .map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
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
