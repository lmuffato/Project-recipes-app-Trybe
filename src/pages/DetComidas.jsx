import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import {
  fetchFoodsById,
  fetchRecommendedDrinks,
  saveFavoriteFood,
  checkStorageFood } from '../services/index';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/carousel.css';

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
    this.handleIngredients = this.handleIngredients.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
  }

  async componentDidMount() {
    const { history } = this.props;
    const { location: { pathname } } = history;
    const id = pathname.split('/').pop();
    const foods = await fetchFoodsById(id);
    const recommended = await fetchRecommendedDrinks();
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

  checkFavorite(recipe) {
    if (localStorage.favoriteRecipes) {
      if (checkStorageFood(recipe) === true) {
        return blackHeartIcon;
      }
      return whiteHeartIcon;
    }
    return whiteHeartIcon;
  }

  /*
  InProgressButton(id) {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes.meals[id]) {
      const button = document.querySelector('.start-btn');
      button.innerHTML = 'Continuar Receita';
    }
  }
  */
  checkRecipe({ idMeal }) {
    if (localStorage.doneRecipes) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const done = doneRecipes.find((element) => (element.id === idMeal));
      if (done) {
        return true;
      }
      return false;
    }
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
            className="detImg"
            data-testid="recipe-photo"
            alt="imagem da receita"
            src={ recipe[0].strMealThumb }
            width="100px"
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
              src={ this.checkFavorite(recipe[0]) }
              alt="favoritar receita"
              onClick={ () => saveFavoriteFood(recipe[0]) }
              className="fav-btn"
            />
          </div>
          <h2>
            Lista de Ingredientes
          </h2>
          <table border="1" width="340px">
            <thead>
              <tr>
                <td>Ingredients</td>
                <td>Measures</td>
              </tr>
            </thead>
            <tbody>
              {ingredientes.map((ingredient, i) => (
                <tr key={ `row${i}` }>
                  <td key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                    {ingredient}
                  </td>
                  <td key={ measures } data-testid={ `${i}-ingredient-name-and-measure` }>
                    {measures[i]}
                  </td>
                </tr>))}
            </tbody>
          </table>
          <h2> Modo de Preparo:</h2>
          <p data-testid="instructions" className="instructions">
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
          <div className="carousel-sbt">
            {recommended.map((drink, index) => (
              <div
                key={ drink.idDrink }
                data-testid={ `${index}-recomendation-card` }
                className="card-container"
                onClick={ () => history.push(`/bebidas/${drink.idDrink}`) }
                aria-hidden="true"
              >
                <img
                  className="recommendation-img"
                  src={ drink.strDrinkThumb }
                  alt="recipe-img"
                />
                <h3
                  data-testid={ `${index}-recomendation-title` }
                >
                  {drink.strDrink}
                </h3>
              </div>
            ))}
          </div>
          {(!this.checkRecipe(recipe[0]))
          && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-btn"
              onClick={ () => history.push(`/comidas/${recipe[0].idMeal}/in-progress`) }
            >
              Iniciar Receita
            </button>)}
        </div>
      ))
    );
  }
}

DetComidas.propTypes = ({
  history: PropTypes.shape(),
}).isRequired;

export default DetComidas;
