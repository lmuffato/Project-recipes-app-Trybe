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

    this.dispatchToGlobal.this = this.dispatchToGlobal.bind(this);
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

  dispatchToGlobal() {
    console.log('função faz o dispatch, encaminha para o url dinâmica com o id do state');
    // talvez dispatch p/ global da info "meal/drink" seja necessário p/ fins de api
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
          onClick={ () => this.dispatchToGlobal() }
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
