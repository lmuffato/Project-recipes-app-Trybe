import React from 'react';
import searchIcon from '../images/searchIcon.svg';

class SearchButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideInput: true,
    };

    this.renderInputSearch = this.renderInputSearch.bind(this);
  }

  renderInputSearch() {
    return (
      <>
        <input type="text" data-testid="search-input" />
        <label htmlFor="optionsIngrediente">
          <input
            type="radio"
            value="Ingrediente"
            name="options"
            id="optionsIngrediente"
          />
          Ingrediente
        </label>
        <label htmlFor="optionsNome">
          <input
            type="radio"
            value="Nome"
            name="options"
            id="optionsNome"
          />
          Nome
        </label>
        <label htmlFor="optionsPrimeiraLetra">
          <input
            type="radio"
            value="PrimeiraLetra"
            name="options"
            id="optionsPrimeiraLetra"
          />
          Primeira letra
        </label>
      </>

    );
  }

  render() {
    const { hideInput } = this.state;

    return (
      <>
        <button
          type="submit"
          onClick={ () => (
            this.setState((prev) => ({ hideInput: !prev.hideInput }))) }
        >
          <img src={ searchIcon } alt="procurar" data-testid="search-top-btn" />
        </button>
        {!hideInput && this.renderInputSearch()}
      </>
    );
  }
}

export default SearchButton;
