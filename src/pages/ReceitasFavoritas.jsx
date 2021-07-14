// Lógica da renderização dos itens inspirada no repositório do grupo 8
// https://github.com/tryber/sd-010-a-project-recipes-app/pull/55
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

class ReceitasFavoritas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingCards: true,
      selectedRecipe: [],
      allRecipes: [],
    };
    this.loadingRecipesDone = this.loadingRecipesDone.bind(this);
    this.filterOrNot = this.filterOrNot.bind(this);
    this.copy = this.copy.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.loadingRecipesDone();
  }

  loadingRecipesDone() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipes === null) {
      return;
    }
    this.setState({
      allRecipes: recipes,
      selectedRecipe: recipes,
      loadingCards: false,
    });
  }

  timer(index) {
    const div = document.querySelector(`#recipeCopy${index}`);
    const tagP = document.querySelector(`tagP${index}`);
    div.removeChild(tagP);
  }

  copy(type, id, index) {
    let URL;
    const comida = `http://localhost:3000/comidas/${id}`;
    const bebida = `http://localhost:3000/bebidas/${id}`;
    if (type === 'comida') {
      URL = comida;
    } else if (type === 'bebida') {
      URL = bebida;
    }
    const el = document.createElement('input');
    el.value = URL;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    const div = document.querySelector(`#recipeCopy${index}`);
    const tagP = document.createElement('p');
    tagP.setAttribute('id', `tagP${index}`);
    div.appendChild(tagP);
    tagP.innerText = 'Link copiado!';
    const time = 15000;
    setTimeout(() => this.timer(index), time);
  }

  filterOrNot(e) {
    const { allRecipes } = this.state;
    const filter = e.target.innerText;
    if (filter === 'All') {
      const image = allRecipes;
      this.setState({
        selectedRecipe: image,
      });
    } else if (filter === 'Food') {
      const image = allRecipes.filter((item) => item.type === 'comida');
      this.setState({
        selectedRecipe: image,
      });
    } else if (filter === 'Drinks') {
      const image = allRecipes.filter((item) => item.type === 'bebida');
      this.setState({
        selectedRecipe: image,
      });
    }
  }

  render() {
    const { selectedRecipe, loadingCards } = this.state;
    const mapTags = (array, index) => (
      array && (
        array.map((tag) => (
          <h6 key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</h6>
        ))
      )
    );

    return (
      <>
        <Header title="Receitas Favoritas" />
        <div> PÁGINA RECEITAS FAVORITAS</div>
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ (e) => this.filterOrNot(e) }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ (e) => this.filterOrNot(e) }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ (e) => this.filterOrNot(e) }
          >
            Drinks
          </button>
        </div>
        <main>
          <div>
            { loadingCards ? '' : selectedRecipe.map((recipe, index) => (
              (
                <div
                  key={ index }
                  className="card"
                  id={ `recipeCopy${index}` }
                >
                  <Link to={ `/${recipe.type}s/${recipe.id}` } key={ recipe.name }>
                    <div>
                      <h4
                        data-testid={ `${index}-horizontal-name` }
                        className="title"
                      >
                        {recipe.name}
                      </h4>
                      <h6 data-testid={ `${index}-horizontal-top-text` }>
                        {
                          recipe.area !== '' ? `${recipe.area} - ${recipe.category}`
                            : `${recipe.alcoholicOrNot} - ${recipe.category}`
                        }
                      </h6>
                      <img
                        alt="recipe"
                        data-testid={ `${index}-horizontal-image` }
                        className="recipe-card-image recipeImg"
                        src={ recipe.image }
                      />
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={ () => this.copy(recipe.type, recipe.id, index) }
                  >
                    <img
                      src={ shareIcon }
                      alt="share"
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                  <h6 data-testid={ `${index}-horizontal-done-date` }>
                    {recipe.doneDate}
                  </h6>
                  <div>
                    {recipe.tags ? mapTags(recipe.tags, index) : null}
                  </div>
                </div>
              )
            ))}
          </div>
        </main>
      </>
    );
  }
}

export default ReceitasFavoritas;
