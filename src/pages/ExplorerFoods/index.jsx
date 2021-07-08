import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Button from '../../components/shared/button';
import {
  propsButtonExploreByArea,
  propsButtonExploreByIngredient,
  propsButtonExploreSurprise,
} from './data';

function ExplorerFoods() {
  return (
    <>
      <Header pageTitle="Explorar Comidas" showButton={ false } />
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <Button { ...propsButtonExploreByIngredient } />
        </Link>
        <Button { ...propsButtonExploreByArea } />
        <Button { ...propsButtonExploreSurprise } />
      </div>
      <Footer />
    </>
  );
}

export default ExplorerFoods;
