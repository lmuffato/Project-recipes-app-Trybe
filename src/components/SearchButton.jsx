import React from 'react';
import searchIcon from '../images/searchIcon.svg';

class SearchButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueInput: '',
      clickRButton: '',
      api: [],
      btn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.apisFood = this.apisFood.bind(this);
    this.renderInputSearch = this.renderInputSearch.bind(this);
    this.requestApi = this.requestApi.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({
      valueInput: value,
    });
  }

  handleClick() {
    const { clickRButton, valueInput } = this.state;
    if (valueInput.length > 1 && clickRButton === 'firstLetter') {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      this.requestApi(this.apisFood(valueInput)[clickRButton]);
    }
  }

  apisFood(valueInput) {
    const url = {
      name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${valueInput}`,
      ingrendient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueInput}`,
      firstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${valueInput}`,
    };
    return url;
  }

  async requestApi(endpoint) {
    const api = await fetch(endpoint);
    const tratamentoJson = await api.json();
    if (tratamentoJson.meals === null) {
      this.setState({
        api: [],
      });
    } else {
      this.setState({
        api: tratamentoJson.meals,
      });
    }
  }

  renderInputSearch() {
    const { valueInput } = this.state;
    return (
      <input
        type="text"
        data-testid="search-input"
        nome="valueInput"
        value={ valueInput }
        onChange={ this.handleChange }
      />
    );
  }

  render() {
    const { api, btn } = this.state;
    return (
      <>
        <button
          data-testid="search-top-btn"
          type="button"
          onClick={ () => {
            if (!btn) {
              this.setState({
                btn: true,
              });
            } else {
              this.setState({
                btn: false,
              });
            }
          } }
        >
          <img src={ searchIcon } alt="search" />
        </button>
        {btn ? this.renderInputSearch() : null}
        <label htmlFor="optionsIngrediente">
          <input
            type="radio"
            value="Ingrediente"
            name="options"
            id="optionsIngrediente"
            data-testid="ingredient-search-radio"
            onClick={ () => this.setState({
              clickRButton: 'ingrendient',
            }) }
          />
          Ingrediente
        </label>
        <label htmlFor="optionsNome">
          <input
            type="radio"
            value="Nome"
            name="options"
            id="optionsNome"
            data-testid="name-search-radio"
            onClick={ () => this.setState({
              clickRButton: 'name',
            }) }
          />
          Nome
        </label>
        <label htmlFor="optionsPrimeiraLetra">
          <input
            type="radio"
            value="PrimeiraLetra"
            name="options"
            id="optionsPrimeiraLetra"
            data-testid="first-letter-search-radio"
            onClick={ () => this.setState({
              clickRButton: 'firstLetter',
            }) }
          />
          Primeira letra
        </label>
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
        {api.map((paran) => (
          <div key={ paran.idMeal }>
            <h1>{paran.strMeal}</h1>
            <img src={ paran.strMealThumb } alt="food" />
          </div>
        ))}
      </>
    );
  }
}

export default SearchButton;
