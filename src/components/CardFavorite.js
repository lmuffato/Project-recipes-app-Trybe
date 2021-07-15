import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ShareImage from '../icons/appIcons/share.png';
import FavoriteIconEnabled from '../icons/appIcons/favoriteEnable.png';
import AppProvider from '../contexts/app/AppContext';

function CardFavorite({ image, name, category, id, area,
  alcoholicOrNot, index, type, doneDate, tags }) {
  const { setRenderFavorites, renderFavorites } = useContext(AppProvider);
  const [showMessage, setShowMessage] = useState(false);

  function removeLocalStorage(event) {
    const recipeId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    const arr = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const arrFilter = arr.filter((recipe) => recipe.id !== recipeId);
    setRenderFavorites(!renderFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrFilter));
  }

  function shareUrl() {
    navigator
      .clipboard
      .writeText(`${window.location.protocol}//${window.location.host}/${type}s/${id}`);
    console.log(window.location.hostname);
    console.log(window.location.protocol);
    console.log(window.location.host);
    console.log(`${window.location.hostname}:${window.location.port}/${type}s/${id}`);
    console.log(`${window.location.host}/${type}s/${id}`);
    setShowMessage(!showMessage);
  }

  return (
    <Container id={ id }>
      <ImageRecipe>
        <Link to={ `${type}s/${id}` }>
          <Image
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ name }
          />
        </Link>
      </ImageRecipe>
      <ContentRecipe>
        <TextCategory data-testid={ `${index}-horizontal-top-text` }>
          {type === 'comida' ? `${area} - ${category}` : `${alcoholicOrNot}`}
        </TextCategory>
        <Link to={ `${type}s/${id}` }>
          <TextName data-testid={ `${index}-horizontal-name` }>
            { name }
          </TextName>
        </Link>
        <ContaineButtons>
          <ShareIcon onClick={ shareUrl }>
            <ImageIcon
              data-testid={ `${index}-horizontal-share-btn` }
              src={ ShareImage }
            />
          </ShareIcon>
          <FavoriteButton
            type="button"
            onClick={ removeLocalStorage }
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ FavoriteIconEnabled }
          >
            <ImageIcon
              src={ FavoriteIconEnabled }
              alt="Compartilhar"
            />
          </FavoriteButton>
        </ContaineButtons>
        { showMessage ? <MessageClipboard>Link copiado!</MessageClipboard> : ''}

        <TextDate data-testid={ `${index}-horizontal-done-date` }>
          { doneDate }
        </TextDate>
        <Tags>
          <Uls>
            {tags ? tags.map((tagName, i) => (
              <TextTag
                key={ i }
                data-testid={ `${i}-${tagName}-horizontal-tag` }
              >
                { tagName }
              </TextTag>
            )) : ''}
          </Uls>
        </Tags>
      </ContentRecipe>
    </Container>
  );
}

CardFavorite.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default CardFavorite;

const ContaineButtons = styled.div` display: flex;
  justify-content: space-between;
  padding: 8px;
`;

const Container = styled.div` align-content: center;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  box-sizing: content-box;
  display: flex;
  font-family: Montserrat , sans-serif;
  height: auto;
  justify-content: space-between;
  margin: 16px 0;
  width: 93%;
`;
const FavoriteButton = styled.button` background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  height: 26px;
  margin-right: 10px;
  outline: inherit;
  padding: 0;
  width: 20px;
`;
const ImageRecipe = styled.div` display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 40%;
`;
const ContentRecipe = styled.div` align-items: er;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: center;
  margin-left: 14px;
  padding: 10px;
`;
const TextCategory = styled.div` color: rgb(160, 160, 160);
  width: 100%;
`;
const MessageClipboard = styled.p` color: green;
  margin: 0;
  width: 100%;
`;
const TextName = styled.div` color: #363636;
  font-weight: 600;
  width: 100%;
`;
const TextDate = styled.div` color: #363636;
  font-weight: 500;
  width: 100%;
`;
const ShareIcon = styled.button` background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  height: 26px;
  margin-right: 10px;
  outline: inherit;
  padding: 0;
  width: 20px;
`;
const Image = styled.img` border-radius: 100%;
  box-shadow: 2px 4px 6px 1px rgba(0, 0, 0, 0.64);
  object-fit: cover;
  width: 100%;
`;
const Tags = styled.div` margin-top: 6px;
  width: 80%;
`;
const TextTag = styled.li` background-color: rgba(236, 222, 222, 1);
  border-radius: 10px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.65);
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  margin: 5px;
  padding: 2px 4px;
`;

const Uls = styled.ul` align-items: center;
  display: flex;
  flex-flow: row wrap;
`;
const ImageIcon = styled.img` height: 26px;
  width: 32px;
`;
