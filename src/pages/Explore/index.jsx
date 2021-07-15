import React, { useCallback, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import Dropdown from './components/Dropdown';
import Header from '../../components/Header';
import { getRecipes } from '../../services/recipesData';
import ExploreButtons from './components/ExploreButtons';
import ExploreCards from './components/ExploreCards';
import styles from './styles.module.scss';
import Footer from '../../components/footer';

function Explore() {
  const [titlePage, setTitlePage] = useState('');
  const [randomId, setRandomId] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [areas, setAreas] = useState([]);

  const { meal, type } = useParams();

  const loadExploreData = useCallback(async () => {
    const response = await getRecipes(`/explorar/${meal}`, 'filtro');
    if (response) {
      setTitlePage(response.titlePage);
      setIngredients(response.ingredients.slice(0, Number('12')));
      setRandomId(response.random[0].id);
      if (response.areas) {
        setAreas(response.areas);
      }
    }
  }, [meal]);

  useEffect(() => {
    loadExploreData();
  }, [loadExploreData]);

  if (!type) {
    return (
      <div className={ styles.page }>
        <div className={ styles.explorePage }>
          {meal && <Header title={ meal ? titlePage : 'Explorar' } hideSearch />}
          <div className={ styles.exploreContent }>
            {!type && <ExploreButtons title={ meal } randomRecipe={ randomId } />}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <>
      {meal && <Header title={ type } hideSearch />}
      <div className={ styles.cardPage }>
        {type === 'ingredientes' && <ExploreCards ingredients={ ingredients } />}
        {type === 'area' && <Dropdown areas={ areas } />}
      </div>
      <Footer />
    </>
  );
}

export default Explore;
