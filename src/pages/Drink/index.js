import React, { useEffect, useContext } from 'react';
import Header from '../../components/header/index';
import { AppContext } from '../../context/AppContext';

export default function Drink() {
  const { context } = useContext(AppContext);
  const { setPageOrigin } = context;

  useEffect(() => {
    setPageOrigin('thecocktaildb');
  });
  return (
    <div>
      <Header title="Bebidas" isSearch />
    </div>
  );
}
