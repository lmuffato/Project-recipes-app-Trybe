import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import SearchBarButton from '../components/SearchBar/SearchBarButton';
import SearchBar from '../components/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import useFetchRecipes from '../effects/useFetchRecipes';
import RecipesContainer from '../styles/home';
import CategoriesList from '../components/CategoriesList/CategoriesList';
import CardList from '../components/CardList/CardList';
import { RecipesContext } from '../context/RecipesContext';
import useDetailsProvider from '../hooks/useDetailsProvider';

function Home(props) {
  const { type } = props;
  const [, setFetchUrl] = useFetchRecipes(type);
  const { setIsRecommended } = useDetailsProvider();
  const { recipesContext } = useContext(RecipesContext);
  const [recipes, setRecipes] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const handleToggleSearchBar = (ev) => {
    ev.preventDefault();
    setIsActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (type === 'meals') return setFetchUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    return setFetchUrl('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  }, [setFetchUrl, type]);

  useEffect(() => {
    if (recipesContext[type]) setRecipes(recipesContext[type]); // pega do estado global e seta no estado da pg
    setIsRecommended(false);
  }, [recipesContext, setIsRecommended, type]);

  // useEffect(() => {
  //   getFilteredRecipes(type);
  // }, [type, searchBarFilters, getFilteredRecipes]);

  return (
    <>
      <Header>
        { type === 'meals'
          ? (<h2 data-testid="page-title">Comidas</h2>) : (
            <h2 data-testid="page-title">Bebidas</h2>)}
        <SearchBarButton onClick={ handleToggleSearchBar } />
      </Header>
      <div>
        { isActive ? (<SearchBar type={ type } />) : (<CategoriesList type={ type } />) }
      </div>
      <RecipesContainer>
        <CardList recipes={ recipes } type={ type } />
      </RecipesContainer>
      <Footer />
    </>
  );
}

Home.propTypes = {
  recipe: PropTypes.string,
}.isRequired;

export default Home;
