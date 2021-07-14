import React from 'react';
import PropTypes from 'prop-types';
import EmProgInfos from '../components/EmProgInfos';
import '../App.css';

class EmProgComidas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // currentId: '',
      // type: '',
      title: '',
      category: '',
      thumbnail: '',
      instructions: '',
      ingredients: [],
      measures: [],
      usedIngredients: [],
    };

    this.getMealId.this = this.getMealId.bind(this);
    this.handleDoneSteps.this = this.handleDoneSteps.bind(this);
    this.checkDoneSteps.this = this.checkDoneSteps.bind(this);
    this.checkStorageDrinks.this = this.checkStorageDrinks.bind(this);
    this.checkStorageMeals.this = this.checkStorageMeals.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const { location: { pathname } } = history;
    const id = pathname.split('/')[2];

    this.getMealId(id);
  }

  // componentWillUnmount() {
  //   const { usedIngredients, currentId, type } = this.state;

  //   if (usedIngredients.length > 0) {
  //     const currentStore = this.storeItems(currentId, type);
  //     localStorage
  //       .setItem('inProgressRecipes', JSON.stringify(this.storeItems(currentStore)));
  //   }
  // }

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
    }
    if (target.checked === false) {
      const item = previusState.indexOf(name);
      previusState.splice(item, 1);

      this.setState({
        usedIngredients: [...previusState],
      });
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

  async getMealId(id) {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const request = await fetch(endpoint).then((response) => response.json());
    const recipe = request.meals;
    this.setState({
      // type: 'meals',
      // currentId: id,
      title: recipe[0].strMeal,
      category: recipe[0].strCategory,
      thumbnail: recipe[0].strMealThumb,
      instructions: recipe[0].strInstructions,
    });
    this.handleIngredients(recipe);

    if (this.checkStorageMeals(id)) {
      this.setState({
        usedIngredients: this.checkStorageMeals(id),
      });
    }
  }

  // storeItems() {
  //   const { usedIngredients, currentId, type } = this.state;
  //   const getItem = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   if (getItem !== undefined && type === 'meals') {
  //     return {
  //       meals: { ...getItem.meals,
  //         [currentId]: usedIngredients },
  //     };
  //   }
  //   if (getItem !== undefined && type === 'cocktails') {
  //     return { ...getItem,
  //       cocktails: { ...getItem.cocktails,
  //         [currentId]: usedIngredients },
  //     };
  //   }
  //   return {
  //     meals: [],
  //     cocktails:
  //   };
  // }

  checkStorageDrinks(id) {
    const storedItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storedItems) {
      return storedItems.cocktails[id];
    }
    return false;
  }

  checkStorageMeals(id) {
    const storedItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storedItems) {
      return storedItems.meals[id] || false;
    }
    return false;
  }

  checkDoneSteps(ingredient) {
    const { usedIngredients } = this.state;
    return (usedIngredients.includes(ingredient));
  }

  render() {
    const { history } = this.props;
    const { location: { pathname } } = history;
    const {
      thumbnail,
      title,
      category,
      instructions,
      ingredients,
      measures,
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
                checked={ this.checkDoneSteps(ingredient) }
              />
              <label
                htmlFor={ ingredient }
              >
                {` ${ingredient} -  ${measures[index]}`}
              </label>
            </div>
          ))}
        </form>
        <button data-testid="finish-recipe-btn" type="submit">Finalizar Receita</button>
        {usedIngredients && usedIngredients.map((each) => <p key={ each }>{each}</p>)}
      </div>
    );
  }
}

EmProgComidas.propTypes = {
  history: PropTypes.shape().isRequired,
};
export default EmProgComidas;
