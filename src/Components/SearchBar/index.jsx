import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import fetchMealsAndDrinks from '../../services';

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

  const handleLength = async (array) => {
    const objIdKey = (page === 'meals') ? 'idMeal' : 'idDrink';
    console.log(array);
    if (array === null) {
      // eslint-disable-next-line no-alert
      return alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    if (array.length === 1) return history.push(`${pathname}/${array[0][objIdKey]}`);
  };

  const handleClick = async () => {
    if (radioOption === 'Primeira letra') {
      if (searchTerm.length === 1) {
        const array = await fetchMealsAndDrinks(searchTerm, radioOption, page);
        setRecipes({
          ...recipes,
          [page]: { results: array },
        });
        handleLength(array);
      // eslint-disable-next-line no-alert
      } else { return alert('Sua busca deve conter somente 1 (um) caracter'); }
    } else {
      const array = await fetchMealsAndDrinks(searchTerm, radioOption, page);
      setRecipes({
        ...recipes,
        [page]: { results: array },
      });
      handleLength(array);
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
