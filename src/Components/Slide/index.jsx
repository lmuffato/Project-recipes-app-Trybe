import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getDrinks, getMeals } from '../../services/fetchRecipes';
import './styles.css';

function Slide({ toggle, category, cleanState }) {
  const [recomendations, setRecomendations] = useState([]);
  const fixedToggle = toggle === 'Meal' ? 'Drink' : 'Meal';
  const fixedCategory = category === 'strCategory' ? 'strAlcoholic' : 'strCategory';
  const MAX_NUMBER_SUGGESTIONS = 6;

  useEffect(() => {
    if (fixedToggle === 'Drink') {
      getDrinks().then((response) => {
        setRecomendations(response.slice(0, MAX_NUMBER_SUGGESTIONS));
      });
    } else {
      getMeals().then((response) => {
        setRecomendations(response.slice(0, MAX_NUMBER_SUGGESTIONS));
      });
    }
  }, [fixedToggle]);

  return (
    <div className="slide-parent">
      <h2>Recomended</h2>
      <div className="suggestions-carousel">
        {recomendations.map((item, index) => (
          <div key={ `Card-${index}` } className="box">
            <Link
              onClick={ () => cleanState({}) }
              to={ fixedToggle === 'Drink'
                ? `/bebidas/${item.idDrink}` : `/comidas/${item.idMeal}` }
            >
              <div data-testid={ `${index}-recomendation-card` }>
                <img src={ item[`str${fixedToggle}Thumb`] } alt="drink" />
                <h6>{item[fixedCategory]}</h6>
                <h4 data-testid={ `${index}-recomendation-title` }>
                  {item[`str${fixedToggle}`]}
                </h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

Slide.propTypes = {
  toggle: PropTypes.string,
  category: PropTypes.string,
}.isRequired;

export default Slide;
