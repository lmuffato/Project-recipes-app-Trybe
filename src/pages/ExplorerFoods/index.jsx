import React from 'react';
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
        <Button { ...propsButtonExploreByIngredient } />
        <Button { ...propsButtonExploreByArea } />
        <Button { ...propsButtonExploreSurprise } />
      </div>
      <Footer />
    </>
  );
}

export default ExplorerFoods;
