import React, { useCallback, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import HeaderBack from '../../components/HeaderBack';
import getRecipes from '../../services/recipesData';
import ExploreButtons from './components/ExploreButtons';
import styles from './styles.module.scss';
import Footer from '../../components/footer';

function Explore() {
  const [titlePage, setTitlePage] = useState('');
  const [randomId, setRandomId] = useState('');

  const { meal } = useParams();

  const loadExploreData = useCallback(async () => {
    const response = await getRecipes(`/explorar/${meal}`);
    if (response) {
      setTitlePage(response.titlePage);
      setRandomId(response.random[0].id);
    }
  }, [meal]);

  useEffect(() => {
    loadExploreData();
  }, [loadExploreData]);

  return (
    <div className={ styles.explorePage }>
      {meal && <HeaderBack title={ titlePage } />}
      <div className={ styles.exploreContent }>
        <ExploreButtons title={ meal } randomRecipe={ randomId } />
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
