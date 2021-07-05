import React from 'react';
import Header from '../components/Header';
import InferiorMenu from '../components/InferiorMenu';

export default function Profile() {
  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Perfil</h1>
      </Header>
      <InferiorMenu />
    </div>
  );
}
