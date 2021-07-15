import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import CardFavorite from '../components/CardFavorite';
import Header from '../components/Header';
import IconAll from '../icons/allIconAndButton/allIcon/all.png';
import AppProvider from '../contexts/app/AppContext';
import IconBebidas from '../icons/appIcons/bebidas.png';
import IconComidas from '../icons/appIcons/comidas.png';

function FavoriteRecepies() {
  const [arrayRecipes, setArrayRecipes] = useState([]);
  const [value, setValue] = useState('All');
  const { renderFavorites } = useContext(AppProvider);

  function getArrayStorage() {
    const arrStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (value === 'comida') {
      return setArrayRecipes(arrStorage.filter((recipe) => recipe.type === 'comida'));
    }
    if (value === 'bebida') {
      return setArrayRecipes(arrStorage.filter((recipe) => recipe.type === 'bebida'));
    }
    setArrayRecipes(arrStorage);
  }

  useEffect(() => {
    getArrayStorage();
  }, [value, renderFavorites]);

  return (
    <div>
      <Header />
      <Filters>
        <Button
          data-testid="filter-by-all-btn"
          onClick={ ({ target }) => setValue(target.value) }
          value="All"
        >
          <IconImageButton src={ IconAll } alt="icon" />
          All
        </Button>
        <Button
          data-testid="filter-by-food-btn"
          onClick={ ({ target }) => setValue(target.value) }
          value="comida"
        >
          <IconImageButton src={ IconComidas } alt="icon" />
          Food
        </Button>
        <Button
          data-testid="filter-by-drink-btn"
          onClick={ ({ target }) => setValue(target.value) }
          value="bebida"
        >
          <IconImageButtonDrinks
            src={ IconBebidas }
            alt="icon"
          />
          Drinks
        </Button>
      </Filters>
      {arrayRecipes ? arrayRecipes.map((recipe, index) => (
        <Container key={ index }>
          <CardFavorite
            index={ index }
            image={ recipe.image }
            name={ recipe.name }
            category={ recipe.category }
            id={ recipe.id }
            area={ recipe.area }
            alcoholicOrNot={ recipe.alcoholicOrNot }
            type={ recipe.type }
            tags={ recipe.tags }
            doneDate={ recipe.doneDate }
          />
        </Container>)) : ''}
    </div>
  );
}

export default FavoriteRecepies;

const IconImageButtonDrinks = styled.img` height: 22px;
  width: 13px;
`;

const Filters = styled.div` display: flex;
  height: auto;
  justify-content: space-around;
  padding: 20px;
  width: 100%;
`;

const IconImageButton = styled.img` height: 22px;
  width: 22px;
`;

const Button = styled.button` align-items: center;
  background: none;
  background-color: rgb(214, 168, 40);
  border: none;
  border-radius: 6px;
  color: inherit;
  cursor: pointer;
  display: flex;
  font: inherit;
  height: auto;
  justify-content: space-around;
  outline: inherit;
  padding: 4px;
  width: 80px;
`;

const Container = styled.div` display: flex;
  justify-content: center;
`;
