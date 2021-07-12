import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { arrayOf, object } from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { getDrinks } from '../../../actions/drinks';
import { getMeals } from '../../../actions/meals';

function Recommendations(props) {
  const { type } = props;
  const dispatch = useDispatch();
  const recommendations = useSelector((state) => {
    if (type === 'meals') {
      return state.drinks.drinks;
    }
    if (type === 'drinks') {
      return state.meals.meals;
    }
  });

  useEffect(() => {
    if (type === 'meals') {
      dispatch(getDrinks());
    }
    if (type === 'drinks') {
      dispatch(getMeals());
    }
  }, []); // eslint-disable-line

  const numberOfCards = 6;

  return (
    <Container as="section" className="recommendation-container">
      { recommendations.slice(0, numberOfCards).map((recommendation, index) => (
        <div
          key={ index }
          className="card-container"
          data-testid={ `${index}-recomendation-card` }
        >
          <Link
            to={ recommendation.idMeal ? `/comidas/${recommendation.idMeal}`
              : `/bebidas/${recommendation.idDrink}` }
          >
            <Row>
              <img
                src={ recommendation.strDrinkThumb || recommendation.strMealThumb }
                alt={ recommendation.strDrink || recommendation.strMeal }
                className="recommendation-img"
              />
            </Row>
            <Row>
              { recommendation.strAlcoholic || recommendation.strCategory }
            </Row>
            <Row data-testid={ `${index}-recomendation-title` }>
              { recommendation.strDrink || recommendation.strMeal }
            </Row>
          </Link>
        </div>
      )) }
    </Container>
  );
}

Recommendations.propTypes = {
  recommendations: arrayOf(object),
}.isRequired;

export default Recommendations;
