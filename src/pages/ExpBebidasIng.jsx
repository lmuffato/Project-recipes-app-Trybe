import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

class ExpBebidasIng extends React.Component {
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
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const limitNumber = 12;
    const request = await fetch(endpoint).then((response) => response.json());
    console.log(request);
    const ingredients = request.drinks.slice(0, limitNumber);
    this.setState({
      ingredientList: ingredients,
    });
  }

  setGlobalRedirect(e) {
    const { history } = this.props;
    e.preventDefault();
    history.push('/comidas');
  }

  returnSrcImg(ingredient) {
    return `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
  }

  render() {
    const { history } = this.props;
    const { ingredientList } = this.state;
    return (
      <>
        <Header title="Explorar Ingredientes" />
        {ingredientList.map((eachIngredient, index) => (
          <div
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

ExpBebidasIng.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExpBebidasIng;
