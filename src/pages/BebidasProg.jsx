import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class BebidasProg extends React.Component {
  constructor() {
    super();
    this.state = {
      drinks: [],
      ingredientes: [],
      measures: [],
    };
    this.fetchDrinksById = this.fetchDrinksById.bind(this);
    this.copy = this.copy.bind(this);
    this.timer = this.timer.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
  }

  async componentDidMount() {
    // const { history } = this.props;
    // const { handle } = this.props.match.params;
    // const { location: { pathname } } = history;
    // const id = pathname.split('/').pop();
    // const drinks = await this.fetchDrinksById(id);
    // this.fetchDrinksById(address);
    // this.setNewState(drinks);
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
    return drinks;
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
    const { drinks, ingredientes, measures } = this.state;
    const drink = Object.values(drinks);
    return (
      drink.map((recipe) => (
        <div id="recipeCopy" key="recipe">
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
            <ul key="row">
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
            Finalizar Receita
          </button>
        </div>
      ))
    );
  }
}

export default BebidasProg;
