import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecepies() {
  const doneRecipies = JSON.parse(localStorage.getItem('doneRecipes'));
  const [copy, setCopy] = useState('');
  const [filter, setFilter] = useState('');

  const filterButtons = () => (
    <section>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
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
  const copyLink = (type, id) => {
    const url = type === 'comida' ? `http://localhost:3000/comidas/${id}` : `http://localhost:3000/bebidas/${id}`;
    navigator.clipboard.writeText(url);
    setCopy('Link copiado!');
  };

  const renderCards = (data) => {
    let aux = data;
    if (filter === 'food') aux = data.filter((e) => e.type === 'comida');
    if (filter === 'drink') aux = data.filter((e) => e.type === 'bebida');
    return (
      aux.map((recipe, index) => {
        const {
          type, id, doneDate, image, category, name, area, alcoholicOrNot,
        } = recipe;
        return (
          <div
            key={ index }
            className="card"
          >
            <Link to={ `/${type}s/${id}` } key={ name }>
              <div>
                <h4
                  data-testid={ `${index}-horizontal-name` }
                  className="title"
                >
                  {name}
                </h4>
                <h5 data-testid={ `${index}-horizontal-top-text` }>
                  {
                    area !== '' ? `${area} - ${category}`
                      : `${alcoholicOrNot} - ${category}`
                  }
                </h5>
                <img
                  alt="recipe"
                  data-testid={ `${index}-horizontal-image` }
                  className="recipe-card-image"
                  src={ image }
                />
              </div>
            </Link>
            <button
              type="button"
              onClick={ () => copyLink(type, id) }
            >
              <img
                src={ shareIcon }
                alt="share"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            {copy}
            <h5 data-testid={ `${index}-horizontal-done-date` }>{doneDate}</h5>
            <div>
              {recipe.tags ? mapTags(recipe.tags, index) : null}
            </div>
          </div>
        );
      })
    );
  };

  return (
    <>
      <Header props={ { search: false, title: 'Receitas Feitas' } } />
      {filterButtons()}
      {doneRecipies ? renderCards(doneRecipies) : null}
    </>
  );
}
