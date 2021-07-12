import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import searchIcon from '../images/searchIcon.svg';
import { handleCurrentSearch, handleTypeRecipe } from '../actions';

class SearchButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueInput: '',
      clickRButton: '',
      /* api: [], */
      btn: false,
    /*   foodOrDrink: '',
      foodOrDrinkApiName: '', */
    };

    this.handleChange = this.handleChange.bind(this);
    /* this.apisFood = this.apiFood.bind(this); */
    this.renderInputSearch = this.renderInputSearch.bind(this);
    /*    this.requestApi = this.requestApi.bind(this); */
    this.handleClick = this.handleClick.bind(this);
    /*   this.apiDrink = this.apiDrink.bind(this); */
    this.renderRadioButtons = this.renderRadioButtons.bind(this);
    /*    this.handlePathName = this.handlePathName.bind(this);
    this.renderFood = this.renderFood.bind(this);
    this.renderDrink = this.renderDrink.bind(this);
    this.verifyRenderApi = this.verifyRenderApi.bind(this); */
  }

  /*   componentDidMount() {
    this.handlePathName();
  } */
  /*
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
 */
  handleChange({ target: { value } }) {
    this.setState({
      valueInput: value,
    });
  }

  /*   handleClick() { // LÓGICA do redirect api.lenght = 1 pode acontecer aqui
    const { clickRButton, valueInput, foodOrDrink } = this.state;
    if (valueInput.length > 1 && clickRButton === 'firstLetter') {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (foodOrDrink === '/comidas') {
      return this.requestApi(this.apiFood(valueInput)[clickRButton]);
    } else if (foodOrDrink === '/bebidas') {
      return this.requestApi(this.apiDrink(valueInput)[clickRButton]);
    }
  } */

  handleClick() {
    const { valueInput, clickRButton } = this.state;
    const { handleSearch, handleRecipe } = this.props;
    handleSearch(valueInput);
    handleRecipe(clickRButton);
  }

  /*   async requestApi(endpoint) { // disptach aqui
    const { foodOrDrinkApiName } = this.state;
    const api = await fetch(endpoint);
    const tratamentoJson = await api.json();
    if (tratamentoJson === null) {
      this.setState({
        api: [],
      });
    } else {
      this.setState({ // ao inves de settar estado, dispatch
        api: tratamentoJson[foodOrDrinkApiName],
      });
    }
  } */

  /*  verifyRenderApi() { // // provavel saída
    const { foodOrDrink } = this.state;
    if (foodOrDrink === '/comidas') {
      return this.renderFood();
    } if (foodOrDrink === '/bebidas') {
      return this.renderDrink();
    }
  } */

  /*  renderFood() { // provavelmente saída
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

  renderDrink() { // provavel saída
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
 */

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

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (currentSearch) => dispatch(handleCurrentSearch(currentSearch)),
  handleRecipe: (typeRecipe) => dispatch(handleTypeRecipe(typeRecipe)),
});

SearchButton.propTypes = {
  handleSearch: PropTypes.func,
  handleRecipe: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(SearchButton);
