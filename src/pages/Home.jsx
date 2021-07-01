import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import SearchBarButton from '../components/SearchBar/SearchBarButton';
import SearchBar from '../components/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import useFetchRecipes from '../effects/useFetchRecipes';
// import Card from '../components/Card/Card';
import CardList from '../components/CardList/CardList';

function Home(props) {
  const { type } = props;
  const fetchData = useFetchRecipes(type);
  const [recipes, setRecipes] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const handleToggleSearchBar = (ev) => {
    ev.preventDefault();
    setIsActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (fetchData[type]) setRecipes(fetchData[type]);
  }, [fetchData, type]);

  return (
    <>
      <Header>
        <h2 data-testid="page-title">Comidas</h2>
        <SearchBarButton onClick={ handleToggleSearchBar } />
      </Header>
      <div>
        { isActive ? (<SearchBar type={ type } />) : ''}
      </div>
      <div>
        {/* <div>
          { recipes.length === 0 ? 'Loading...'
            : recipes.map((recipe, i) => (
              <Card recipe={ recipe } key={ i } index={ i } />)) }
        </div> */}
        <CardList recipes={ recipes } type={ type } />
      </div>
      <Footer />
    </>
  );
}

Home.propTypes = {
  recipe: PropTypes.string,
}.isRequired;

export default Home;
