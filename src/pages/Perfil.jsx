import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

class Perfil extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  }

  render() {
    const { history } = this.props;
    let email = '';
    if (localStorage.user) {
      const user = JSON.parse(localStorage.getItem('user'));
      email = user.email;
    }

    return (
      <>
        <header>
          <Header title="Perfil" />
        </header>
        <div className="profile">
          <span data-testid="profile-email">
            {email}
          </span>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/receitas-feitas') }
          >
            Receitas Feitas
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/receitas-favoritas') }
          >
            Receitas Favoritas
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ this.handleClick }
          >
            Sair
          </button>
          <Footer history={ history } />
        </div>
      </>
    );
  }
}

Perfil.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Perfil;
