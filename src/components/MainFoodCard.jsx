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
    if (currentSearch.length !== 0) {
      this.renderCurrentSearch();
    } else {
      this.FilterCategoryFood();
      this.loadingFoodCategories();
    }
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
    const { currentSearch } = this.props;
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${currentSearch}`;
    const request = await fetch(endpoint).then((response) => response.json())
      .catch((erro) => console.log(erro));

    const limit = 12;
    const sliced = request.meals.slice(0, limit);
    this.setState({
      foodData: sliced,
      isLoading: false,
    });
  }

  render() {
    const { history } = this.props;
    const { foodData, isLoading, categories, isCharging } = this.state;
    const loading = (<h1>Carregando...</h1>);
    return (
      <>
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
        <div>
          { isLoading ? loading : foodData.map((recipe, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              id={ recipe.idMeal }
            >
              <input
                type="image"
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img` }
                width="350px"
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
});

const mapDispatchToProps = (dispatch) => ({
  cleanGlobalSearch: (currentSearch) => dispatch(handleCurrentSearch(currentSearch)),
});

MainFoodCard.propTypes = {
  history: PropTypes.shape().isRequired,
  currentSearch: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  cleanGlobalSearch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainFoodCard);
