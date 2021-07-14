import React, { useCallback, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import HeaderBack from '../../components/HeaderBack';
import getRecipes from '../../services/recipesData';
import Dropdown from './components/Dropdown';
import ExploreButtons from './components/ExploreButtons';
import ExploreCards from './components/ExploreCards';
import styles from './styles.module.scss';

function Explore() {
  const [titlePage, setTitlePage] = useState('');
  const [randomId, setRandomId] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const { meal, type } = useParams();

  const loadExploreData = useCallback(async () => {
    const response = await getRecipes(`/explorar/${meal}`);
    if (response) {
      setTitlePage(response.titlePage);
      setIngredients(response.ingredients.slice(0, Number('12')));
      setRandomId(response.random[0].id);
    }
  }, [meal]);

  useEffect(() => {
    loadExploreData();
  }, [loadExploreData]);

  const url = `${meal}/${type}`;

  if (!type) {
    return (
      <div className={ styles.page }>
        <div className={ styles.explorePage }>
          {meal && <HeaderBack title={ titlePage } />}
          <div className={ styles.exploreContent }>
            {!type && <ExploreButtons title={ meal } randomRecipe={ randomId } />}
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {meal && <HeaderBack title={ type } />}
      {type === 'ingredientes' && <ExploreCards ingredients={ ingredients } />}
      {url === 'comidas/area' && <Dropdown />}
    </>
  );
}

export default Explore;
