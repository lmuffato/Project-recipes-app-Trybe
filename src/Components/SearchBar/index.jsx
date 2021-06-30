import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import RecipesContext from '../../context/RecipesContext';

export default function SearchBar({ page }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [radioOption, setRadioOption] = useState('');
  const { setRecipes, recipes } = useContext(RecipesContext);

  const toRadios = [
    { label: 'Ingrediente', testeId: 'ingredient-search-radio' },
    { label: 'Nome', testeId: 'name-search-radio' },
    { label: 'Primeira letra', testeId: 'first-letter-search-radio' },
  ];

  const handleClick = () => {
    if (radioOption === 'Primeira letra') {
      if (searchTerm.length === 1) {
        setRecipes({
          ...recipes,
          [page]: {
            ...recipes[page],
            params: { query: searchTerm, type: radioOption },
          },
        });
      } else { return alert('Sua busca deve conter somente 1 (um) caracter.'); }
    } else {
      setRecipes({
        ...recipes,
        [page]: {
          ...recipes[page], params: { query: searchTerm, type: radioOption },
        },
      });
    }
  };

  const handleChange = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Buscar Receita"
        data-testid="search-input"
        onChange={ handleChange }
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

SearchBar.propTypes = {
  page: PropTypes.string.isRequired,
};
