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

      <input type="text" data-testid="search-input" />
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
