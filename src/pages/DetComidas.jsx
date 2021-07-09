import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import 'bootstrap/dist/css/bootstrap.min.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class DetComidas extends React.Component {
  constructor() {
    super();
    this.state = {
      foods: [],
      ingredientes: [],
      recommended: [],
      measures: [],
      video: '',
    };
    this.embedvideo = this.embedvideo.bind(this);
    this.fetchFoodsById = this.fetchFoodsById.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.fetchRecommendedDrinks = this.fetchRecommendedDrinks.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
  }

  async componentDidMount() {
    const { history } = this.props;
    const { location: { pathname } } = history;
    const id = pathname.split('/').pop();
    const foods = await this.fetchFoodsById(id);
    const recommended = await this.fetchRecommendedDrinks();
    this.setNewState(foods, recommended);
    this.handleIngredients();
  }

  handleIngredients() {
    const ingredients = [];
    const measures = [];
    let ingrediente;
    let measure;
    const { foods } = this.state;
    const comidas = Object.values(foods);
    comidas[0].map((recipe) => {
      this.embedvideo(recipe.strYoutube);
      const ingredientLimit = 20;
      for (let index = 1; index <= ingredientLimit; index += 1) {
        ingrediente = `strIngredient${index}`;
        measure = `strMeasure${index}`;
        ingredients.push(recipe[ingrediente]);
        measures.push(recipe[measure]);
        if (ingredients[ingredients.length - 1] === ''
        || ingredients[ingredients.length - 1] === null) {
          ingredients.pop();
        } if (measures[measures.length - 1] === ''
        || ingredients[ingredients.length - 1] === null) {
          measures.pop();
        }
      }
      return this.setState({
        ingredientes: ingredients,
        measures,
      });
    });
  }

  async onClickShare(path) {
    const p = document.createElement('p');
    const pai = document.querySelector('#share');
    p.innerText = 'Link copiado!';
    const url = `http://localhost:3000${path}`;
    pai.appendChild(p);
    await copy(url);
  }

  setNewState(foods, recommended) {
    this.setState({
      foods,
      recommended,
    });
  }

  embedvideo(url) {
    const video = url.split('=')[1];
    this.setState({ video });
  }

  fetchFoodsById(id) {
    const foods = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json());
    return foods;
  }

  fetchRecommendedDrinks() {
    const min = 0;
    const max = 6;
    const recommended = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((response) => response.drinks.slice(min, max));
    return recommended;
  }

  render() {
    const { history } = this.props;
    const { pathname } = history.location;
    const { foods, measures, ingredientes, video, recommended } = this.state;
    const food = Object.values(foods);
    return (
      food.map((recipe) => (
        <div key="recipe">
          <img
            data-testid="recipe-photo"
            alt="imagem da receita"
            src={ recipe[0].strMealThumb }
            width="300px"
          />
          <h1 data-testid="recipe-title">{ recipe[0].strMeal }</h1>
          <p data-testid="recipe-category">{ recipe[0].strCategory }</p>
          <div id="share">
            <input
              type="image"
              data-testid="share-btn"
              src={ shareIcon }
              alt="Compartilhar receita"
              onClick={ () => this.onClickShare(pathname) }
            />
            <input
              type="image"
              data-testid="favorite-btn"
              src={ whiteHeartIcon }
              alt="favoritar receita"
            />
          </div>
          <h2>
            Lista de Ingredientes
          </h2>
          <table border="1">
            <thead>
              Ingredients
              Measures
            </thead>
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
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {measures[index]}
                </td>
              </tr>))}
          </table>
          <h2>
            Modo de Preparo:
          </h2>
          <p data-testid="instructions">
            {recipe[0].strInstructions}
          </p>
          <iframe
            data-testid="video"
            height="202"
            width="350"
            src={ `https://www.youtube.com/embed/${video}` }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; clipboard-write; picture-in-picture"
          />
          <h2>Drinks Recomendados</h2>
          {recommended.map((drink, index) => (
            <div key={ drink.idDrink } data-testid={ `${index}-recomendation-card` }>
              <input
                width="350"
                type="image"
                src={ drink.strDrinkThumb }
                data-testid="recipe-photo"
                alt="recipe-img"
                onClick={ () => history.push(`/bebidas/${drink.idDrink}`) }
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

DetComidas.propTypes = ({
  history: PropTypes.shape(),
}).isRequired;

export default DetComidas;
