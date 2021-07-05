/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';

class SearchButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: '',
      clickRButton: '',
      api: [],
      btn: false,
      foodOrDrink: '',
      foodOrDrinkApiName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.apisFood = this.apiFood.bind(this);
    this.renderInputSearch = this.renderInputSearch.bind(this);
    this.requestApi = this.requestApi.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.apiDrink = this.apiDrink.bind(this);
    this.renderRadioButtons = this.renderRadioButtons.bind(this);
    this.handlePathName = this.handlePathName.bind(this);
    this.renderFood = this.renderFood.bind(this);
    this.renderDrink = this.renderDrink.bind(this);
    this.verifyRenderApi = this.verifyRenderApi.bind(this);
  }

  componentDidMount() {
    this.handlePathName();
  }

  handlePathName() {
    const { pathname } = this.props;
    this.setState(() => ({
      foodOrDrink: pathname,
    }), () => {
      const { foodOrDrink } = this.state;
      if (foodOrDrink === '/comidas') {
        this.setState({
          foodOrDrinkApiName: 'meals',
        });
      } else if (foodOrDrink === '/bebidas') {
        this.setState({
          foodOrDrinkApiName: 'drinks',
        });
      }
    });
  }

  handleChange({ target: { value } }) {
    this.setState({
      valueInput: value,
    });
  }

  handleClick() {
    const { clickRButton, valueInput, foodOrDrink } = this.state;
    if (valueInput.length > 1 && clickRButton === 'firstLetter') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (foodOrDrink === '/comidas') {
      return this.requestApi(this.apiFood(valueInput)[clickRButton]);
    } else if (foodOrDrink === '/bebidas') {
      return this.requestApi(this.apiDrink(valueInput)[clickRButton]);
    }
  }

  apiFood(valueInput) {
    const meals = {
      name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${valueInput}`,
      ingrendient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueInput}`,
      firstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${valueInput}`,
    };
    return meals;
  }

  apiDrink(valueInput) {
    const drinks = {
      name: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valueInput}`,
      ingrendient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${valueInput}`,
      firstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${valueInput}`,
    };
    return drinks;
  }

  async requestApi(endpoint) {
    const { foodOrDrinkApiName } = this.state;
    const api = await fetch(endpoint);
    const tratamentoJson = await api.json();
    if (tratamentoJson === null) {
      this.setState({
        api: [],
      });
    } else {
      this.setState({
        api: tratamentoJson[foodOrDrinkApiName],
      });
    }
  }

  verifyRenderApi() {
    const { foodOrDrink } = this.state;
    if (foodOrDrink === '/comidas') {
      return this.renderFood();
    } if (foodOrDrink === '/bebidas') {
      return this.renderDrink();
    }
  }

  renderFood() {
    const { history } = this.props;
    const { api } = this.state;
    console.log(api);
    return (
      api.map((paran) => (
        <div key={ paran.idMeal }>
          <h1>{paran.strMeal}</h1>
          <input
            type="image"
            src={ paran.strMealThumb }
            alt="food"
            onClick={ () => history.push(`/comidas/${paran.idMeal}`) }
          />
        </div>
      ))
    );
  }

  renderDrink() {
    const { history } = this.props;
    const { api } = this.state;
    return (
      api.map((paran) => (
        <div key={ paran.idDrink }>
          <h1>{paran.strDrink}</h1>
          <input
            type="image"
            src={ paran.strDrinkThumb }
            alt="drink"
            onClick={ () => history.push(`/comidas/${paran.idMeal}`) }
          />
        </div>
      ))
    );
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

  renderRadioButtons() {
    const { btn } = this.state;
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
        {this.verifyRenderApi()}
      </>
    );
  }

  render() {
    return (
      <>
        {this.renderRadioButtons()}
      </>
    );
  }
}

SearchButton.propTypes = {
  pathname: PropTypes.string,
  history: PropTypes.shape(),
}.isRequired;

export default SearchButton;
