import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.GenerateRadioButtons = this.GenerateRadioButtons.bind(this);
  }

  GenerateRadioButtons(name, label, onChange, dataTest) {
    return (
      <label htmlFor={ name }>
        {label}
        <input
          id={ name }
          name={ name }
          onChange={ onChange }
          type="radio"
          data-testid={ dataTest }
        />
      </label>
    );
  }

  render() {
    return (
      <div>
        <input type="text" />
        {this.GenerateRadioButtons('name', 'label', 'onChange', 'dataTest')}
        {this.GenerateRadioButtons('name', 'label', 'onChange', 'dataTest')}
        {this.GenerateRadioButtons('name', 'label', 'onChange', 'dataTest')}
      </div>
    );
  }
}

export default SearchBar;
