import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchbarContext from './SearchbarContext';

function SearchbarProvider({ children }) {
  const [searchBtn, setSearchBtn] = useState(false);
  const [hideSearchBtn, setHideSearchBtn] = useState(false);
  const [pageName, setPageName] = useState('Comidas');
  const [searchCategory, setSearchCategory] = useState('list');
  const [categories, setCategories] = useState();

  // Criar um estado para controlar a busca, se clicar nos botões de filtro, cancela a barra de pesquisa, se clicar no botão de pesquisar, cancela os botões de filtro.

  const contextValue = {
    searchBtn,
    setSearchBtn,
    hideSearchBtn,
    setHideSearchBtn,
    pageName,
    setPageName,
    searchCategory,
    setSearchCategory,
    categories,
    setCategories,
  };

  return (
    <SearchbarContext.Provider value={ contextValue }>
      {children}
    </SearchbarContext.Provider>
  );
}

SearchbarProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default SearchbarProvider;
