import React from 'react';
import Header from '../../components/Header';

export default function FoodPage() {
  document.title = 'comidas';
  return (
    <div>
      <Header searchBar="true" />
    </div>
  );
}
