import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';
import Footer from '../components/Footer';

class ExpComidasOri extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header title="Explorar Origem">
          <SearchButton />
        </Header>
        <div>Página de explorar Comidas por origem</div>
        <Footer history={ history } />
      </>
    );
  }
}

ExpComidasOri.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExpComidasOri;
