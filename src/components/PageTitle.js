import { useContext, useEffect } from 'react';
import DrinksContext from '../contexts/drinks/DrinksContext';

function PageTitle() {
  const { pageTitle, setPageTitle } = useContext(DrinksContext);
  const path = window.location.pathname;
  const searchBtn = 'search-btn';
  function title() {
    if (path === '/explorar') {
      setPageTitle('Explore');
      document.getElementById(searchBtn).remove();
    } if (path === '/explorar/comidas') {
      setPageTitle('Explore Foods');
      document.getElementById(searchBtn).remove();
    } if (path === '/explorar/bebidas') {
      setPageTitle('Explore Drinks');
      document.getElementById(searchBtn).remove();
    } if (path === '/explorar/comidas/ingredientes'
      || path === '/explorar/bebidas/ingredientes') {
      setPageTitle('Explore Ingredients');
      document.getElementById(searchBtn).remove();
    } if (path === '/comidas') {
      setPageTitle('Foods');
    } if (path === '/bebidas') {
      setPageTitle('Drinks');
    } if (path === '/perfil') {
      setPageTitle('Profile');
      document.getElementById(searchBtn).remove();
    } if (path === '/explorar/comidas/area') {
      return setPageTitle('Explore Origin');
    } if (path === '/receitas-feitas') {
      setPageTitle('Done Recipes');
      document.getElementById(searchBtn).remove();
    } if (path === '/receitas-favoritas') {
      setPageTitle('Favorite Recipes');
      document.getElementById(searchBtn).remove();
    }
  }
  useEffect(() => {
    title();
  }, [path]);

  return (
    pageTitle
  );
}

export default PageTitle;
