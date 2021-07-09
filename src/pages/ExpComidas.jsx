import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExploreButton from '../components/ExploreButton';

class ExpComidas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRandom: 0,
      // typeRecipe: 'meal',
    };

    this.redirectToRandom.this = this.redirectToRandom.bind(this);
  }

  componentDidMount() {
    this.getRandom();
  }

  async getRandom() {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const request = await fetch(endpoint).then((response) => response.json());
    const idRecipe = request.meals[0].idMeal;
    this.setState({
      currentRandom: idRecipe,
    });
  }

  redirectToRandom(e) {
    e.preventDefault();
    const { history } = this.props;
    const { currentRandom } = this.state;
    history.push(`/comidas/${currentRandom}`);
  }

  render() {
    const { history } = this.props;
    const { currentRandom } = this.state; // prevenir erro unused state
    console.log(currentRandom);

    return (
      <>
        <Header title="Explorar Comidas" />
        <ExploreButton
          textButton="Por Ingredientes"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
          datatestId="explore-by-ingredient"
        />
        <ExploreButton
          textButton="Por Local de Origem"
          onClick={ () => history.push('/explorar/comidas/area') }
          datatestId="explore-by-area"
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

ExpComidas.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExpComidas;
