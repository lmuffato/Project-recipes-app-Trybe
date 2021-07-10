import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecepies() {
  const doneRecipies = JSON.parse(localStorage.getItem('doneRecipes'));
  const [copy, setCopy] = useState('');

  const filterButtons = () => (
    <section>
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
    </section>
  );

  const mapTags = (array, index) => (
    array && (
      array.map((tag) => (
        <h6 key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</h6>
      ))
    )
  );
  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopy('Link copiado!');
  };

  const renderCards = (data) => (
    data.map((recipe, index) => {
      const { type, id, doneDate, image, category, name, area } = recipe;
      return (
        <Link to={ `/${type}s/${id}` } key={ name }>
          <div
            key={ index }
            className="card"
          >
            <h5 data-testid={ `${index}-horizontal-top-text` }>
              { area !== '' ? `${area} - ${category}` : category}
            </h5>
            <img
              alt="recipe"
              data-testid={ `${index}-horizontal-image` }
              className="recipe-card-image"
              src={ image }
            />
            <button
              type="button"
              // data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => copyLink() }
            >
              <img
                src={ shareIcon }
                alt="share"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            {copy}
            <h4
              data-testid={ `${index}-horizontal-name` }
              className="title"
            >
              {name}
            </h4>
            <h5 data-testid={ `${index}-horizontal-done-date` }>{doneDate}</h5>
            <div>
              {recipe.tags ? mapTags(recipe.tags, index) : null}
            </div>
          </div>
        </Link>
      );
    })
  );

  return (
    <>
      <Header props={ { search: false, title: 'Receitas Feitas' } } />
      {filterButtons()}
      {doneRecipies ? renderCards(doneRecipies) : null}
    </>
  );
}
