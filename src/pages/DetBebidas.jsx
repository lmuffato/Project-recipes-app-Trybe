import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class DetBebidas extends React.Component {
  constructor() {
    super();
    this.state = {
      drinks: [],
      ingredientes: [],
      measures: [],
    };
    this.fetchDrinksById = this.fetchDrinksById.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
  }

  async componentDidMount() {
    const { history } = this.props;
    const { location: { pathname } } = history;
    const id = pathname.split('/').pop();
    const drinks = await this.fetchDrinksById(id);
    this.setNewState(drinks);
    this.handleIngredients();
  }

  handleIngredients() {
    const ingredientes = [];
    const measures = [];
    let ingrediente;
    let measure;
    const { drinks } = this.state;
    const bebidas = Object.values(drinks);
    bebidas[0].map((recipe) => {
      const ingredientLimit = 15;
      for (let index = 1; index <= ingredientLimit; index += 1) {
        ingrediente = `strIngredient${index}`;
        measure = `strMeasure${index}`;
        // console.log(recipe[ingrediente]);
        ingredientes.push(recipe[ingrediente]);
        // console.log(recipe[measure])
        measures.push(recipe[measure]);
        if (ingredientes[ingredientes.length - 1] === null) {
          ingredientes.pop();
        } if (measures[measures.length - 1] === null) {
          measures.pop();
        }
      }
      return this.setState({
        ingredientes,
        measures,
      });
    });
  }

  setNewState(drinks) {
    this.setState({
      drinks,
    });
  }

  fetchDrinksById(endPoint) {
    const drinks = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${endPoint}`)
      .then((response) => response.json());
    this.setState({
      address: endPoint,
    });
    return drinks;
  }

  render() {
    const { drinks, ingredientes, measures } = this.state;
    const drink = Object.values(drinks);
    return (
      drink.map((recipe) => (
        <div key="recipe">
          <img
            data-testid="recipe-photo"
            alt="imagem da receita"
            src={ recipe[0].strDrinkThumb }
            width="290px"
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
          <h2>
            Lista de Ingredientes
          </h2>
          <table border="1">
            {ingredientes.map((ingredient, index) => (
              <tr key="row">
                <td
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </td>
                <td
                  key={ measures }
                >
                  {measures[index]}
                </td>
              </tr>))}
          </table>
          <h2
            data-testid="instructions"
          >
            Modo de Preparo:
          </h2>
          <p>
            {recipe[0].strInstructions}
          </p>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-btn"
          >
            <Link to={ `/comidas/${address}/in-progress` }>
              Iniciar Receita
            </Link>
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
