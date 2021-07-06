import React from 'react';

class CategoryButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categories: {},
    //   drinkOrFood: '',
    //   data: {},
    };
    this.loadingFoodCategories = this.loadingFoodCategories.bind(this);
    this.loadingDrinkCategories = this.loadingDrinkCategories.bind(this);
    // this.FilterCategoryFood = this.FilterCategoryFood.bind(this);
    // this.FilterCategoryDrinks = this.FilterCategoryDrinks.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const checkpage = document.querySelector('h1');
    if (checkpage.innerText === 'Comidas') {
      this.loadingFoodCategories();
    } else {
      this.loadingDrinkCategories();
    }
  }

  // handleClick(e) {
  //   this.setState({
  //     loading: true,
  //   });
  //   const category = e.target.innerText;
  //   const { drinkOrFood } = this.state;
  //   if (drinkOrFood === 'food') {
  //     this.FilterCategoryFood(category);
  //   } else {
  //     this.FilterCategoryDrinks(category);
  //   }
  // }

  loadingFoodCategories() {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const limitNumber = 5;
    fetch(URL)
      .then((response) => response.json())
      .then((allFoods) => {
        const result = allFoods.meals.slice(0, limitNumber);
        this.setState({
          loading: false,
          categories: result,
        //   drinkOrFood: 'food',
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
          loading: false,
          categories: result,
        //   drinkOrFood: 'drink',
        });
      });
  }

  //   FilterCategoryDrinks(props) {
  //     const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${props}`;
  //     const limitNumber = 12;
  //     fetch(URL)
  //       .then((response) => response.json())
  //       .then((allDrinks) => {
  //         const result = allDrinks.drinks.slice(0, limitNumber);
  //         this.setState({
  //           data: result,
  //           isLoading: false,
  //         });
  //       });
  //   }

  //   FilterCategoryFood(props) {
  //     const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${props}`;
  //     const limitNumber = 12;
  //     fetch(URL)
  //       .then((response) => response.json())
  //       .then((allFoods) => {
  //         const result = allFoods.meals.slice(0, limitNumber);
  //         this.setState({
  //           data: result,
  //           isLoading: false,
  //         });
  //       });
  //   }

  render() {
    const { loading, categories } = this.state;
    return (
      (loading ? '' : categories.map((item, index) => (
        <>
          <button
            type="button"
            key="All"
          >
            All
          </button>
          <button
            type="button"
            key={ index }
            data-testid={ `${item.strCategory}-category-filter` }
            // onClick={ (e) => this.handleClick(e) }
          >
            {item.strCategory}
          </button>
        </>))
      ));
  }
}

export default CategoryButtons;
