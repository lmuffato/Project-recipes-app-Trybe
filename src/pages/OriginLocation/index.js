import React from 'react';
import FooterMenu from '../../components/footerMenu';
import Header from '../../components/Header';

export default function OriginLocation() {
  document.title = 'Explorar Origem';
  return (
    <div>
      <Header searchBar="true" />
      <FooterMenu />
    </div>
  );
}
