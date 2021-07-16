import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import ShareImage from '../icons/appIcons/share.png';
import IconAll from '../icons/allIconAndButton/allIcon/all.png';
import IconBebidas from '../icons/appIcons/bebidas.png';
import IconComidas from '../icons/appIcons/comidas.png';

const doneRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];
function FinishedRecipies() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('All');
  useEffect(() => {
    setList(doneRecipes);
  }, []);
  useEffect(() => {
    switch (filter) {
    case 'All':
      setList(doneRecipes);
      break;
    case 'Food':
      setList(doneRecipes.filter((recipe) => recipe.type === 'comida'));
      break;
    case 'Drinks':
      setList(doneRecipes.filter((recipe) => recipe.type === 'bebida'));
      break;
    default:
      break;
    }
  }, [filter]);
  return (
    <div>
      <Header />
      <Container>
        <Filters>
          <Button data-testid="filter-by-all-btn" onClick={ () => setFilter('All') }>
            <IconImageButton src={ IconAll } alt="icon" />
            All
          </Button>
          <Button data-testid="filter-by-food-btn" onClick={ () => setFilter('Food') }>
            <IconImageButton src={ IconComidas } alt="icon" />
            Food
          </Button>
          <Button data-testid="filter-by-drink-btn" onClick={ () => setFilter('Drinks') }>
            <IconImageButtonDrinks src={ IconBebidas } alt="icon" />
            Drinks
          </Button>
        </Filters>
        {
          list.map((recipe, index) => (
            <CardRecipe key={ index }>
              <ImageRecipe>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <Image
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                  />
                </Link>
              </ImageRecipe>
              <ContentRecipe>
                <div style={ { display: 'flex' } }>
                  <TextCategory data-testid={ `${index}-horizontal-top-text` }>
                    {
                      recipe.type === 'comida'
                        ? `${recipe.area} - ${recipe.category}`
                        : `${recipe.alcoholicOrNot}`
                    }
                  </TextCategory>
                  <ShareIcon
                    onClick={ () => {
                      copy(`${window.location.origin}/comidas/${recipe.id}`);
                      document.getElementById(`${index}-style`).style.display = 'block';
                    } }
                  >
                    <ImageShare
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ ShareImage }
                    />
                  </ShareIcon>
                </div>
                <MessageCopied id={ `${index}-style` } showmessage={ false }>
                  Link copiado!
                </MessageCopied>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <TextName data-testid={ `${index}-horizontal-name` }>
                    { recipe.name }
                  </TextName>
                </Link>
                <TextDate data-testid={ `${index}-horizontal-done-date` }>
                  { recipe.doneDate }
                </TextDate>
                <Tags>
                  <ul>
                    {
                      recipe.tags.map((tagName, i) => (
                        <TextTag
                          key={ i }
                          data-testid={ `${index}-${tagName}-horizontal-tag` }
                        >
                          { tagName }
                        </TextTag>
                      ))
                    }
                  </ul>
                </Tags>
              </ContentRecipe>
            </CardRecipe>
          ))
        }
      </Container>
    </div>
  );
}
export default FinishedRecipies;

const IconImageButtonDrinks = styled.img` height: 24px;
    width: 13px;
`;
const IconImageButton = styled.img` height: 22px;
  width: 22px;
`;
const Container = styled.div` align-items: center;
  display: flex;
  flex-direction: column;
  font-family: Montserrat , sans-serif;
  width: 100%;
`;
const Filters = styled.div` display: flex;
  height: auto;
  justify-content: space-around;
  padding: 20px;
  width: 100%;
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
const CardRecipe = styled.div` align-items: center;
  background-color: #f1f1f1;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  height: 180px;
  justify-content: space-between;
  margin: 5px;
  padding: 10px;
  width: 90%;
`;
const ImageRecipe = styled.div` display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 40%;
`;
const ContentRecipe = styled.div` display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin-left: 14px;
  padding: 10px;
  width: 65%;
`;
const TextCategory = styled.div` color: rgb(160, 160, 160);
  width: 100%;
`;
const MessageCopied = styled.p` color: green;
  display: ${(props) => (props.showmessage ? 'block' : 'none')};
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
  border-radius: 20px;
  box-shadow: 2px 4px 6px 1px rgba(0, 0, 0, 0.64);
  color: #363636;
  display: inline;
  padding: 4px;

  +li {
    margin-left: 5px;
  }
  width: 100%;
`;
const ImageShare = styled.img` height: 26px;
  width: 32px;
`;
