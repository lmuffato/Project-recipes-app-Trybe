import React from 'react';
import { shape, string } from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './styles.css';

function MealsCard({ data: { meals } }) {
  const maxArrayLength = 12;

  if (meals === null) {
    // eslint-disable-next-line no-alert
    window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  if (!meals) return <div>Loading...</div>;
  if (meals.length === 1) {
    return <Redirect to={ `comidas/${meals[0].idMeal}` } />;
  }

  return (
    <div className="meal-card">
      { meals.map(({ strMeal, strMealThumb, idMeal }, index) => (
        index < maxArrayLength ? (
          <Card className="card">
            <Link to={ `/comidas/${idMeal}` } key={ idMeal }>
              <button type="button" className="bn" data-testid={ `${index}-recipe-card` }>
                <Card.Img
                  variant="top"
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt={ strMeal }
                />
                <Card.Body>
                  <Card.Title
                    className="card-title"
                    data-testid={ `${index}-card-name` }
                  >
                    { strMeal }
                  </Card.Title>
                </Card.Body>
              </button>
            </Link>
          </Card>
        ) : false
      )) }
    </div>
  );
}

MealsCard.propTypes = { data: shape(
  { strMeal: string, strMealThumb: string },
) }.isRequired;

export default MealsCard;
