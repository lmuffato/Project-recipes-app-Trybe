/* eslint-disable no-alert */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input } from 'semantic-ui-react';
import context from '../store/Context';
import { fetchSearch } from '../services/Data';

// Testa se há apenas um resultado da pesquisa, retornando shouldRedirect e direcionando para a página específica da receita

const testData = (data) => {
  let shouldRedirect = false;
  let message = '';
  try {
    if (data[Object.keys(data)].length === 1) shouldRedirect = true;
  } catch (error) {
    message = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  }
  return { shouldRedirect, message };
};

function SearchBar() {
  const { setDrinks, setFoods } = useContext(context);
  const history = useHistory();
  const [radio, setRadio] = useState('');
  const [activeSearch, setActiveSearch] = useState(true);
  const [inputSearch, setInputSearch] = useState('');
  const [path, setPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPath(window.location.pathname);
  }, [path]);

  const handleClick = (e, { value }) => {
    setRadio(value);
    setActiveSearch(false);
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    const data = await fetchSearch(radio, inputSearch, path);
    if (data === 'alert') {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setInputSearch('');
    setRadio('');
    setActiveSearch(true);
    const { drinks, meals } = data;
    try {
      if (drinks.length > 1) setDrinks(drinks);
    } catch (error) {
      console.log();
    }
    try {
      if (meals.length > 1) setFoods(meals);
    } catch (error) {
      console.log();
    }

    // Tenta pegar o id de drink. Se não conseguir, pega de foods

    let id = '';
    try {
      const { idDrink } = drinks[0];
      id = idDrink;
    } catch (e) {
      console.log();
    }
    try {
      const { idMeal } = meals[0];
      id = idMeal;
    } catch (e) {
      console.log();
    }
    if (testData(data).shouldRedirect) history.push(`${path}/${id}`); // Se a função retornar que deve redirecionar, leva até a página do resultado
    if (!testData(data).shouldRedirect
    && testData(data).message !== ''
    && data !== 'alert') alert(testData(data).message);
    setIsLoading(false);
    console.log(data);
  };
  return (
    <>
      <Button.Group widths="3">
        <Button
          type="button"
          data-testid="ingredient-search-radio"
          value="i"
          onClick={ handleClick }
          toggle
          active={ radio === 'i' }
          compact
        >
          Ingrediente
        </Button>
        <Button
          compact
          data-testid="name-search-radio"
          type="button"
          value="s"
          onClick={ handleClick }
          toggle
          active={ radio === 's' }
        >
          Nome
        </Button>
        <Button
          compact
          type="button"
          data-testid="first-letter-search-radio"
          value="f"
          onClick={ handleClick }
          toggle
          active={ radio === 'f' }
        >
          Primeira letra
        </Button>
      </Button.Group>
      <Input
        placeholder="Buscar receita"
        fluid
        disabled={ activeSearch }
      >
        <input
          data-testid="search-input"
          value={ inputSearch }
          onChange={ (event) => setInputSearch(event.target.value) }
        />
        <Button
          loading={ isLoading }
          icon="search"
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSubmit }
          disabled={ activeSearch }
        />
      </Input>
    </>
  );
}

export default SearchBar;
