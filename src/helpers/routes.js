import React from 'react';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';
import Header from '../components/Header';
import FooterMenu from '../components/Footer';
import Foods from '../pages/MainFoods';
import Drinks from '../pages/MainDrinks';
import FoodDetails from '../pages/FoodDetails';
import DrinkDetails from '../pages/DrinkDetails';

const componentWithHeaderAndFooter = ({ title }) => (
  <section>
    <Header title={ title } />
    <FooterMenu />
  </section>
);

const componentWithHeader = ({ title }) => (
  <section>
    <Header title={ title } />
  </section>
);

export default [
  {
    path: '/',
    Component: Login,
    exact: true,
    title: 'Login',
  },
  {
    path: '/comidas',
    Component: Foods,
    exact: true,
    title: 'Comidas',
  },
  {
    path: '/bebidas',
    Component: Drinks,
    exact: true,
    title: 'Bebidas',
  },
  {
    path: '/comidas/:id',
    Component: FoodDetails,
    exact: true,
    title: 'Comidas',
  },
  {
    path: '/bebidas/:id',
    Component: DrinkDetails,
    exact: true,
    title: 'Bebidas',
  },
  {
    path: '/explorar',
    Component: Explore,
    exact: true,
    title: 'Explorar',
  },
  {
    path: '/explorar/comidas',
    Component: componentWithHeaderAndFooter,
    exact: true,
    title: 'Explorar Comidas',
  },
  {
    path: '/explorar/bebidas',
    Component: componentWithHeaderAndFooter,
    exact: true,
    title: 'Explorar Bebidas',
  },
  {
    path: '/explorar/comidas/ingredientes',
    Component: componentWithHeaderAndFooter,
    exact: false,
    title: 'Explorar Ingredientes',
  },
  {
    path: '/explorar/bebidas/ingredientes',
    Component: componentWithHeaderAndFooter,
    exact: false,
    title: 'Explorar Ingredientes',
  },
  {
    path: '/explorar/comidas/area',
    Component: componentWithHeaderAndFooter,
    exact: false,
    title: 'Explorar Origem',
  },
  {
    path: '/perfil',
    Component: Profile,
    exact: true,
    title: 'Perfil',
  },
  {
    path: '/receitas-feitas',
    Component: componentWithHeader,
    exact: true,
    title: 'Receitas Feitas',
  },
  {
    path: '/receitas-favoritas',
    Component: componentWithHeader,
    exact: true,
    title: 'Receitas Favoritas',
  },
];
