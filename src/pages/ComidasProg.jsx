import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class ComidasProg extends React.Component {
  constructor() {
    super();
    this.state = {
      foods: [],
      ingredientes: [],
      measures: [],
    };
    this.fetchFoodsById = this.fetchFoodsById.bind(this);
    this.copy = this.copy.bind(this);
    this.timer = this.timer.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
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
    const ingredientes = [];
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
        // console.log(recipe[ingrediente]);
        ingredientes.push(recipe[ingrediente]);
        // console.log(recipe[measure])
        measures.push(recipe[measure]);
        if (ingredientes[ingredientes.length - 1] === '') {
          ingredientes.pop();
        } if (measures[measures.length - 1] === '') {
          measures.pop();
        }
      }
      return this.setState({
        ingredientes,
        measures,
      });
    });
  }

  setNewState(foods) {
    this.setState({
      foods,
    });
  }

  fetchFoodsById(id) {
    const foods = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json());
    return foods;
  }

  timer() {
    const div = document.querySelector('#recipeCopy');
    const tagP = document.querySelector('#tagP');
    div.removeChild(tagP);
  }

  copy() {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    const div = document.querySelector('#recipeCopy');
    const tagP = document.createElement('p');
    tagP.setAttribute('id', 'tagP');
    div.appendChild(tagP);
    tagP.innerText = 'Link copiado!';
    const time = 15000;
    setTimeout(this.timer, time);
  }

  render() {
    // const { history } = this.props;
    const { foods, measures, ingredientes } = this.state;
    const food = Object.values(foods);
    return (
      food.map((recipe) => (
        <div id="recipeCopy" key="recipe">
          <img
            data-testid="recipe-photo"
            alt="imagem da receita"
            src={ recipe[0].strMealThumb }
            width="290px"
          />
          <h1 data-testid="recipe-title">{ recipe[0].strFood }</h1>
          <p data-testid="recipe-category">{ recipe[0].strCategory }</p>
          <input
            type="image"
            data-testid="share-btn"
            src={ shareIcon }
            alt="Compartilhar receita"
            onClick={ this.copy }
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
          {ingredientes.map((ingredient, index) => (
            <ul key={ `row${index}` }>
              <li
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                <input type="checkbox" />
                {ingredient}
                -
                {measures[index]}
              </li>
            </ul>))}
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
            data-testid="finish-recipe-btn"
            className="start-btn"
          >
            Iniciar Receita
          </button>
        </div>
      ))
    );
  }
}

ComidasProg.propTypes = ({
  history: PropTypes.shape(),
}).isRequired;

export default ComidasProg;
