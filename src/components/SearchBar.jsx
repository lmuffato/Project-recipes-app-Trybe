import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input } from 'semantic-ui-react';
import { fetchSearch } from '../services/Data';

// Testa se há apenas um resultado da pesquisa, retornando shouldRedirect e direcionando para a página específica da receita

const testData = (data) => {
  let shouldRedirect = false;
  if (data[Object.keys(data)].length === 1) shouldRedirect = true;
  return shouldRedirect;
};

function SearchBar() {
  const history = useHistory();
  const [radio, setRadio] = useState('');
  const [activeSearch, setActiveSearch] = useState(true);
  const [inputSearch, setInputSearch] = useState('');
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(window.location.pathname);
  }, [path]);

  const handleClick = (e, { value }) => {
    setRadio(value);
    setActiveSearch(false);
  };
  const handleSubmit = async () => {
    const data = await fetchSearch(radio, inputSearch, path);
    if (data === 'alert') {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setInputSearch('');
    setRadio('');
    setActiveSearch(true);
    const { drinks, meals } = data;

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
    if (testData(data)) history.push(`${path}/${id}`);
    // Se a função retornar que deve redirecionar, leva até a página do resultado
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
