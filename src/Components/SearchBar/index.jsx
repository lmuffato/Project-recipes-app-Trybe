import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import fetchMealsAndDrinks from '../../services';
import './styles.css';

export default function SearchBar({ page }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [radioOption, setRadioOption] = useState('');
  const { setRecipes, recipes } = useContext(RecipesContext);

  const toRadios = [
    { label: 'Ingrediente', testeId: 'ingredient-search-radio' },
    { label: 'Nome', testeId: 'name-search-radio' },
    { label: 'Primeira letra', testeId: 'first-letter-search-radio' },
  ];

  const { pathname } = useLocation();
  const history = useHistory();

  const handleLength = async () => {
    let array = await fetchMealsAndDrinks(searchTerm, radioOption, page);
    const MAX_ARRAY_SIZE = 12;
    const objIdKey = (page === 'meals') ? 'idMeal' : 'idDrink';
    if (array.length === 0) {
      // eslint-disable-next-line no-alert
      alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    if (array.length === 1) { history.push(`${pathname}/${array[0][objIdKey]}`); }
    if (array.length > MAX_ARRAY_SIZE) {
      array = array.reduce((acc, curr, index) => (
        index < MAX_ARRAY_SIZE ? [...acc, curr] : acc
      ), []);
    }
    return array;
  };

  const handleClick = async () => {
    if (radioOption === 'Primeira letra') {
      if (searchTerm.length === 1) {
        const response = await handleLength();
        setRecipes({
          ...recipes,
          [page]: { results: response },
        });
        // eslint-disable-next-line no-alert
      } else { return alert('Sua busca deve conter somente 1 (um) caracter'); }
    } else {
      const response = await handleLength();
      setRecipes({
        ...recipes,
        [page]: { results: response },
      });
    }
  };

  const handleChange = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  return (
    <div className="searchbar-parent">
      <Form.Control
        type="text"
        placeholder="Buscar Receita"
        data-testid="search-input"
        onChange={ handleChange }
      />
      <div>
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
      </div>
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
