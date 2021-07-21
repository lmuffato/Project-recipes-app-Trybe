import React, { useState } from 'react';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import RenderSelect from '../components/RenderSelect';
import RendersFiltersArea from '../components/RenderFiltersArea';
import '../styles/exploreOrigin.css';

function ExploreOriginLocal() {
  const [area, setArea] = useState('');
  return (
    <div className="explore-area">
      <Header title="Explorar Origem" />
      <main>
        <RenderSelect setArea={ setArea } />
        <RendersFiltersArea area={ area } />
        <BottomMenu />
      </main>
    </div>
  );
}

export default ExploreOriginLocal;
