import React from 'react';
import Login from '../pages/Login';
import MainFoods from '../pages/MainFoods';
import MainDrinks from '../pages/MainDrinks';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';
import Header from '../components/Header';
import NotFound from '../pages/NotFound';

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
    exact: true,
  },
  {
    path: '/explorar/bebidas',
    component: componentWithHeader,
    exact: true,
  },
  {
    path: '/explorar/comidas/ingredientes',
    component: componentWithHeader,
    exact: true,
  },
  {
    path: '/explorar/bebidas/ingredientes',
    component: componentWithHeader,
    exact: true,
  },
  {
    path: '/explorar/comidas/area',
    component: componentWithHeader,
    exact: true,
  },
  {
    path: '/explorar/bebidas/area',
    component: NotFound,
    exact: true,
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
