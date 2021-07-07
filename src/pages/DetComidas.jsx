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

  render() {
    const { foods } = this.state;
    const food = Object.values(foods);
    console.log(food);
    return (
      food.map((recipe) => (
        <div key="recipe">
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
