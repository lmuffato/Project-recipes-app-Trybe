import React, { useEffect } from 'react';
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
    <Container>
      { recommendations.slice(0, numberOfCards).map((recommendation, index) => (
        <div key={ index }>
          <Row data-testid={ `${index}-recomendation-card` }>
            <img
              src={ recommendation.strDrinkThumb || recommendation.strMealThumb }
              alt={ recommendation.strDrink || recommendation.strMeal }
            />
          </Row>
          <Row>
            { recommendation.strAlcoholic || recommendation.strCategory }
          </Row>
          <Row>
            { recommendation.strDrink || recommendation.strMeal }
          </Row>
        </div>
      )) }
    </Container>
  );
}

Recommendations.propTypes = {
  recommendations: arrayOf(object),
}.isRequired;

export default Recommendations;
