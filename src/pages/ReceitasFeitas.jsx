import React from 'react';
import Header from '../components/Header';
// import shareIcon from '../images/shareIcon.svg';

class ReceitasFeitas extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loadingFood: true,
  //     loadingDrink: true,
  //   selectedFood: [],
  //   selectedDrink: [],
  // };
  // this.loadingFoodRecipesDone = this.loadingFoodRecipesDone.bind(this);
  // this.loadingDrinkRecipesDone = this.loadingDrinkRecipesDone.bind(this);
  // this.selectedFoodRecipes = this.selectedFoodRecipes.bind(this);
  // this.selectedDrinkRecipes = this.selectedDrinkRecipes.bind(this);
  //   this.filterOrNot = this.filterOrNot.bind(this);
  // }

  // loadingFoodRecipesDone() {
  //   const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  //   if (recipes === null) {
  //     return;
  //   }
  //   recipes.forEach(async (item) => {
  //     const { id } = item;
  //     const recipeSearch = await (await fetch({ `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ id }` }).json());
  //     const selected = Object.values(recipeSearch)[3]
  //       .filter((product) => product.id === id);
  //     this.selectedFoodRecipes(selected);
  //   })
  // }

  // loadingDrinkRecipesDone() {
  //   const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  //   if (recipes === null) {
  //     return;
  //   }
  //   recipes.forEach(async (item) => {
  //     const { id } = item;
  //     const recipeSearch = await (await fetch({ `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ id }` }).json());
  //     const selected = Object.values(recipeSearch)[3]
  //       .filter((product) => product.id === id);
  //     this.selectedDrinkRecipes(selected);
  //   })
  // }

  // selectedFoodRecipes(param) {
  //   this.setState({
  //     loadingFood: false,
  //   }, (prevState) => {
  //     return { selectedFood: [...prevState, param],
  //     };
  //   });
  // }

  // selectedDrinkRecipes(param) {
  //   this.setState({
  //     loadingDrink: false,
  //   }, (prevState) => {
  //     return { selectedDrink: [...prevState, param],
  //     };
  //   });
  // }

  // filterOrNot(e) {
  //   const filter = e.target.innerText;
  //   if (filter === 'All') {
  //     this.setState({
  //       loadingFood: false,
  //       loadingDrink: false,
  //     });
  //   } else if (filter === 'Food') {
  //     this.setState({
  //       loadingFood: false,
  //       loadingDrink: true,
  //     });
  //   } else {
  //     this.setState({
  //       loadingFood: true,
  //       loadingDrink: false,
  //     });
  //   }
  // }

  render() {
  //   const food = { <img src={ img } alt={ name } data-testid={ `${index}-horizontal-image` } />
  //   <p data-testid={ `${index}-horizontal-top-text` }>{ category }</p>
  //   <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
  //   <p data-testid={ `${index}-horizontal-done-date` }> feita em { date }</p>
  //   <input
  //   type="image"
  //   data-testid={ `${index}-horizontal-share-btn` }
  //   src={ shareIcon }
  //   alt="Compartilhar receita"
  // />
  //   <h5 data-testid={ `${index}-${tagName}-horizontal-tag` }>{ tag }</h5> };
  //   const drink = { <img src={ img } alt={ name } data-testid={ `${index}-horizontal-image` } />
  //   <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>
  //   <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
  //   <p data-testid={ `${index}-horizontal-done-date` }> feita em { date }</p>
  //   <input
  //   type="image"
  //   data-testid={ `${index}-horizontal-share-btn` }
  //   src={ shareIcon }
  //   alt="Compartilhar receita"
  // />
  //   <h5 data-testid={ `${index}-${tagName}-horizontal-tag` }>{ tag }</h5> };
    return (
      <>
        <Header title="Receitas Feitas" />
        <div> RECEITAS FEITAS</div>
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
            {/* { loadingFood ? null : food }
            { loadingDrink ? null : drink } */}
          </div>
        </main>
      </>
    );
  }
}

export default ReceitasFeitas;
