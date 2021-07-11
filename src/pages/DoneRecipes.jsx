import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import FilterDoneRecipes from '../components/FilterDoneRecipes';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import RecipeDone from '../effects/RecipeDone';

export default function DoneRecipes() {
  const [state, setState] = useState({
    recipes: [],
    getItems: false,
  });

  RecipeDone(state, setState);
  const { recipes, getItems } = state;
  if (!getItems) {
    return <h1>Loading...</h1>;
  }
  if (!recipes) return <h1>Você não possui nenhuma receita concluida...</h1>;
  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Receitas Feitas</h1>
      </Header>
      <FilterDoneRecipes />
      {recipes.map((item, index) => (
        <div key={ `${item.index}-${item.name}` }>
          <Image
            style={ { width: '18rem' } }
            src={ item.image }
            data-testid={ `${index}-horizontal-image` }
          />
          <h2 data-testid={ `${index}-horizontal-top-text` }>{item.category}</h2>
          <h1 data-testid={ `${index}-horizontal-name` }>{item.name}</h1>
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
  );
}
