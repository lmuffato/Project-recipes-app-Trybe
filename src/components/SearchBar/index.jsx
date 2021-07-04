import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../../context/RecipesContext';
import FoodCard from '../FoodCard';
import './style.css';

export default function SearchBar({ place, searchActive }) {
  const objectTranslation = {
    meal: 'comidas',
    cocktail: 'bebidas',
  };
  const objectId = {
    cocktail: 'idDrink',
    meal: 'idMeal',
  };
  const { handleApi, results, handleNull } = useContext(RecipesContext);
  const [searchState, setState] = useState({
    textInput: '',
    radioInput: '',
  });

  const handleState = ({ target: { value, name } }) => {
    setState((pastState) => ({
      ...pastState,
      [name]: value,
    }));
  };

  const handleButton = () => {
    const { alert } = window;
    if (searchState.radioInput === 'letter' && searchState.textInput.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      handleApi({
        ...searchState,
        place,
      });
    }
  };

  const conditional = () => {
    const maxNumber = 12;
    if (results === null) {
      const alertStr = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
      handleNull();
      const { alert } = window;
      alert(alertStr);
      return null;
    } if (results.length === 1) {
      return (
        <Redirect to={ `/${objectTranslation[place]}/${results[0][objectId[place]]}` } />
      );
    }
    const firstTwelve = results.slice(1, maxNumber);
    return firstTwelve.map((food, index) => (<FoodCard
      key={ index }
      food={ food }
      index={ index }
      place={ place }
    />));
  };

  return (
    <div
      data-testid="search-bar"
      className={ searchActive ? 'search-bar-container' : 'none' }
    >
      <div>
        <input
          onChange={ handleState }
          type="text"
          name="textInput"
          value={ searchState.textInput }
          data-testid="search-input"
        />
        <div>
          <label htmlFor="ingredient-search-radio">
            <input
              onChange={ handleState }
              name="radioInput"
              data-testid="ingredient-search-radio"
              type="radio"
              value="ingredient"
              checked={ searchState.radioInput === 'ingredient' }
            />
            Ingrediente
          </label>
          <label htmlFor="name-search-radio">
            <input
              onChange={ handleState }
              name="radioInput"
              data-testid="name-search-radio"
              type="radio"
              value="name"
              checked={ searchState.radioInput === 'name' }
            />
            Nome
          </label>
          <label htmlFor="first-letter-search-radio">
            <input
              onChange={ handleState }
              name="radioInput"
              data-testid="first-letter-search-radio"
              type="radio"
              value="letter"
              checked={ searchState.radioInput === 'letter' }
            />
            Primeira letra
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleButton }
        >
          Buscar
        </button>
      </div>
      <div className="foodCard-container">
        {conditional()}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  place: PropTypes.string.isRequired,
  searchActive: PropTypes.bool.isRequired,
};
