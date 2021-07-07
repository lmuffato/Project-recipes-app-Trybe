import React from 'react';

class MainDrinkCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkData: {},
      isLoading: true,
      isCharging: true,
      isSelected: '',
      categories: {},
    };
    this.FilterCategoryDrink = this.FilterCategoryDrink.bind(this);
    this.FilterCategoryDrinks = this.FilterCategoryDrinks.bind(this);
    this.loadingDrinkCategories = this.loadingDrinkCategories.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.FilterCategoryDrink();
    this.loadingDrinkCategories();
  }

  handleClick(e) {
    const category = e.target.innerText;
    const { isSelected } = this.state;
    if (category === 'All' || category === isSelected) {
      this.setState({
        isSelected: 'All',
      });
      this.FilterCategoryDrink();
    } else {
      this.setState({
        isSelected: category,
      });
      this.FilterCategoryDrinks(category);
    }
  }

  FilterCategoryDrinks(props) {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${props}`;
    const limitNumber = 12;
    fetch(URL)
      .then((response) => response.json())
      .then((allDrinks) => {
        const result = allDrinks.drinks.slice(0, limitNumber);
        this.setState({
          drinkData: result,
          isLoading: false,
        });
      });
  }

  loadingDrinkCategories() {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const limitNumber = 5;
    fetch(URL)
      .then((response) => response.json())
      .then((allDrinks) => {
        const result = allDrinks.drinks.slice(0, limitNumber);
        this.setState({
          isCharging: false,
          categories: result });
      });
  }

  async FilterCategoryDrink() {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const limitNumber = 12;
    fetch(URL)
      .then((response) => response.json())
      .then((allDrinks) => {
        const result = allDrinks.drinks.slice(0, limitNumber);
        this.setState({
          drinkData: result,
          isLoading: false,
        });
      });
  }

  render() {
    const { drinkData, isLoading, categories, isCharging } = this.state;
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
          { isLoading ? loading : drinkData.map((recipe, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              id={ recipe.idDrink }
            >
              <img
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h6 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h6>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default MainDrinkCard;
