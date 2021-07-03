import React from 'react';
import BottomMenu from '../../components/bottomMenu';
import Header from '../../components/Header';

export default function explorePage() {
  return (
    <div>
      <Header title="Explorar" show={ false } />
      <BottomMenu />
    </div>
  );
}
