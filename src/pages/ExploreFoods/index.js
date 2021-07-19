import React, { useState, useEffect } from 'react';
import MenuFooter from '../../components/menuFooter/index';
import Header from '../../components/header/index';
import ButtonExplore from '../../components/buttonExplore';
import { fetchRandonApi } from '../../services/fetchApiMain';
import './ExploreFoods.css';

export default function ExploreFoods() {
  const [recipesRandon, setRecipesRandon] = useState([]);

  useEffect(() => {
    fetchRandonApi('themealdb')
      .then((recipes) => setRecipesRandon(recipes[0]));
  }, []);

  const id = Object.values(recipesRandon)[0];
  return (
    <div>
      <Header title="Explorar Comidas" isSearch={ false } />
      <div className="buttons-container">
        <ButtonExplore
          title="Por Ingredientes"
          path="/explorar/comidas/ingredientes"
          dataTestId="explore-by-ingredient"
        />
        <ButtonExplore
          title="Por Local de Origem"
          path="/explorar/comidas/area"
          dataTestId="explore-by-area"
        />
        <ButtonExplore
          title="Me Surpreenda!"
          path={ `/comidas/${id}` }
          dataTestId="explore-surprise"
        />
      </div>
      <MenuFooter />
    </div>
  );
}
