import React, { useContext } from 'react';
import Context from '../context/Context';
import {
  fetchFilterFoodByIngredient,
  fetchFilterDrinkByIngredient,
  fetchFilterFoodByName,
  fetchFilterDrinkByName,
  fetchFilterFoodByLetter,
  fetchFilterDrinkByLetter } from '../services/fetchApi';

function HeaderSearchbar() {
  const {
    radio,
    setRadio,
    searchInput,
    setSearchInput,
    setPath,
    setShowFilter,
    path,
    setFilterDrinks,
    setFilterFoods,
  } = useContext(Context);

  const letter = 'Primeira letra';

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    const pathName = window.location.pathname.substring(1);
    setPath(pathName);
    if (radio === letter && e.target.value.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleClickFilter = () => {
    if (path === 'comidas' && radio === 'Ingrediente') {
      const getFoodByIngredient = async () => {
        setShowFilter(true);
        setFilterFoods([]);
        const data = await fetchFilterFoodByIngredient(searchInput);
        setFilterFoods(data);
      };
      getFoodByIngredient();
    } if (path === 'bebidas' && radio === 'Ingrediente') {
      setShowFilter(true);
      setFilterDrinks([]);
      const getDrinkByIngredient = async () => {
        const data = await fetchFilterDrinkByIngredient(searchInput);
        setFilterDrinks(data);
      };
      getDrinkByIngredient();
    } if (path === 'comidas' && radio === 'Nome') {
      const getFoodByName = async () => {
        setShowFilter(true);
        setFilterFoods([]);
        const data = await fetchFilterFoodByName(searchInput);
        setFilterFoods(data);
      };
      getFoodByName();
    } if (path === 'bebidas' && radio === 'Nome') {
      setShowFilter(true);
      setFilterDrinks([]);
      const getDrinkByName = async () => {
        const data = await fetchFilterDrinkByName(searchInput);
        setFilterDrinks(data);
      };
      getDrinkByName();
    } if (path === 'comidas' && radio === letter) {
      const getFoodByLetter = async () => {
        setShowFilter(true);
        setFilterFoods([]);
        const data = await fetchFilterFoodByLetter(searchInput);
        setFilterFoods(data);
      };
      getFoodByLetter();
    } if (path === 'bebidas' && radio === letter) {
      setShowFilter(true);
      setFilterDrinks([]);
      const getDrinkByLetter = async () => {
        const data = await fetchFilterDrinkByLetter(searchInput);
        setFilterDrinks(data);
      };
      getDrinkByLetter();
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ (e) => handleChange(e) }
        value={ searchInput }
        disabled={ (radio === '') }
      />
      <div>
        <label
          htmlFor="ingredient-search-radio"
        >
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="filter-radio"
            value="Ingrediente"
            onClick={ (e) => setRadio(e.target.value) }
          />
          Ingrediente
        </label>
        <label
          htmlFor="name-search-radio"
        >
          <input
            type="radio"
            data-testid="name-search-radio"
            name="filter-radio"
            value="Nome"
            onClick={ (e) => setRadio(e.target.value) }
          />
          Nome
        </label>
        <label
          htmlFor="first-letter-search-radio"
        >
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="filter-radio"
            value="Primeira letra"
            onClick={ (e) => setRadio(e.target.value) }
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClickFilter }
      >
        Buscar
      </button>
    </div>
  );
}

export default HeaderSearchbar;
