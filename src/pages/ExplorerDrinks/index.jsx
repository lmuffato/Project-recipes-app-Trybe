import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Button from '../../components/shared/button';
import { propsButtonExploreByIngredient, propsButtonExploreSurprise } from './data';

function ExplorerDrinks() {
  return (
    <>
      <Header pageTitle="Explorar Bebidas" showButton={ false } />
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <Button { ...propsButtonExploreByIngredient } />
        </Link>
        <Button { ...propsButtonExploreSurprise } />
      </div>
      <Footer />
    </>
  );
}

export default ExplorerDrinks;
