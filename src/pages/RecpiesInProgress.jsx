import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HeaderPhoto from '../components/recipiesInProgress/HeaderPhoto';
import AppContext from '../contexts/app/AppContext';
import TitleRecipe from '../components/recipiesInProgress/TitleRecipe';
import ShareButton from '../components/recipiesInProgress/ShareButton';
import FavoriteButton from '../components/recipiesInProgress/FavoriteButton';
import TextSubtitle from '../components/recipiesInProgress/TextSubtitle';
import Ingredients from '../components/recipiesInProgress/Ingredients';
import TextInstructions from '../components/recipiesInProgress/TextInstructions';
// import RecommendedRecipes from '../components/recipiesInProgress/RecommendedRecipes';
import FinishRecipeButton from '../components/recipiesInProgress/FinishRecipeButton';
import HomeIcon from '../icons/appIcons/home.png';

import user from '../configs/configs';

const home = () => (
  <HomeButton>
    <Link to="/comidas">
      <img src={ HomeIcon } alt="teste" />
    </Link>
  </HomeButton>
);

export default function RecpiesInProgress(props) {
  const { match: { params: { id } } } = props;
  const { screens: { drink, food } } = user;
  const url = window.location.href;
  const [isLoading, setIsLoading] = useState(false);
  const [doneRecipe, setDoneRecipe] = useState([]);
  const [item, setItem] = useState({});

  const { screenActive, setScreenActive } = useContext(AppContext);
  const tags = screenActive === 'food' ? item.meals : item.drinks;

  // console.log(props.location.pathname);

  useEffect(() => {
    const dataLS = JSON.parse(localStorage.getItem('doneRecipes'));
    if (dataLS) {
      setDoneRecipe(dataLS);
    }
  }, []);

  useEffect(() => {
    if (/bebidas/.test(url)) {
      setScreenActive(drink);
    } else {
      setScreenActive(food);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const getItem = async () => {
      const API = screenActive === 'food'
        ? 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
        : 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
      const data = await fetch(`${API}${id}`).then((res) => res.json());
      setItem(data);
      setIsLoading(false);
    };
    getItem();
  }, [screenActive]);
  if (isLoading) return <p>Carregando...</p>;
  return (
    <Container>
      <HeaderPhoto item={ tags } />
      <Content>
        <TitleRecipe item={ tags } />
        <MessageClipboard className="message-clipboard">
          Link copiado!
        </MessageClipboard>
        <TopRecipe>
          <ShareButton item={ tags } />
          <FavoriteButton item={ tags } />
          { home() }
        </TopRecipe>
        <TextSubtitle item={ tags } />
        <Ingredients item={ tags } />
        <TextInstructions item={ tags } />
        {/* {
          screenActive === 'food' && <VideoRecipe
            item={ tags }
          />
        } */}
        {/* <RecommendedRecipes /> */}
        {
          doneRecipe.length || !doneRecipe.length
            ? <FinishRecipeButton item={ tags } />
            : null
        }
      </Content>
    </Container>
  );
}

RecpiesInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const TopRecipe = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Content = styled.div`
  width: 96%;
  height: 100%;
`;

const MessageClipboard = styled.span`
  display: none;
  color: green;
`;

const HomeButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 100%;
  color: inherit;
  cursor: pointer;
  font: inherit;
  margin: 8px;
  outline: inherit;
  margin: 0;
  display: flex;
  justify-content: center;

  img {
    width: 30px;
    height: 30px;
  }
`;
