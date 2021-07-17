import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

function ExploreDrinks() {
  const [randomDrink, setRandomDrink] = useState([]);
  async function requestRandomDrink() {
    const fetchAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const response = await fetchAPI.json();
    // console.log(response);
    setRandomDrink(response.drinks[0].idDrink);
  }

  useEffect(() => {
    requestRandomDrink();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to={ `/bebidas/${randomDrink}` }>
          <button
            data-testid="explore-surprise"
            type="button"
          >
            Me Surpreenda!
          </button>
        </Link>
      </Container>
      <LowerMenu />
    </>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  a button {
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border-radius: 6px;
    border: 0.5px solid gray;
    width: 322px;
    font-family: Montserrat;
    font-size: 30px;
  }

  a + a {
    margin-top: 20px;
  }
`;

export default ExploreDrinks;
