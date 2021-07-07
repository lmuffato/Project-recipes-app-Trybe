import React from 'react';

class MainFoodCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodData: {},
      isLoading: true,
      isCharging: true,
      categories: {},
    };
    this.loadingFoodCategories = this.loadingFoodCategories.bind(this);
    this.FilterCategoryFoods = this.FilterCategoryFoods.bind(this);
    this.FilterCategoryFood = this.FilterCategoryFood.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.FilterCategoryFood();
    this.loadingFoodCategories();
  }

  handleClick(e) {
    const category = e.target.innerText;
    if (category === 'All') {
      this.FilterCategoryFood();
    } else {
      this.FilterCategoryFoods(category);
    }
  }

  async FilterCategoryFood() {
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

  loadingFoodCategories() {
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

  FilterCategoryFoods(props) {
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

  render() {
    const { foodData, isLoading, categories, isCharging } = this.state;
    const loading = (<h1>Carregando...</h1>);
    return (
      <>
        <button
          type="button"
          key="All"
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
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h6 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h6>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default MainFoodCard;
