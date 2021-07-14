import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderRecipes from '../components/HeaderRecipes';
import NavegateButtons from '../components/NavegateButtons';
import DoneAndFavoriteCard from '../components/DoneAndFavoriteCard';
import ContextRecipes from '../context/ContextRecipes';

/*
Esta função renderiza as telas de receitas feitas e favoritas.
Ela busca informações na local storage e as carrega no estado "renderedRecipes"
- Caso o location seja "/receitas-feitas", das informações são buscadas na chave "doneRecipes"
- Caso o Location seja "/receitas-favoritas" as informações são buscadas na chave "favoriteRecipes"
- A função que faz a recuperação das informações também aplica os filtros (all, drinks, food) guardados
  na variável de estado "activeFilter", antes de atualizar a chave "renderedCards"
- É feito um map da variavel "renderedCards" renderizando os cartões por meio do componente "DoneAndFavoriteCard"
- O valor da variável "activeFilter" é definido pelos botões renderizados no componente "NavegateButtons"
*/

function DoneAndFavorites() {
  const { activeFilter } = useContext(ContextRecipes);
  const [renderedCards, setCards] = useState([]);
  const { pathname } = useLocation();
  const local = pathname.split('-')[1];
  useEffect(() => {
    const keyData = local === 'feitas' ? 'doneRecipes' : 'favoriteRecipes';
    const infoCards = JSON.parse(localStorage.getItem(keyData));
    if (infoCards !== null) {
      const filteredCards = infoCards
        .filter((recipe) => activeFilter === 'All' || recipe.type === activeFilter);
      setCards(filteredCards);
    }
  }, [local, activeFilter]);

  return (
    <main>
      <HeaderRecipes />
      <NavegateButtons />
      { renderedCards.map((recipe, index) => (
        <DoneAndFavoriteCard
          key={ index }
          recipe={ recipe }
          local={ local }
          index={ index }
        />
      ))}
    </main>
  );
}

export default DoneAndFavorites;
