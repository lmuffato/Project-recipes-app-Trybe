import React from 'react';
import PropTypes from 'prop-types';
import { useClassState, useStateEasyRedux } from 'easy-redux-trybe';
import { Redirect } from 'react-router-dom';
import styles from '../styles/Search.module.scss';

const initialState = {
  search: '',
  searchRadio: 'Ingrediente',
  redirect: false,
};

export default function Search(props) {
  const [state, setState] = useClassState(initialState);
  const [, setStateRedux] = useStateEasyRedux(Search, {});
  const { search, searchRadio } = state;
  const { path, searchApi } = props;

  const link = (result) => {
    const verifyPath = String(path).includes('comidas');
    return `${verifyPath ? `/comidas/${result.idMeal}` : `/bebidas/${result.idDrink}`}`;
  };

  const handleChange = ({ target: { name, value } }) => {
    setState({
      [name]: value,
    });
  };

  const fetchSearch = async (ev) => {
    if (ev) ev.preventDefault();
    let url;

    switch (searchRadio) {
    case 'Ingrediente':
      url = `https://www.${searchApi}.com/api/json/v1/1/filter.php?i=`;
      break;
    case 'Nome':
      url = `https://www.${searchApi}.com/api/json/v1/1/search.php?s=`;
      break;
    case 'Primeira letra':
      if (search.length !== 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
        return;
      }
      url = `https://www.${searchApi}.com/api/json/v1/1/search.php?f=`;
      break;
    default:
      break;
    }

    try {
      const response = await fetch(`${url}${search}`);
      const data = await response.json();
      const results = data.meals || data.drinks;

      const INDEX_END = 12;
      const resultsTwelveItems = results.slice(0, INDEX_END);

      if (resultsTwelveItems && resultsTwelveItems.length === 1) {
        setState({ redirect: true, link: link(resultsTwelveItems[0]) });
      }

      setStateRedux({ actionType: 'FETCH_COMPLETED', resultsTwelveItems });
    } catch (error) {
      console.error(error);
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  return (
    <div className={ styles.searchContainer }>
      { state.redirect && <Redirect to={ state.link } /> }
      <section>
        <input
          id="search-input"
          type="text"
          name="search"
          value={ search }
          onChange={ handleChange }
          data-testid="search-input"
          className={ styles.searchInput }
          placeholder="Search"
        />
        <div className={ styles.radios }>
          <label htmlFor="ingredient-search-radio">
            Ingrediente:
            <input
              id="ingredient-search-radio"
              type="radio"
              name="searchRadio"
              value="Ingrediente"
              onChange={ handleChange }
              data-testid="ingredient-search-radio"
              defaultChecked
            />
          </label>
          <label htmlFor="name-search-radio">
            Nome:
            <input
              id="name-search-radio"
              type="radio"
              name="searchRadio"
              value="Nome"
              onChange={ handleChange }
              data-testid="name-search-radio"
            />
          </label>
          <label htmlFor="first-letter-search-radio">
            Primeira letra:
            <input
              id="first-letter-search-radio"
              type="radio"
              name="searchRadio"
              value="Primeira letra"
              onChange={ handleChange }
              data-testid="first-letter-search-radio"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={ fetchSearch }
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </section>
    </div>
  );
}

Search.propTypes = {
  searchApi: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
