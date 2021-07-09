import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import FooterBar from '../components/FooterBar';
import MealCard from '../components/MealCard';
import SearchBar from '../components/SearchBar';
import ContextRecipes from '../context/ContextRecipes';

function MainFood() {
  const { filteredRecipe, searchBtn, loadingCards,
    setLoadingCards } = useContext(ContextRecipes);
  console.log(filteredRecipe);

  /* Redireciona para a página de detalhes quando existe apenas um resultado da pesquisa */
  if (searchBtn === true && filteredRecipe.meals && filteredRecipe.meals.length === 1) {
    return <Redirect to={ `/comidas/${filteredRecipe.meals[0].idMeal}` } />;
  }
  function renderCards() {
    /* Alerta quando não é encontrado nenhum resultado na pesquisa */
    if (loadingCards && !filteredRecipe.meals) {
      setLoadingCards(false);
      return window.alert(`Sinto muito, não encontramos
        nenhuma receita para esses filtros.`);
    }

    return (
      <section>
        {
          loadingCards && filteredRecipe.meals.map((meal, index) => (
            <MealCard index={ index } meals={ meal } key={ index } />
          ))
        }
      </section>
    );
  }

  return (
    <main>
      <SearchBar />
      { renderCards() }
      <FooterBar />
    </main>
  );
}

export default MainFood;
