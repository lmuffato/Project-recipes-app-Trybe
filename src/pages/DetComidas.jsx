import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class DetComidas extends React.Component {
  constructor() {
    super();
    this.state = {
      foods: [],
    };
    this.fetchFoodsById = this.fetchFoodsById.bind(this);
    this.copy = this.copy.bind(this);
    this.timer = this.timer.bind(this);
  }

  async componentDidMount() {
    const { history } = this.props;
    const { location: { pathname } } = history;
    const id = pathname.split('/').pop();
    const foods = await this.fetchFoodsById(id);
    this.setNewState(foods);
  /*  this.handleIngredients(); */
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
    const { foods } = this.state;
    const food = Object.values(foods);
    console.log(food);
    return (
      food.map((recipe) => (
        <div id="recipeCopy" key="recipe">
          <img
            data-testid="recipe-photo"
            alt="imagem da receita"
            src={ recipe[0].strMealThumb }
            width="290px"
          />
          <h1 data-testid="recipe-title">{ recipe[0].strMeal }</h1>
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
          <ul>
            Lista de Ingredientes
            <li>{}</li>
          </ul>
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
