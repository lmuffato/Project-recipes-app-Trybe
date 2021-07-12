import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import fetchDrinksById, { fetchRecommendedFoods } from '../services/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class DetBebidas extends React.Component {
  constructor() {
    super();
    this.state = {
      drinks: [],
      ingredientes: [],
      recommended: [],
      measures: [],
    };
    this.handleIngredients = this.handleIngredients.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
    this.checkRecipe = this.checkRecipe.bind(this);
    this.saveFavorite = this.saveFavorite.bind(this);
  }

  async componentDidMount() {
    const { history } = this.props;
    const { location: { pathname } } = history;
    const id = pathname.split('/').pop();
    const drinks = await fetchDrinksById(id);
    const recommended = await fetchRecommendedFoods();
    this.setNewState(drinks, recommended);
    this.handleIngredients();
    // this.inProgressButton(id);
  }

  handleIngredients() {
    const ingredients = [];
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

  setNewState(drinks, recommended) {
    this.setState({
      drinks,
      recommended,
    });
  }

  saveFavorite(recipe) {
    const favorite = [{
      id: recipe.idDrink,
      type: 'bebida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    }];
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
    }
    const favBtn = document.querySelector('.fav-btn');
    const url = 'http://localhost:3000/static/media/whiteHeartIcon.ea3b6ba8.svg';
    if (favBtn.src === url) {
      const parseSave = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(parseSave);
      const combineObj = parseSave.concat(favorite);
      localStorage.clear();
      localStorage.setItem('favoriteRecipes', JSON.stringify(combineObj));
    } else {
      console.log('nãopassou');
    }
  }

  checkFavorite(recipe) {
    if (localStorage.favoriteRecipes) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const current = favorites.find((element) => (element.id === recipe.idDrink));
      if (favorites.includes(current)) {
        return blackHeartIcon;
      }
      return whiteHeartIcon;
    }
    return whiteHeartIcon;
  }
  /*
  InProgressButton(id) {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes.cocktails[id]) {
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
    const history = this.props;
    const { pathname } = history.location;
    const { drinks, ingredientes, measures, recommended } = this.state;
    const drink = Object.values(drinks);
    return (
      drink.map((recipe) => (
        <div key="recipe">
          <img
            className="detImg"
            data-testid="recipe-photo"
            alt="imagem da receita"
            src={ recipe[0].strDrinkThumb }
            width="300px"
          />
          <h1 data-testid="recipe-title">{ recipe[0].strDrink }</h1>
          <p data-testid="recipe-category">{ recipe[0].strCategory }</p>
          <p data-testid="recipe-category">{`Alcoholic? ${recipe[0].strAlcoholic}`}</p>
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
              onClick={ () => this.saveFavorite(recipe[0]) }
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
          <h2>
            Modo de Preparo:
          </h2>
          <p data-testid="instructions" className="instructions">
            {recipe[0].strInstructions}
          </p>
          <h2>Comidas Recomendadas</h2>
          {recommended.map((food, index) => (
            <div key={ food.idMeal } data-testid={ `${index}-recomendation-card` }>
              <Link to={ `/comidas/${food.idMeal}` }>
                <input
                  width="350"
                  type="image"
                  src={ food.strMealThumb }
                  data-testid="recipe-photo"
                  alt="recipe-img"
                />
              </Link>
            </div>
          ))}
          {(!this.checkRecipe(recipe[0]))
          && (
            <Link to={ `/bebidas/${recipe[0].idDrink}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-btn"
              >
                Iniciar Receita
              </button>
              )
            </Link>)}
        </div>
      ))
    );
  }
}

DetBebidas.propTypes = ({
  history: PropTypes.shape(),
}).isRequired;

export default DetBebidas;
