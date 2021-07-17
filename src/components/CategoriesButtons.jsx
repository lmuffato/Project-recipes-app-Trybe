import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import '../styleSheets/CategoriesButtons.css';

import ContextRecipes from '../context/ContextRecipes';

function CategoriesButtons(props) {
  const { type } = props;
  const [choisedCategory, setChoisedCategory] = useState('All');
  const { categories, getRecipes } = useContext(ContextRecipes);
  const avaliableButtons = 6;
  return (
    <aside className="categories-container">
      { categories.map((category, index) => (
        <button
          key={ index }
          type="button"
          className={ category === choisedCategory
            ? 'category-button selected' : 'category-button' }
          data-testid={ index < avaliableButtons ? `${category}-category-filter` : '' }
          onClick={ () => {
            if (category === choisedCategory) {
              setChoisedCategory('All');
              getRecipes('All', type);
            } else {
              setChoisedCategory(category);
              getRecipes(category, type);
            }
          } }
        >
          <p className="text-button">{category}</p>
        </button>
      ))}
    </aside>
  );
}

CategoriesButtons.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CategoriesButtons;
