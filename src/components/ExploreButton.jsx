import React from 'react';
import PropTypes from 'prop-types';
import './ExploreButton.css';

class ExploreButton extends React.Component {
  render() {
    const { textButton, datatestId, onClick } = this.props;
    return (
      <button
        type="submit"
        className="btn-grad"
        data-testid={ datatestId }
        onClick={ onClick }
      >
        { textButton }
      </button>
    );
  }
}

ExploreButton.propTypes = {
  textButton: PropTypes.string.isRequired,
  datatestId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ExploreButton;
