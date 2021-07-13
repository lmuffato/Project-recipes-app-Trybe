import React from 'react';
import { string, bool } from 'prop-types';
import { CgProfile } from 'react-icons/cg';
import { BiSearchAlt2 } from 'react-icons/bi';
import useSearch from '../../hooks/useSearch';
import {
  ContainerShowSearch,
  ContainerMainInfos,
  Button,
  ButtonProfile,
  ButtonSearch,
  Input,
} from './styles';

export default function Header({ title, searchIcon = false }) {
  const {
    setSearchResult,
    setSelectedSearch,
    showSearch,
    setShowSearch,
    foodsRecipe,
    getSearch,
    history,
    redirectToMealOrDrink,
  } = useSearch();

  if (!foodsRecipe) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  if (foodsRecipe) redirectToMealOrDrink();

  return (
    <header>
      <ButtonProfile
        searchIcon={ searchIcon }
        type="button"
        onClick={ () => history.push('/perfil') }
      >
        <CgProfile data-testid="profile-top-btn" />
      </ButtonProfile>

      <ContainerMainInfos>
        <h1 data-testid="page-title">{title}</h1>
      </ContainerMainInfos>

      {searchIcon && (
        <ButtonSearch
          searchIcon={ searchIcon }
          type="button"
          onClick={ () => setShowSearch(!showSearch) }
        >
          <BiSearchAlt2 />
        </ButtonSearch>
      )}

      <div>
        {showSearch && (
          <ContainerShowSearch>
            <div>
              <Input
                data-testid="search-input"
                placeholder="Buscar Receita"
                onChange={ ({ target }) => setSearchResult(target.value) }
              />

              <Button
                data-testid="exec-search-btn"
                type="button"
                onClick={ getSearch }
              >
                Buscar
              </Button>
            </div>

            <div>
              <label htmlFor="ingredient-search-radio">
                Ingrediente
                <input
                  data-testid="ingredient-search-radio"
                  type="radio"
                  name="search-radio"
                  id="ingredient-search-radio"
                  value="ingredient"
                  onChange={ ({ target }) => setSelectedSearch(target.value) }
                />
              </label>

              <label htmlFor="name-search-radio">
                Nome
                <input
                  data-testid="name-search-radio"
                  type="radio"
                  name="search-radio"
                  id="name-search-radio"
                  value="name"
                  onChange={ ({ target }) => setSelectedSearch(target.value) }
                />
              </label>

              <label htmlFor="first-letter-search-radio">
                Primeira letra
                <input
                  data-testid="first-letter-search-radio"
                  type="radio"
                  name="search-radio"
                  id="first-letter-search-radio"
                  value="firstLetter"
                  onChange={ ({ target }) => setSelectedSearch(target.value) }
                />
              </label>
            </div>
          </ContainerShowSearch>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: string,
  searchIcon: bool,
}.isRequired;
