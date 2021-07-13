import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import searchIcon from '../images/searchIcon.svg';
import { handleCurrentSearch } from '../actions';

class SearchButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueInput: '',
      clickRButton: '',
      btn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderInputSearch = this.renderInputSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderRadioButtons = this.renderRadioButtons.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({
      valueInput: value,
    });
  }

  handleClick() {
    const { valueInput, clickRButton } = this.state;
    const { handleSearch } = this.props;
    const msgErro = 'Sua busca deve conter somente 1 (um) caracter';
    if (clickRButton === 'firstLetter' && valueInput.length > 1) {
      // eslint-disable-next-line no-alert
      alert(msgErro);
    } else {
      handleSearch(valueInput, clickRButton);
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
        placeholder="Selecione um filtro abaixo para pesquisar"
        className="inputSearch"
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
          className="headerIcons"
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
        <section className="filters">
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
        </section>
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ this.handleClick }
          className="searchButton"
        >
          Buscar
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
  handleSearch: (currentSearch, typeRecipe) => (
    dispatch(handleCurrentSearch(currentSearch, typeRecipe))),
});

SearchButton.propTypes = {
  handleSearch: PropTypes.func,
  handleRecipe: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(SearchButton);
