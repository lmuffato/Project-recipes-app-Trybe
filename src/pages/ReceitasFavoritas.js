import React, { useContext, useEffect } from 'react';
import Header from '../compenents/Header';
import SearchbarContext from '../contexts/SearchbarContext';

function ReceitasFavoritas() {
  const { setHideSearchBtn, setPageName } = useContext(SearchbarContext);

  useEffect(() => {
    setHideSearchBtn(false);
    setPageName('Receitas Favoritas');
  }, []);

  return (
    <>
      <Header />
      <p>Receitas Favoritas</p>
    </>
  );
}

export default ReceitasFavoritas;
