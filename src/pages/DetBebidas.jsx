import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class DetBebidas extends React.Component {
  constructor() {
    super();
    this.state = {
      drinks: [],
    };
    /*  this.handleIngredients = this.handleIngredients.bind(this); */
    this.fetchDrinksById = this.fetchDrinksById.bind(this);
  }

  async componentDidMount() {
    const { history } = this.props;
    const { location: { pathname } } = history;
    const id = pathname.split('/').pop();
    const drinks = await this.fetchDrinksById(id);
    this.setNewState(drinks);
  /*  this.handleIngredients(); */
  }
  /*
  handleIngredients() {
    const ingredients = [];
    const measures = [];
    let ingredient;
    let measure;
    const { drinks } = this.state;
    const drink = Object.values(drinks);
    drink.map((recipe) =>
      console.log(recipe.filter((value) => value === 'Galliano')));
  } */

  setNewState(drinks) {
    this.setState({
      drinks,
    });
  }

  fetchDrinksById(endPoint) {
    const drinks = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${endPoint}`)
      .then((response) => response.json());
    return drinks;
  }

  render() {
    const { drinks } = this.state;
    const drink = Object.values(drinks);
    return (
      drink.map((recipe) => (
        <div key="recipe">
          <img
            data-testid="recipe-photo"
            alt="imagem da receita"
            src={ recipe[0].strDrinkThumb }
            width="280px"
          />
          <h1 data-testid="recipe-title">{ recipe[0].strDrink }</h1>
          <p data-testid="recipe-category">{ recipe[0].strCategory }</p>
          <input
            type="image"
            data-testid="share-btn"
            src={ shareIcon }
            alt="Compartilhar receita"
          />
          <input
            type="image"
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            alt="favoritar receita"
          />
          <ul>
            Lista de Ingredientes
            <li>{}</li>
          </ul>
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            Iniciar Receita
          </button>
        </div>
      ))
    );
  }
}

DetBebidas.propTypes = ({
  history: PropTypes.shape(),
}).isRequired;

export default DetBebidas;
