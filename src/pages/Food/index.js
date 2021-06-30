import React, { useEffect, useContext } from 'react';
import Header from '../../components/header/index';
import { AppContext } from '../../context/AppContext';

export default function Food() {
  const { context } = useContext(AppContext);
  const { setPageOrigin } = context;

  useEffect(() => {
    setPageOrigin('themealdb');
  });

  return (
    <div>
      <Header title="Comidas" isSearch />
    </div>
  );
}
