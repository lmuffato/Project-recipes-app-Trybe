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
      // eslint-disable-next-line no-alert
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
    const { api } = this.state;
    return (
      api.map((paran) => (
        <div key={ paran.idMeal }>
          <h1>{paran.strMeal}</h1>
          <img src={ paran.strMealThumb } alt="food" />
        </div>
      ))
    );
  }

  renderDrink() {
    const { api } = this.state;
    return (
      api.map((paran) => (
        <div key={ paran.idDrink }>
          <h1>{paran.strDrink}</h1>
          <img src={ paran.strDrinkThumb } alt="drink" />
        </div>
      ))
    );
  }

  renderInputSearch() {
    return (

      <input type="text" data-testid="search-input" />
    );
  }

  renderRadioButtons() {
    const { btn } = this.state;
    return (
      <>
        <button
          type="submit"
          onClick={ () => (
            this.setState((prev) => ({ hideInput: !prev.hideInput }))) }
        >
          <img src={ searchIcon } alt="procurar" data-testid="search-top-btn" />
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
}.isRequired;

export default SearchButton;
