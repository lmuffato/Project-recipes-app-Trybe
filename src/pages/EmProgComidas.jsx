import React from 'react';
import PropTypes from 'prop-types';
import EmProgInfos from '../components/EmProgInfos';
import '../App.css';

class EmProgComidas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: '',
      title: '',
      category: '',
      thumbnail: '',
      instructions: '',
      ingredients: [],
      measures: [],
      usedIngredients: [],
      area: '',
    };

    // this.getMealId.this = this.getMealId.bind(this);
    // this.handleDoneSteps.this = this.handleDoneSteps.bind(this);
    // // this.checkDoneSteps.this = this.checkDoneSteps.bind(this);
    // this.checkStorageMeals.this = this.checkStorageMeals.bind(this);
    this.setDoneRecipe = this.setDoneRecipe.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const { location: { pathname } } = history;
    const id = pathname.split('/')[2];

    this.getMealId(id);
  }

  handleDoneSteps(e) {
    const { target } = e;
    const { name } = target;
    const { usedIngredients } = this.state;
    const previusState = [...usedIngredients];
    const checkRepeat = previusState.includes(name);

    if (target.checked === true && checkRepeat === false) {
      this.setState((prevState) => ({
        usedIngredients: [...prevState.usedIngredients, name],
      }));

      this.setStore([...usedIngredients, name]);
    }

    if (target.checked === false) {
      const item = previusState.indexOf(name);
      previusState.splice(item, 1);

      this.setState({
        usedIngredients: [...previusState],
      });
      this.setStore([...previusState]);
    }
  }

  handleIngredients(recipe) {
    const ingredients = [];
    const measures = [];
    let ingrediente;
    let measure;
    recipe.map((current) => {
      const ingredientLimit = 15;
      for (let index = 1; index <= ingredientLimit; index += 1) {
        ingrediente = `strIngredient${index}`;
        measure = `strMeasure${index}`;
        // console.log(recipe[ingrediente]);
        ingredients.push(current[ingrediente]);
        // console.log(recipe[measure])
        measures.push(current[measure]);
        if (ingredients[ingredients.length - 1] === ''
        || ingredients[ingredients.length - 1] === null) {
          ingredients.pop();
        } if (measures[measures.length - 1] === ''
        || measures[measures.length - 1] === null) {
          measures.pop();
        }
      }
      return this.setState({
        ingredients,
        measures,
      });
    });
  }

  setStore(currentState) {
    const { currentId } = this.state;
    const storedBefore = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const setData = {
      ...storedBefore,
      meals: {
        ...storedBefore.meals || null,
        [currentId]: currentState,
      },
    };

    localStorage
      .setItem('inProgressRecipes', JSON.stringify(setData));
  }

  async getMealId(id) {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const request = await fetch(endpoint).then((response) => response.json());
    const recipe = request.meals || null;
    console.log(recipe);
    console.log(new Date());
    this.setState({
      currentId: id,
      title: recipe[0].strMeal,
      category: recipe[0].strCategory,
      thumbnail: recipe[0].strMealThumb,
      instructions: recipe[0].strInstructions,
      area: recipe[0].strArea,
    });
    this.handleIngredients(recipe);

    if (this.checkStorageMeals(id)) {
      this.setState({
        usedIngredients: this.checkStorageMeals(id),
      });
    }
  }

  setDoneRecipe() {
    const { history } = this.props;
    const { currentId, category, title, thumbnail, area } = this.state;
    const prevStore = JSON.parse(localStorage.getItem('doneRecipes'));
    const existBefore = prevStore.find((recipe) => recipe.id === currentId);
    const d = new Date();
    const doneRecipe = [...prevStore, {
      id: currentId,
      type: 'meals',
      area,
      category,
      alcoholicOrNot: '',
      name: title,
      image: thumbnail,
      doneDate: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
      tags: [],
    }];

    if (existBefore === false || existBefore === undefined) {
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
    }
    console.log(existBefore);
    history.push('/receitas-feitas');
  }

  checkStorageMeals(id) {
    const storedItems = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (storedItems) {
      return storedItems.meals[id] || null;
    }
  }

  render() {
    const { history } = this.props;
    const { location: { pathname } } = history;
    const { thumbnail, title, category, instructions, ingredients, measures,
      usedIngredients } = this.state;
    return (
      <div>
        <EmProgInfos
          pathname={ pathname }
          title={ title }
          thumbnail={ thumbnail }
          category={ category }
          instructions={ instructions }
        />
        <form>
          {ingredients && ingredients.map((ingredient, index) => (
            <div key={ ingredient } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                name={ ingredient }
                key={ ingredient }
                id={ ingredient }
                onChange={ (e) => this.handleDoneSteps(e) }
                checked={ usedIngredients.includes(ingredient) }
              />
              <label
                htmlFor={ ingredient }
              >
                {` ${ingredient} -  ${measures[index]}`}
              </label>
            </div>
          ))}
        </form>
        <button
          data-testid="finish-recipe-btn"
          type="submit"
          onClick={ this.setDoneRecipe }
          disabled={ ingredients.length !== usedIngredients.length }
        >
          Finalizar Receita
        </button>
      </div>
    );
  }
}

EmProgComidas.propTypes = {
  history: PropTypes.shape().isRequired,
};
export default EmProgComidas;
