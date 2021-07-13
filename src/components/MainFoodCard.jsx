import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleCurrentSearch } from '../actions';

class MainFoodCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodData: {},
      isLoading: true,
      isCharging: true,
      isSelected: '',
      categories: {},
    };
    this.loadingFoodCategories = this.loadingFoodCategories.bind(this);
    this.FilterCategoryFoods = this.FilterCategoryFoods.bind(this);
    this.FilterCategoryFood = this.FilterCategoryFood.bind(this);
    this.renderCurrentSearch = this.renderCurrentSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { currentSearch } = this.props;
    console.log(currentSearch);
    if (currentSearch.length !== 0) {
      this.renderCurrentSearch();
    } else {
      this.FilterCategoryFood();
      this.loadingFoodCategories();
    }
  }

  componentDidUpdate(prevState) {
    const { currentSearch } = this.props;
    if (prevState.currentSearch !== currentSearch) this.renderCurrentSearch();
  }

  componentWillUnmount() {
    const { cleanGlobalSearch } = this.props;
    cleanGlobalSearch([]);
  }

  handleClick(e) {
    const category = e.target.innerText;
    const { isSelected } = this.state;
    if (category === 'All' || category === isSelected) {
      this.setState({
        isSelected: 'All',
      });
      this.FilterCategoryFood();
    } else {
      this.setState({
        isSelected: category,
      });
      this.FilterCategoryFoods(category);
    }
  }

  async FilterCategoryFood() { // render principal-inicial dos cards
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const limitNumber = 12;
    fetch(URL)
      .then((response) => response.json())
      .then((allMeals) => {
        const result = allMeals.meals.slice(0, limitNumber);
        this.setState({
          foodData: result,
          isLoading: false,
        });
      });
  }

  loadingFoodCategories() { // render categories buttons
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const limitNumber = 5;
    fetch(URL)
      .then((response) => response.json())
      .then((allFoods) => {
        const result = allFoods.meals.slice(0, limitNumber);
        this.setState({
          isCharging: false,
          categories: result,
        });
      });
  }

  FilterCategoryFoods(props) { // render dos cards de acordo com click category
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${props}`;
    const limitNumber = 12;
    fetch(URL)
      .then((response) => response.json())
      .then((allFoods) => {
        const result = allFoods.meals.slice(0, limitNumber);
        this.setState({
          foodData: result,
          isLoading: false,
        });
      });
  }

  async renderCurrentSearch() {
    const { currentSearch, typeRecipe, history } = this.props;
    const endpoint = {
      name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${currentSearch}`,
      ingrendient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${currentSearch}`,
      firstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${currentSearch}`,
    };
    if (typeRecipe) {
      const chosenEnpoint = endpoint[typeRecipe];
      const erroMsg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
      const request = await fetch(chosenEnpoint)
        .then((response) => response.json())
        .catch((err) => {
          console.log(err);
          // eslint-disable-next-line no-alert
          return { [typeRecipe]: null };
        });
      if (request.meals === undefined || request.meals === null) {
        // eslint-disable-next-line no-alert
        return alert(erroMsg);
      }
      const limit = 12;
      const data = request.meals;
      const sliced = data.slice(0, limit);
      this.setState({
        foodData: sliced,
        isLoading: false,
      });
      if (data.length === 1) {
        const idRecipe = sliced[0].idMeal;
        return history.push(`/comidas/${idRecipe}`);
      }
    }
  }

  render() {
    const { history } = this.props;
    const { foodData, isLoading, categories, isCharging } = this.state;
    const loading = (<h1>Carregando...</h1>);
    return (
      <>
        <section className="categoryFilters">
          <button
            type="button"
            key="All"
            data-testid="All-category-filter"
            onClick={ (e) => this.handleClick(e) }
          >
            All
          </button>
          {isCharging ? '' : categories.map((item, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${item.strCategory}-category-filter` }
              onClick={ (e) => this.handleClick(e) }
            >
              {item.strCategory}
            </button>
          ))}
        </section>
        <div className="recipeContainer">
          { isLoading ? loading : foodData.map((recipe, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              id={ recipe.idMeal }
              className="recipeCard"
            >
              <input
                className="recipeImg"
                type="image"
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img` }
                onClick={ () => history.push(`/comidas/${recipe.idMeal}`) }
              />
              <h6 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h6>
            </div>
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentSearch: state.recipe.currentSearch,
  typeRecipe: state.recipe.typeRecipe,
});

const mapDispatchToProps = (dispatch) => ({
  cleanGlobalSearch: (currentSearch) => dispatch(handleCurrentSearch(currentSearch)),
});

MainFoodCard.propTypes = {
  history: PropTypes.shape().isRequired,
  currentSearch: PropTypes.node.isRequired,
  cleanGlobalSearch: PropTypes.func.isRequired,
  typeRecipe: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainFoodCard);
