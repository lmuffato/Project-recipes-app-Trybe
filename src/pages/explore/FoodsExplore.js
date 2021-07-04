import React from 'react';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';

export default function FoodsExplore() {
  return (
    <div>
      <Header title="Explorar Comidas" show={ false } />
      <BottomMenu />
    </div>
  );
}
