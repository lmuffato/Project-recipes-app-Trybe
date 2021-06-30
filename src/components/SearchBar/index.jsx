import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [radioOption, setRadioOption] = useState('');
  // Esta linha deve ser adequada ao formato do estado geral, bom como iportar o contexto
  const { setKeyWord, setRadio } = useContext(recipes);

  const toRadios = [
    { label: 'Ingrediente', testeId: 'ingredient-search-radio' },
    { label: 'Nome', testeId: 'name-search-radio' },
    { label: 'Primeira letra', testeId: 'first-letter-search-radio' },
  ];

  const handleClick = () => {
    if (radioOption === 'Primeira letra') {
      if (searchTerm.length === 1) {
        setKeyWord(searchTerm);
        setRadio(radioOption);
      } else { alert('Sua busca deve conter somente 1 (um) caracter.'); }
    } else {
      setKeyWord(searchTerm);
      setRadio(radioOption);
    }
  };

  return (
    <div>
      <Form.Control
        type="text"
        placeHolder="Buscar Receita"
        data-testid="search-input"
        onChange={ setSearchTerm({ target: { value } }) }
      />
      {toRadios.map(({ label, testeId }) => (
        <Form.Check
          inline
          label={ label }
          name="queries"
          type="radio"
          data-testid={ testeId }
          key={ `radio-${label}` }
          onChange={ () => setRadioOption(label) }
        />
      ))}
      <Button
        variant="primary"
        data-testid="exec-search-btn"
        onClick={ () => handleClick() }
      >
        Buscar
      </Button>
    </div>
  );
}
