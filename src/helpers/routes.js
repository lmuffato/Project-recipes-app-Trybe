import React from 'react';
import Header from '../components/Header';
import Comidas from '../pages/Comidas';

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
    component: componentWithoutHeader,
    exact: true,
  },
  {
    path: '/comidas',
    component: Comidas,
    exact: true,
  },
  {
    path: '/bebidas',
    component: componentWithHeader,
    exact: true,
  },
  {
    path: '/comidas/0',
    component: componentWithoutHeader,
    exact: false,
  },
  {
    path: '/explorar',
    component: componentWithHeader,
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
    component: componentWithHeader,
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
