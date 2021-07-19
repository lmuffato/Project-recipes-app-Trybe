import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import context from '../../context/RecipesContext';
import FoodLoader from '../../components/Loader/Food';
import fetchRecipes from '../../services/fetchRecipes';
import fetchCategories from '../../services/fetchCategories';
import './style.css';

const MainFoods = () => {
  const { recipesFoods, setRecipesFoods, isLoading, setLoading } = useContext(context);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [isFiltering, setFiltering] = useState(false);
  const [previousTarget, setPreviousTarget] = useState(null);
  const [recipeClickedId, setRecipeClicked] = useState('');
  const btnAllRecipes = useRef(null);
  const MAX_LENGTH_RECIPES = 12;
  const MAX_LENGTH_CATEGORIES = 5;

  const getRecipes = useCallback(async () => {
    await fetchRecipes(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    ).then(({ meals }) => {
      if (meals.length > MAX_LENGTH_RECIPES) {
        setRecipesFoods(meals.slice(0, MAX_LENGTH_RECIPES));
      } else {
        setRecipesFoods(meals);
      }
    });
  }, [setRecipesFoods]);

  const getRecipesByCategory = useCallback(
    async (name) => {
      await fetchRecipes(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`,
      ).then(({ meals }) => setRecipesFoods(meals.slice(0, MAX_LENGTH_RECIPES)));
    },
    [setRecipesFoods],
  );

  useEffect(() => {
    const getCategories = async () => {
      await fetchCategories(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      ).then(({ meals }) => setCategories(meals.slice(0, MAX_LENGTH_CATEGORIES)));
    };
    getCategories();
    const validations = [!isFiltering, recipesFoods.length === 0];
    if (!validations.includes(false)) {
      getRecipes();
    }
    const TIMEOUT = 2000;
    setTimeout(() => setLoading(false), TIMEOUT);
    return () => setLoading(true);
  }, [getRecipes, isFiltering, recipesFoods.length, setLoading]);

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
    setFiltering(false);
    getRecipes();
    setCategoryName('');
    previousTarget.style.backgroundColor = '#d7d7d7';
    btnAllRecipes.current.style.backgroundColor = '#ffc529';
  };

  if (isLoading) {
    return <FoodLoader />;
  }

  if (recipeClickedId) {
    return <Redirect to={ `/comidas/${recipeClickedId}` } />;
  }

  return (
    <section className="foods-page">
      <Header title="Comidas" />
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
      {recipesFoods.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <div
          key={ index }
          onClick={ () => setRecipeClicked(idMeal) }
          aria-hidden
          data-testid={ `${index}-recipe-card` }
          className="recipe-card"
        >
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{strMeal}</p>
        </div>
      ))}
      <Footer />
    </section>
  );
};

export default MainFoods;
