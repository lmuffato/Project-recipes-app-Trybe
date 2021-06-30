import React from 'react';
import Login from '../pages/Login';
import MainFoods from '../pages/MainFoods';
import MainDrinks from '../pages/MainDrinks';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';
import Header from '../components/Header';

const componentWithHeader = () => (
  <section>
    <Header />
  </section>
);

const componentWithoutHeader = () => (
  <section>
    COMPONENT
  </section>
);

export default [
  {
    path: '/',
    component: Login,
    exact: true,
  },
  {
    path: '/comidas',
    component: MainFoods,
    exact: true,
  },
  {
    path: '/bebidas',
    component: MainDrinks,
    exact: true,
  },
  {
    path: '/comidas/0',
    component: componentWithoutHeader,
    exact: false,
  },
  {
    path: '/explorar',
    component: Explore,
    exact: true,
  },
  {
    path: '/explorar/comidas',
    component: componentWithHeader,
    exact: false,
  },
  {
    path: '/explorar/bebidas',
    component: componentWithHeader,
    exact: false,
  },
  {
    path: '/explorar/comidas/ingredientes',
    component: componentWithHeader,
    exact: false,
  },
  {
    path: '/explorar/bebidas/ingredientes',
    component: componentWithHeader,
    exact: false,
  },
  {
    path: '/explorar/comidas/area',
    component: componentWithHeader,
    exact: false,
  },
  {
    path: '/perfil',
    component: Profile,
    exact: false,
  },
  {
    path: '/receitas-feitas',
    component: componentWithHeader,
    exact: false,
  },
  {
    path: '/receitas-favoritas',
    component: componentWithHeader,
    exact: false,
  },
];
