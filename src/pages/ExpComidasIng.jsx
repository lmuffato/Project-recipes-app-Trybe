import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { handleCurrentSearch } from '../actions';

class ExpComidasIng extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredientList: [],
    };

    this.returnSrcImg.this = this.returnSrcImg.bind(this);
    this.setGlobalRedirect.this = this.setGlobalRedirect.bind(this);
  }

  componentDidMount() {
    this.getIngredientsList();
  }

  async getIngredientsList() {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const limitNumber = 12;
    const request = await fetch(endpoint).then((response) => response.json());
    // console.log(request);
    const ingredients = request.meals.slice(0, limitNumber);
    this.setState({
      ingredientList: ingredients,
    });
  }

  async setGlobalRedirect(e) { // readequedar logica para fazer a chamada da api de pesquisa e settar no global
    e.preventDefault();
    const { history, handleSearch } = this.props;
    const { target } = e;
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${target.alt}`;
    const request = await fetch(endpoint).then((response) => response.json());
    console.log(request);

    if (request.meals.length > 1) {
      const maxLength = 12;
      const slicedData = request.meals.slice(0, maxLength);
      handleSearch(slicedData);
      history.push('/comidas');
    } else {
      const singleResponseId = request.meals[0].idMeal;
      history.push(`/comidas/${singleResponseId}`);
    }
  }

  returnSrcImg(ingredient) {
    return `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
  }

  render() {
    const { history } = this.props;
    const { ingredientList } = this.state;
    return (
      <>
        <Header title="Explorar Ingredientes" />
        {ingredientList.map((eachIngredient, index) => (
          <div
            key={ eachIngredient.idIngredient }
            data-testid={ `${index}-ingredient-card` }
            onClick={ (e) => this.setGlobalRedirect(e) }
            role="button"
            aria-hidden
          >
            <h6
              data-testid={ `${index}-card-name` }
            >
              {eachIngredient.strIngredient}
            </h6>
            <img
              src={ this.returnSrcImg(eachIngredient.strIngredient) }
              alt={ eachIngredient.strIngredient }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
        <Footer history={ history } />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (currentSearch) => dispatch(handleCurrentSearch(currentSearch)),
});

ExpComidasIng.propTypes = {
  history: PropTypes.shape().isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpComidasIng);
