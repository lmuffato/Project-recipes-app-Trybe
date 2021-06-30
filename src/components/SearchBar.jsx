import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';

function SearchBar() {
  const [radio, setRadio] = useState('');
  const [activeSearch, setActiveSearch] = useState(true);
  const [inputSearch, setInputSearch] = useState('');
  const [searchValues, setSearchValues] = useState([]);
  const handleClick = (e, { value }) => {
    setRadio(value);
    setActiveSearch(false);
  };
  const handleSubmit = () => {
    setSearchValues([radio, inputSearch]);
  };
  return (
    <form>
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
    </form>
  );
}

export default SearchBar;
