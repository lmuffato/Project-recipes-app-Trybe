import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import DrinkCard from '../components/DrinkCard';
import FooterBar from '../components/FooterBar';
import SearchBar from '../components/SearchBar';

import ContextRecipes from '../context/ContextRecipes';

function MainDrink() {
  const { filteredRecipe, searchBtn,
    loadingCards, setLoadingCards } = useContext(ContextRecipes);

  /* Redireciona para a página de detalhes quando existe apenas um resultado da pesquisa */
  if (searchBtn === true && filteredRecipe.drinks && filteredRecipe.drinks.length === 1) {
    return <Redirect to={ `/bebidas/${filteredRecipe.drinks[0].idDrink}` } />;
  }

  function renderCards() {
    /* Alerta quando não é encontrado nenhum resultado na pesquisa */
    if (loadingCards && !filteredRecipe.drinks) {
      setLoadingCards(false);
      return window.alert(`Sinto muito, não encontramos
        nenhuma receita para esses filtros.`);
    }

    return (
      <section>
        {
          loadingCards && filteredRecipe.drinks.map((drink, index) => (
            <DrinkCard index={ index } drinks={ drink } key={ index } />
          ))
        }
      </section>
    );
  }

  return (
    <main>
      tela principal
      <SearchBar />
      { renderCards() }
      <FooterBar />
    </main>
  );
}

export default MainDrink;
