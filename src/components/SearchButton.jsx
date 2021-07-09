/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';

import {
  apiFood,
  apiDrink,
  requestApi,
} from '../services/requestApi';

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
      // idProduct: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderInputSearch = this.renderInputSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePathName = this.handlePathName.bind(this);
    this.renderFood = this.renderFood.bind(this);
    this.renderDrink = this.renderDrink.bind(this);
    this.verifyRenderApi = this.verifyRenderApi.bind(this);
    this.saveIdProduct = this.saveIdProduct.bind(this);
  }

  componentDidMount() {
    this.handlePathName();
    this.saveIdProduct();
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

  async handleClick() {
    const { clickRButton, valueInput, foodOrDrink, foodOrDrinkApiName } = this.state;
    let result;
    if (valueInput.length > 1 && clickRButton === 'firstLetter') {
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }

    if (foodOrDrink === '/comidas') {
      result = await requestApi(apiFood(valueInput)[clickRButton], foodOrDrinkApiName);
    } else if (foodOrDrink === '/bebidas') {
      result = await requestApi(apiDrink(valueInput)[clickRButton], foodOrDrinkApiName);
    }

    if (result === 'error') return;

    if (result === 'redirect') return <Redirect to={ `/${foodOrDrink}` } />;

    this.setState({
      api: result,
    });
    this.saveIdProduct();
  }

  /*   saveIdProduct() {
    const { api, foodOrDrink } = this.state;
    if (foodOrDrink === '/comidas') {
      const idRecipe = api[0].idMeal;
      this.setState({
        idProduct: idRecipe,
      });
    } else if (foodOrDrink === '/bebidas') {
      const idRecipe = api[0].idDrink;
      this.setState({
        idProduct: idRecipe,
      });
    }
  } */

  verifyRenderApi() {
    const { foodOrDrink } = this.state;
    if (foodOrDrink === '/comidas') {
      return this.renderFood();
    } if (foodOrDrink === '/bebidas') {
      return this.renderDrink();
    }
  }

  renderFood() {
    const { api } = this.state;
    return (
      api.map((paran, index) => (
        <div
          key={ paran.idMeal }
          data-testid={ `${index}-recipe-card` }
        >
          <h1 data-testid={ `${index}-card-img` }>
            {paran.strMeal}
          </h1>
          <img
            src={ paran.strMealThumb }
            alt="food"
            data-testid={ `${index}-card-name` }
          />
        </div>
      ))
    );
  }

  renderDrink() {
    const { api } = this.state;
    return (
      api.map((paran, index) => (
        <div
          key={ paran.idDrink }
          data-testid={ `${index}-card-card` }
        >
          <h1 data-testid={ `${index}-card-name` }>
            {paran.strDrink}
          </h1>
          <img
            src={ paran.strDrinkThumb }
            alt="drink"
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))
    );
  }

  renderInputSearch() {
    const { valueInput, btn } = this.state;
    return (
      <>
        <input
          type="text"
          data-testid="search-input"
          nome="valueInput"
          value={ valueInput }
          onChange={ this.handleChange }
        />
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
      <div>
        { this.renderInputSearch() }
      </div>
    );
  }
}

SearchButton.propTypes = {
  pathname: PropTypes.string,
  history: PropTypes.shape(),
}.isRequired;

export default SearchButton;
