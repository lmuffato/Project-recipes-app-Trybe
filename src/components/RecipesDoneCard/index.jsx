import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import icon from '../../images/shareIcon.svg';
import './style.css';

export default function RecipesDoneCard({ recipe, index }) {
  const [show, setShow] = useState(false);
  const handleShare = (str) => {
    copy(`http://localhost:3000/${str}/${recipe.id}`);
    setShow(true);
  };
  const renderTag = () => recipe.tags.slice(0, 2).map((tag, tagIndex) => {
    if (tagIndex !== recipe.tags.length - 1) {
      return (
        <span
          data-testid={ `${index}-${tag}-horizontal-tag` }
          key={ tag }
        >
          {tag}
          {' - '}
        </span>
      );
    } return (
      <span
        data-testid={ `${index}-${tag}-horizontal-tag` }
        key={ tag }
      >
        {tag}
      </span>
    );
  });

  const conditional = () => {
    console.log(recipe.id);
    if (recipe.type.toLowerCase().includes('comida')) {
      return (
        <div className="card-container">
          <Link
            to={ `/comidas/${recipe.id}` }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="meal"
            />
          </Link>
          <Link
            to={ `/comidas/${recipe.id}` }
          >
            <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
          </Link>
          <h2 data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.area} - ${recipe.category}`}
          </h2>
          <p>{renderTag()}</p>
          <h4 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</h4>
          <input
            type="image"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => handleShare('comidas') }
            src={ icon }
            alt="share"
          />
          {show ? <h2>Link copiado!</h2> : null}
        </div>
      );
    } return (
      <div className="card-container">
        <Link to={ `/bebidas/${recipe.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt="meal"
          />
        </Link>
        <Link to={ `/bebidas/${recipe.id}` }>
          <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
        </Link>
        <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
        <input
          type="image"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => handleShare('comidas') }
          src={ icon }
          alt="share"
        />
        {show ? <h2>Link copiado!</h2> : null}
      </div>
    );
  };
  return (
    <div>
      {conditional()}
    </div>
  );
}

RecipesDoneCard.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    area: PropTypes.string,
    doneDate: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
}.isRequired;
