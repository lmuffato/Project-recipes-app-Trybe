import React, { useContext, useEffect } from 'react';
import Header from '../compenents/Header';
import SearchbarContext from '../contexts/SearchbarContext';

function ReceitasFavoritas() {
  const { setHideSearchBtn } = useContext(SearchbarContext);

  useEffect(() => {
    setHideSearchBtn(false);
  }, []);

  return (
    <>
      <Header />
      <p>Receitas Favoritas</p>
    </>
  );
}

export default ReceitasFavoritas;
