import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import context from '../../context/RecipesContext';
import fetchCategories from '../../services/fetchCategories';
import fetchRecipes from '../../services/fetchRecipes';
import './style.css';

const MainDrinks = () => {
  const history = useHistory();
  const { recipesDrinks, setRecipesDrinks } = useContext(context);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [isFiltering, setFiltering] = useState(false);
  const [previousTarget, setPreviousTarget] = useState(null);
  const btnAllRecipes = useRef(null);
  const MAX_LENGTH_RECIPES = 12;
  const MAX_LENGTH_CATEGORIES = 5;

  const getRecipes = useCallback(async () => {
    await fetchRecipes(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    ).then(({ drinks }) => setRecipesDrinks(drinks.slice(0, MAX_LENGTH_RECIPES)));
  }, [setRecipesDrinks]);

  const getRecipesByCategory = useCallback(async (name) => {
    await fetchRecipes(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`,
    ).then(({ drinks }) => setRecipesDrinks(drinks.slice(0, MAX_LENGTH_RECIPES)));
  }, [setRecipesDrinks]);

  useEffect(() => {
    const getCategories = async () => {
      await fetchCategories(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
      ).then(({ drinks }) => setCategories(drinks.slice(0, MAX_LENGTH_CATEGORIES)));
    };
    getCategories();
    if (!isFiltering && recipesDrinks.length === 0) {
      getRecipes();
    }
  }, [getRecipes, isFiltering, recipesDrinks]);

  const handleSelectCategory = ({ target, target: { name } }) => {
    setPreviousTarget(target);
    if (previousTarget) {
      previousTarget.style.backgroundColor = '#d7d7d7';
    }
    if (name === categoryName) {
      setFiltering(false);
      getRecipes();
      setCategoryName('');
      target.style.backgroundColor = '#d7d7d7';
      btnAllRecipes.current.style.backgroundColor = '#ffc529';
    } else {
      setFiltering(true);
      setCategoryName(name);
      getRecipesByCategory(name);
      btnAllRecipes.current.style.backgroundColor = '#d7d7d7';
      target.style.backgroundColor = '#ffc529';
    }
  };

  const setAllRecipes = () => {
    getRecipes();
    previousTarget.style.backgroundColor = '#d7d7d7';
    btnAllRecipes.current.style.backgroundColor = '#ffc529';
  };

  const redirectToDescription = ({ target }) => {
    const { id } = target.parentElement;
    history.push(`/bebidas/${id}`);
  };

  return (
    <section className="drinks-page">
      <Header title="Bebidas" />
      <div className="buttons-categories">
        <Button
          ref={ btnAllRecipes }
          onClick={ setAllRecipes }
          style={ { backgroundColor: '#ffc529' } }
          data-testid="All-category-filter"
        >
          All
        </Button>
        {categories.map(({ strCategory }, i) => (
          <Button
            key={ i }
            name={ strCategory }
            onClick={ handleSelectCategory }
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </Button>
        ))}
      </div>
      {recipesDrinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
        <div
          key={ idDrink }
          id={ idDrink }
          onClick={ redirectToDescription }
          aria-hidden="true"
          onKeyDown={ redirectToDescription }
          data-testid={ `${index}-recipe-card` }
          className="recipe-card"
        >
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{strDrink}</p>
        </div>
      ))}
      <Footer />
    </section>
  );
};

export default MainDrinks;
