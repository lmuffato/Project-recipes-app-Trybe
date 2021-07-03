import React from 'react';
import Login from '../pages/Login';
import MainFoods from '../pages/MainFoods';
import MainDrinks from '../pages/MainDrinks';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';
import Header from '../components/Header';

const componentWithHeader = ({ title }) => (
  <section>
    <Header title={ title } />
  </section>
);

const componentWithoutHeader = () => (
  <section>
    Component
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
    Component: MainFoods,
    exact: true,
    title: 'Comidas',
  },
  {
    path: '/bebidas',
    Component: MainDrinks,
    exact: true,
    title: 'Bebidas',
  },
  {
    path: '/comidas/0',
    Component: componentWithoutHeader,
    exact: false,
    title: 'Comidas',
  },
  {
    path: '/explorar',
    Component: Explore,
    exact: true,
    title: 'Explorar',
  },
  {
    path: '/explorar/comidas',
    Component: componentWithHeader,
    exact: true,
    title: 'Explorar Comidas',
  },
  {
    path: '/explorar/bebidas',
    Component: componentWithHeader,
    exact: true,
    title: 'Explorar Bebidas',
  },
  {
    path: '/explorar/comidas/ingredientes',
    Component: componentWithHeader,
    exact: false,
    title: 'Explorar Ingredientes',
  },
  {
    path: '/explorar/bebidas/ingredientes',
    Component: componentWithHeader,
    exact: false,
    title: 'Explorar Ingredientes',
  },
  {
    path: '/explorar/comidas/area',
    Component: componentWithHeader,
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
