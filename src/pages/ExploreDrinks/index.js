import React, { useState, useEffect } from 'react';
import MenuFooter from '../../components/menuFooter/index';
import Header from '../../components/header/index';
import ButtonExplore from '../../components/buttonExplore';
import { fetchRandonApi } from '../../services/fetchApiMain';
import './ExploreDrinks.css';

export default function ExploreDrinks() {
  const [recipesRandon, setRecipesRandon] = useState([]);

  useEffect(() => {
    fetchRandonApi('thecocktaildb')
      .then((recipes) => setRecipesRandon(recipes[0]));
  }, []);

  const id = Object.values(recipesRandon)[0];
  return (
    <div>
      <Header title="Explorar Bebidas" isSearch={ false } />
      <div className="buttons-container">
        <ButtonExplore
          title="Por Ingredientes"
          path="/explorar/bebidas/ingredientes"
          dataTestId="explore-by-ingredient"
        />
        <ButtonExplore
          title="Me Surpreenda!"
          path={ `/bebidas/${id}` }
          dataTestId="explore-surprise"
        />
      </div>
      <MenuFooter />
    </div>
  );
}
