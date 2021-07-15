import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LowerMenu from '../components/LowerMenu';
import Header from '../components/Header';

export default function Explore() {
  return (
    <Container>
      <Header />
      <div className="btn-wrapper">
        <Link to="/explorar/comidas" className="food-btn-link">
          <button
            className="food-btn"
            data-testid="explore-food"
            type="button"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas" className="drink-btn-link">
          <button
            className="drink-btn"
            data-testid="explore-drinks"
            type="button"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <LowerMenu />
    </Container>
  );
}

const Container = styled.div`
  .food-btn {
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    border: 0.5px solid gray;
    width: 322px;
    font-family: Montserrat;
    font-size: 30px;
  }

  .drink-btn {
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    border: 0.5px solid gray;
    width: 322px;
    margin-top: 30px;
    font-family: Montserrat;
    font-size: 30px;
  }

  .btn-wrapper {
    display: flex;
    flex-flow: column;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
  }
`;
