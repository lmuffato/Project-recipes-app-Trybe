import React, { createContext, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { getRecipes } from '../services/recipesData';
import useLocalStorage from '../hooks/useLocalStorage';

export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [titlePage, setTitlePage] = useState('');
  const [currentFilter, setCurrentFilter] = useState('');
  const { location, push: historyPush } = useHistory();
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);

  const {
    doneRecipes: doneRecipesInLocalStorage,
    inProgressRecipes: inProgressRecipesInLocalStorage,
  } = useLocalStorage('doneRecipes', 'inProgressRecipes');

  const {
    favoriteRecipe: favoriteRecipeInLocalStorage,
  } = useLocalStorage('favoriteRecipes');

  useEffect(() => {
    if (!doneRecipesInLocalStorage) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
      setDoneRecipes([]);
    }

    if (!inProgressRecipesInLocalStorage) {
      localStorage.setItem(
        'inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }),
      );
      setInProgressRecipes({ cocktails: {}, meals: {} });
    } else {
      setDoneRecipes(doneRecipesInLocalStorage);
      setInProgressRecipes(inProgressRecipesInLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (!favoriteRecipeInLocalStorage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      setFavoriteRecipe([]);
    } else {
      setFavoriteRecipe(favoriteRecipeInLocalStorage);
    }
  }, [favoriteRecipeInLocalStorage]);

  const loadRecipes = useCallback(async (pathname) => {
    const recipesLimit = 12;
    const categoriesLimit = 5;
    const results = await getRecipes(pathname);
    if (results) {
      setRecipes(results.list.slice(0, recipesLimit));
      setCategories(results.categories.slice(0, categoriesLimit));
      setTitlePage(results.titlePage);
      setCurrentFilter('All');
    }
  }, []);

  function removeRecipeInProgress(id, type) {
    switch (type) {
    case 'comida': {
      const { [id]: recipeId, ...meals } = inProgressRecipes.meals;
      const updatedInProgressRecipes = { ...inProgressRecipes, meals };
      setInProgressRecipes(updatedInProgressRecipes);
      localStorage.setItem('inProgressRecipes', JSON.stringify(updatedInProgressRecipes));
      break;
    }

    case 'bebida': {
      const { [id]: recipeId, ...cocktails } = inProgressRecipes.cocktails;
      const updatedInProgressRecipes = { ...inProgressRecipes, cocktails };
      setInProgressRecipes(updatedInProgressRecipes);
      localStorage.setItem('inProgressRecipes', JSON.stringify(updatedInProgressRecipes));
      break;
    }

    default:
      break;
    }
  }

  function addDoneRecipe(id, recipe, pathname) {
    const lastCharacter = -1;
    const date = {
      day: String(new Date().getUTCDate()).padStart(2, '0'),
      month: String(new Date().getUTCMonth() + 1).padStart(2, '0'),
      year: new Date().getUTCFullYear(),
    };
    const newDoneRecipe = {
      id,
      type: pathname.split('/')[1].slice(0, lastCharacter),
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.name,
      image: recipe.imagePath,
      doneDate: `${date.day}/${date.month}/${date.year}`,
      tags: recipe.strTags,
    };

    const newDoneRecipes = [...doneRecipes, newDoneRecipe];

    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));

    setDoneRecipes(newDoneRecipes);
    removeRecipeInProgress(id, pathname.split('/')[1].slice(0, lastCharacter));
  }

  function addFavoriteRecipe(id, recipe, pathname) {
    const lastCharacter = -1;
    const newFavoriteRecipe = {
      id,
      type: pathname.split('/')[1].slice(0, lastCharacter),
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.name,
      image: recipe.imagePath,
    };

    const newFavoriteRecipes = [...favoriteRecipe, newFavoriteRecipe];

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));

    setFavoriteRecipe(newFavoriteRecipes);
  }

  function addRecipeInProgress(type, id, ingredients) {
    let updatedInProgressRecipes = {};
    switch (type) {
    case 'comida': {
      const { meals } = inProgressRecipes;
      meals[id] = ingredients;
      updatedInProgressRecipes = { ...inProgressRecipes, meals };
      break;
    }

    case 'bebida': {
      const { cocktails } = inProgressRecipes;
      cocktails[id] = ingredients;
      updatedInProgressRecipes = { ...inProgressRecipes, cocktails };
      break;
    }

    default:
      break;
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedInProgressRecipes));
    setInProgressRecipes(updatedInProgressRecipes);
  }

  const switchFilters = useCallback(async (filter, event) => {
    let results = [];
    switch (filter.type) {
    case 'category': {
      if (currentFilter.category !== filter.content && filter.content !== 'All') {
        results = await getRecipes(location.pathname, { category: filter.content });
        setCurrentFilter({ category: filter.content });
      } else {
        if (event) {
          event.target.checked = false;
        }
        results = await getRecipes(location.pathname);
        results = results.list;
        setCurrentFilter({ category: 'All' });
      }
      break;
    }

    case 'name': {
      results = await getRecipes(location.pathname, { name: filter.content });
      setCurrentFilter({ name: filter.content });
      break;
    }

    case 'ingredient': {
      if (filter.pathname === location.pathname) {
        results = await getRecipes(location.pathname, { ingredient: filter.content });
        setCurrentFilter({ ingredient: filter.content });
      }
      break;
    }

    case 'firstletter': {
      if (filter.content.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      results = await getRecipes(location.pathname, { firstletter: filter.content });
      setCurrentFilter({ firstletter: filter.content });
      break;
    }

    default: {
      results = await getRecipes(location.pathname);
      results = results.list;
      setCurrentFilter({ category: 'All' });
      break;
    }
    }
    return results;
  }, [currentFilter.category, location.pathname]);

  const filterRecipe = useCallback(async (filter, event) => {
    const recipesLimit = 12;
    try {
      const results = await switchFilters(filter, event);
      if (results && results.length === 1) {
        historyPush(`${location.pathname}/${results[0].id}`);
      }

      setRecipes(results.slice(0, recipesLimit));
    } catch (error) {
      console.log(error);
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [historyPush, location.pathname, switchFilters]);

  const value = {
    recipes,
    categories,
    titlePage,
    filterRecipe,
    loadRecipes,
    inProgressRecipes,
    doneRecipes,
    addDoneRecipe,
    addRecipeInProgress,
    addFavoriteRecipe,
  };

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
