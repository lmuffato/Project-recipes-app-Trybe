import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { handleCurrentSearch } from '../actions';

class ExpBebidasIng extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredientList: [],
      searchByIngredient: [],
    };

    this.returnSrcImg.this = this.returnSrcImg.bind(this);
    this.setGlobalRedirect = this.setGlobalRedirect.bind(this);
  }

  componentDidMount() {
    this.getIngredientsList();
  }

  async getIngredientsList() {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const limitNumber = 12;
    const request = await fetch(endpoint).then((response) => response.json());
    // console.log(request);
    const ingredients = request.drinks.slice(0, limitNumber);
    this.setState({
      ingredientList: ingredients,
    });
  }

  async setGlobalRedirect(e) { // readequedar logica para fazer a chamada da api de pesquisa e settar no global
    e.preventDefault();
    const { handleSearch } = this.props;
    const { target } = e;
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${target.alt}`;
    const request = await fetch(endpoint).then((response) => response.json())
      .then((data) => {
        const limit = 12;
        const sliced = data.drinks.slice(0, limit);
        handleSearch(sliced);
        return sliced;
      });
    // console.log(request.drinks[0].idDrink);
    this.setState({
      searchByIngredient: request,
    });
  }

  returnSrcImg(ingredient) {
    return `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
  }

  render() {
    const { history } = this.props;
    const { ingredientList, searchByIngredient } = this.state;
    return (
      <>
        { (searchByIngredient > 1) && <Redirect to="/bebidas" />}
        <Header title="Explorar Ingredientes" />
        {ingredientList.map((eachIngredient, index) => (
          <div
            name={ eachIngredient.strIngredient1 }
            key={ eachIngredient.strIngredient1 }
            data-testid={ `${index}-ingredient-card` }
            onClick={ (e) => this.setGlobalRedirect(e) }
            role="button"
            aria-hidden
          >
            <h6
              data-testid={ `${index}-card-name` }
            >
              {eachIngredient.strIngredient1}
            </h6>
            <img
              src={ this.returnSrcImg(eachIngredient.strIngredient1) }
              alt={ eachIngredient.strIngredient1 }
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
  handleSearch: (currentIngredient) => dispatch(handleCurrentSearch(currentIngredient)),
});

ExpBebidasIng.propTypes = {
  history: PropTypes.shape().isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpBebidasIng);
