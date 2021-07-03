import React from 'react';
import Login from '../pages/Login';
import MainFoods from '../pages/MainFoods';
import MainDrinks from '../pages/MainDrinks';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';
import Header from '../components/Header';
import NotFound from '../pages/NotFound';
import ExploreFoodsByOrigin from '../pages/ExploreFoodsByOrigin';
import ExploreDrinksByIngredient from '../pages/ExploreDrinksByIngredient';
import ExploreFoodsByIngredient from '../pages/ExploreFoodsByIngredient';

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
    component: MainFoods,
    exact: true,
  },
  {
    path: '/explorar/bebidas',
    component: MainDrinks,
    exact: true,
  },
  {
    path: '/explorar/comidas/ingredientes',
    component: ExploreFoodsByIngredient,
    exact: true,
  },
  {
    path: '/explorar/bebidas/ingredientes',
    component: ExploreDrinksByIngredient,
    exact: true,
  },
  {
    path: '/explorar/comidas/area',
    component: ExploreFoodsByOrigin,
    exact: true,
  },
  {
    path: '/explorar/bebidas/area',
    component: NotFound,
    exact: true,
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
