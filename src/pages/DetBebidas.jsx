import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class DetBebidas extends React.Component {
  constructor() {
    super();
    this.state = {
      drinks: [],
      ingredientes: [],
      recommended: [],
      measures: [],
    };
    this.fetchDrinksById = this.fetchDrinksById.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.fetchRecommendedFoods = this.fetchRecommendedFoods.bind(this);
  }

  async componentDidMount() {
    const { history } = this.props;
    const { location: { pathname } } = history;
    const id = pathname.split('/').pop();
    const drinks = await this.fetchDrinksById(id);
    const recommended = await this.fetchRecommendedFoods();
    this.setNewState(drinks, recommended);
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

  setNewState(drinks, recommended) {
    this.setState({
      drinks,
      recommended,
    });
  }

  fetchDrinksById(id) {
    const drinks = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json());
    return drinks;
  }

  fetchRecommendedFoods() {
    const min = 0;
    const max = 6;
    const recommended = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((response) => response.meals.slice(min, max));
    return recommended;
  }

  render() {
    const history = this.props;
    const { drinks, ingredientes, measures, recommended } = this.state;
    const drink = Object.values(drinks);
    return (
      drink.map((recipe) => (
        <div key="recipe">
          <img
            data-testid="recipe-photo"
            alt="imagem da receita"
            src={ recipe[0].strDrinkThumb }
            width="300px"
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
            <tbody>
              {ingredientes.map((ingredient, index) => (
                <tr key={ `row${index}` }>
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
            </tbody>
          </table>
          <h2
            data-testid="instructions"
          >
            Modo de Preparo:
          </h2>
          <p>
            {recipe[0].strInstructions}
          </p>
          <h2>Comidas Recomendadas</h2>
          {recommended.map((food, index) => (
            <div key={ food.idMeal } data-testid={ `${index}-recomendation-card` }>
              <input
                width="350"
                type="image"
                src={ food.strMealThumb }
                data-testid="recipe-photo"
                alt="recipe-img"
                onClick={ () => history.push(`/comidas/${food.idMeal}`) }
              />
            </div>
          ))}
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-btn"
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
