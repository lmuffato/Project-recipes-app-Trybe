import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';
import Footer from '../components/Footer';

class ExpBebidasOri extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header title="Explorar Origem">
          <SearchButton />
        </Header>
        <div>Not Found</div>
        <Footer history={ history } />
      </>
    );
  }
}

ExpBebidasOri.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExpBebidasOri;
