import React from 'react';

import Header from '../../components/Header';
import FooterMenu from '../../components/footerMenu';

export default function FoodPage() {
  document.title = 'comidas';
  return (
    <div>
      <Header searchBar="true" />
      <FooterMenu />
    </div>
  );
}
