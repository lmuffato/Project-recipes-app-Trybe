import React from 'react';
import ProPTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { propTypes } from 'react-bootstrap/esm/Image';
import CardsIcons from './CardsIcons';

function Cards({ index, thumbnail, name, id, type, category }) {
  const { pathname } = useLocation();

  return (
    <Container className="">
      <div className="card-wrapper">
        <Link to={ type ? `/comidas/${id}` : `${pathname}/${id}` }>
          <div
            id={ id }
            className="cards-div"
            data-testid={ `${index}-recipe-card` }
          >
            <img
              id={ id }
              data-testid={ `${index}-card-img` }
              src={ thumbnail }
              alt={ `${index} recipe` }
              className="card-img"
            />
            <h2
              id={ id }
              data-testid={ `${index}-card-name` }
              className="card-h2"
            >
              { name }
            </h2>
            <h3>{ category }</h3>
            <CardsIcons />
          </div>
        </Link>
      </div>
    </Container>
  );
}

Cards.propTypes = {
  index: ProPTypes.number,
  thumbnail: propTypes.string,
  name: propTypes.string,
  id: ProPTypes.string,
}.isRequired;

export default Cards;

const Container = styled.div`
  
 
  .card-wrapper {
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
    justify-content: flex-start;
    transform: scale(1);
    transition-duration: 0.5s;
  }
  
  .card-wrapper:hover {
    transform: scale(1.1);
  }
  
  .card-img {
    border: 2px solid rgba(255, 255, 255, 0.94);
    box-shadow: 0px 8px 7px 2px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    display: flex;
    margin: auto;
  }



  h2 {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 15px;
    text-align: center;
    color: #000000;
    margin-top: 5px;
  }

  h3 {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 3px;
    text-align: center;
    color: #7A7A7A;
    position: relative;
  }
`;
