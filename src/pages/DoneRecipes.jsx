import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import FilterDoneRecipes from '../components/FilterDoneRecipes';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import RecipeDone from '../effects/RecipeDone';
import '../CSS/DoneRecipes.css';

export default function DoneRecipes() {
  const [state, setState] = useState({
    recipes: [],
    getItems: false,
    curFilter: 'All',
    redirectTo: '',
    redirect: false,
    ByCLickName: false,
  });

  function setCurrFilter(string) {
    setState({ ...state, curFilter: string });
  }

  RecipeDone(state, setState);
  const { recipes, curFilter, getItems, redirectTo, redirect } = state;

  const filterAllFavorites = () => {
    if (curFilter === 'Food') {
      return recipes.filter((item) => item.type.includes('comida'));
    }
    if (curFilter === 'Drinks') {
      return recipes.filter((item) => item.type.includes('bebida'));
    }
    return recipes;
  };

  if (redirect) return <Redirect to={ `${redirectTo}` } />;

  if (!getItems) {
    return <h1>Loading...</h1>;
  }
  if (!recipes) {
    return (
      <div>
        <Header className="header">
          <h1 data-testid="page-title">Receitas Feitas</h1>
        </Header>
        <h1 fontSize="20px" padding="10px">Você não possui nenhuma receita concluida...</h1>
      </div>
    );
  }

  return (
    <div>
      <Header className="header">
        <h1 data-testid="page-title">Receitas Feitas</h1>
      </Header>
      <FilterDoneRecipes setCurrFilter={ setCurrFilter } />
      <div className="cardsDoneRecipes">
        {filterAllFavorites().map((item, index) => (
          <div key={ `${item.index}-${item.name}` } className="cardDoneRecipe">
            <Image
              className="cardDoneRecipeImg"
              src={ item.image }
              onClick={ () => setState({ ...state,
                redirectTo: `${item.type}s/${item.id}`,
                redirect: true }) }
              data-testid={ `${index}-horizontal-image` }
            />
            <p className="title" data-testid={ `${index}-horizontal-top-text` }>
              {`${item.area} - ${item.category} ${item.alcoholicOrNot
                ? item.alcoholicOrNot : ''}`}
            </p>
            <button
              className="doneRecipeButton"
              type="button"
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => setState({ ...state,
                redirectTo: `${item.type}s/${item.id}`,
                ByCLickName: false,
                redirect: true }) }
            >
              {item.name}
            </button>
            <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>

            <ShareButton
              data={ index }
              id={ item.id }
              type={ item.type }
            />
            { item.tags.map((tag, index2) => index2 < 2 && (
              <p
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </p>
            )) }
          </div>
        ))}
      </div>
    </div>
  );
}
