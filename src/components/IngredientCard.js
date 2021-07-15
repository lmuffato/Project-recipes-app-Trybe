import React from 'react';
import ProPTypes from 'prop-types';
import styled from 'styled-components';
import { propTypes } from 'react-bootstrap/esm/Image';

function IngredientCard({ index, thumbnail, name }) {
  // const { pathname } = useLocation();

  return (
    <Container className="ingredCard-wrapper">
      <div
        className="cards-div"
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ thumbnail }
          alt={ `${index} recipe` }
          className="card-img"
          id={ name }
        />
        <h2
          data-testid={ `${index}-card-name` }
          className="card-h2"
        >
          { name }
        </h2>
      </div>
    </Container>
  );
}

IngredientCard.propTypes = {
  index: ProPTypes.number,
  thumbnail: propTypes.string,
  name: propTypes.string,
  id: ProPTypes.string,
}.isRequired;

export default IngredientCard;

const Container = styled.div`
  
  .ingredCard-wrapper {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }
  
  .cards-div {
    margin: 5px;
    margin-top: 10px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    width: 133px;
    height: 142px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    transform: scale(1);
    transition-duration: 0.5s;
  }

  .cards-div:hover {
    transform: scale(1.1);
  }

  .card-img {
    display: flex;
    margin: auto;
  }

  .card-h2 {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 15px;
    text-align: center;
    color: #000000;
    margin-top: 5px;
    position: relative;
    padding-bottom: 10px;
  }
`;
