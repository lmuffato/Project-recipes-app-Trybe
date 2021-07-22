import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HeaderPhoto from '../components/DetailsRecipe/HeaderPhoto';
import AppContext from '../contexts/app/AppContext';
import TitleRecipe from '../components/DetailsRecipe/TitleRecipe';
import ShareButton from '../components/DetailsRecipe/ShareButton';
import FavoriteButton from '../components/DetailsRecipe/FavoriteButton';
import TextSubtitle from '../components/DetailsRecipe/TextSubtitle';
import Ingredients from '../components/DetailsRecipe/Ingredients';
import TextInstructions from '../components/DetailsRecipe/TextInstructions';
import VideoRecipe from '../components/DetailsRecipe/VideRecipe';
import RecommendedRecipes from '../components/DetailsRecipe/RecommendedRecipes';
import StartRecipeButton from '../components/DetailsRecipe/StartRecipeButton';
import HomeIcon from '../icons/appIcons/home.png';

import user from '../configs/configs';

const home = () => (
  <HomeButton>
    <Link to="/comidas">
      <img src={ HomeIcon } alt="teste" />
    </Link>
  </HomeButton>
);

export default function DetailsRecipe(props) {
  const { screens: { drink, food } } = user;
  const url = window.location.href;
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState({});
  const [doneRecipe, setDoneRecipe] = useState([]);
  const { match: { params: { id } } } = props;
  const { screenActive, setScreenActive } = useContext(AppContext);
  const tags = screenActive === 'food' ? item.meals : item.drinks;

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
        {
          screenActive === 'food' && <VideoRecipe
            item={ tags }
          />
        }
        <RecommendedRecipes />
        {
          doneRecipe.length || !doneRecipe.length
            ? <StartRecipeButton item={ tags } />
            : null
        }
        {/* {console.log('DetailsRecipe:')}
        {console.log(item)} */}
      </Content>
    </Container>
  );
}

DetailsRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

const Container = styled.div` align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  width: 100%;
`;

const TopRecipe = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Content = styled.div`  height: 100%;
  width: 96%;
`;

const MessageClipboard = styled.span`  color: green;
  display: none;
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
