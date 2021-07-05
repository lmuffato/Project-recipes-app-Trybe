import React from 'react';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';

export default function Profile() {
  return (
    <div>
      <Header title="Perfil" show={ false } />
      <BottomMenu />
    </div>
  );
}
