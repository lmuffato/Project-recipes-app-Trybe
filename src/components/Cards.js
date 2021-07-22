import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import CardsIcons from './CardsIcons';

function Cards({ index, thumbnail, name, id, type, category }) {
  const { pathname } = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const checkIsFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (checkIsFavorite) {
      if (checkIsFavorite.some((el) => el.id === id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [id]);

  useEffect(() => {
    const checkDoneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (checkDoneRecipe) {
      if (checkDoneRecipe.some((el) => el.id === id)) {
        setIsDone(true);
      } else {
        setIsDone(false);
      }
    }
  }, [id]);

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
            <CardsIcons isFavorite={ isFavorite } isDone={ isDone } />
            <h2
              id={ id }
              data-testid={ `${index}-card-name` }
              className="card-h2"
            >
              { name }
            </h2>
            <h3>{ category }</h3>
          </div>
        </Link>
      </div>
    </Container>
  );
}

Cards.propTypes = {
  index: PropTypes.number,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  flag: PropTypes.string,
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
    width: 100px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    text-align: center;
    color: #000000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    padding: 10px 20px;
    margin: 0px;
    resize: horizontal;
  }

  h3 {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 8px;
    line-height: 3px;
    text-align: center;
    color: #7A7A7A;
    position: relative;
    margin-top: 5px;
  }
`;
