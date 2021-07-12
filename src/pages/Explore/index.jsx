import React from 'react';
import { useParams } from 'react-router-dom';
import HeaderBack from '../../components/HeaderBack';
import ExploreButtons from './components/ExploreButtons';
import styles from './styles.module.scss';

function Explore() {
  const { meal } = useParams();

  return (
    <div className={ styles.explorePage }>
      {meal && <HeaderBack title={ `Explorar ${meal}` } />}
      <div className={ styles.exploreContent }>
        <ExploreButtons title={ meal } />
      </div>
    </div>
  );
}

export default Explore;
