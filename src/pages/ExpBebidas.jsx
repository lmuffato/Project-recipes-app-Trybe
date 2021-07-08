import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExploreButton from '../components/ExploreButton';

class ExpBebidas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRandom: '',
      // typeRecipe: 'drink',
    };

    this.redirectToRandom.this = this.redirectToRandom.bind(this);
  }

  componentDidMount() {
    this.getRandomRecipe();
  }

  async getRandomRecipe() {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const request = await fetch(endpoint).then((response) => response.json());
    const idRecipe = request.drinks[0].idDrink;
    this.setState({
      currentRandom: idRecipe,

    });
  }

  redirectToRandom(e) {
    e.preventDefault();
    const { history } = this.props;
    const { currentRandom } = this.state;
    history.push(`/bebidas/${currentRandom}`);
  }

  render() {
    const { history } = this.props;
    const { currentRandom } = this.state; // prevenir erro unused state
    console.log(currentRandom);
    return (
      <>
        <Header title="Explorar Bebidas" />
        <ExploreButton
          textButton="Por Ingredientes"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
          datatestId="explore-by-ingredient"
        />
        <ExploreButton
          textButton="Me Surpreenda!"
          onClick={ (e) => this.redirectToRandom(e) }
          datatestId="explore-surprise"
        />
        <Footer history={ history } />
      </>
    );
  }
}

ExpBebidas.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExpBebidas;
