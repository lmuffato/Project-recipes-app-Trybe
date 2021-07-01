import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import context from '../store/Context';
import '../App.css';
import Footer from '../components/Footer';

function Drinks() {
  const { drinks, catDrinks } = useContext(context);
  const stopValue = 11;
  const stopCat = 4;
  return (
    <>
      <Header title="Bebidas" />
      {
        catDrinks.filter((_, index) => index <= stopCat)
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
        drinks.filter((_, index) => index <= stopValue)
          .map((drink, index) => (
            <Link to={ `/bebidas/${drink.idDrink}` } key={ drink.idDrink }>
              <div
                className="card"
                key={ drink.idDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ drink.strDrinkThumb }
                  alt="Receita pronta"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
              </div>
            </Link>

          ))
      }
      <Footer />
    </>
  );
}

export default Drinks;
