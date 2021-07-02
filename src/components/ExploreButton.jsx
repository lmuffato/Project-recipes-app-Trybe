import React from 'react';
import PropTypes from 'prop-types';

class ExploreButton extends React.Component {
  render() {
    const { history, textButton, datatestId, onClick } = this.props;
    return (
      <button
        history={ history }
        type="submit"
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
  history: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ExploreButton;
