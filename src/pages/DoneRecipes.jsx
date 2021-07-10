import React, { useState } from 'react';
// import { Image } from 'react-bootstrap';
// import FilterDoneRecipes from '../components/FilterDoneRecipes';
import Header from '../components/Header';
// import ShareButton from '../components/ShareButton';
import RecipeDone from '../effects/RecipeDone';

export default function DoneRecipes() {
  const [state, setState] = useState({
    recipes: [],
    getItems: false,
  });

  RecipeDone(state, setState);
  // const { recipes, getItems } = state;
  // if (!getItems) {
  //   return (
  //     <Header>
  //       <h1 data-testid="page-title">Receitas Feitas</h1>
  //     </Header>
  //   );
  // }
  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Receitas Feitas</h1>
      </Header>
      {/* {recipes.map((item, index) => (
        <>
          <FilterDoneRecipes />
          <Image src={ item.image } data-testid={ `${index}-horizontal-image` } />
          <h2 data-testid={ `${index}-horizontal-top-text` } />
          <h1 data-testid={ `${index}-horizontal-name` } />
          <p data-testid={ `${index}-horizontal-done-date` } />
          <ShareButton />
          <h3 data-testid={ `${index}-${tagName}-horizontal-tag` } />
        </>
      ))} */}
    </div>
  );
}
