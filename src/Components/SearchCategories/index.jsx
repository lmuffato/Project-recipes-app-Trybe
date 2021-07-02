import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { getByCategoryName, getCaterories } from '../../services/fetchRecipes';
import './styles.css';
import recipesContext from '../../context/RecipesContext';

export default function SearchCategories({ page }) {
  const NUMBER_CATEGORIES = 5;
  const [categories, setCategory] = useState([]);
  const { recipes, setRecipes } = useContext(recipesContext);
  useEffect(() => {
    getCaterories(page).then((result) => {
      setCategory(result[page]);
    });
  }, [page]);

  const handleCategory = (evt) => {
    evt.preventDefault();
    const { target: { value } } = evt;
    getByCategoryName(page, value).then((result) => (
      setRecipes({
        ...recipes,
        [page]: { results: result[page] },
      })
    ));
  };
  return (
    <div className="categories-container">
      {categories.reduce((acc, curr, index) => (
        index < NUMBER_CATEGORIES ? [...acc, curr] : acc
      ), []).map((category) => (
        <Button
          key={ category.strCategory }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          className="btn-category"
          size="sm"
          value={ category.strCategory }
          onClick={ handleCategory }
        >
          {category.strCategory}
        </Button>
      ))}
    </div>
  );
}

SearchCategories.propTypes = {
  page: PropTypes.string.isRequired,
};
