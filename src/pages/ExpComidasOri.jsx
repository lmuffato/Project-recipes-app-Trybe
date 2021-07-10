import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ExpComidasOri extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      countries: '',
      foodData: {},
      CardIsLoading: true,
    };
    this.filterOrigins = this.filterOrigins.bind(this);
    this.FilterCategoryFood = this.FilterCategoryFood.bind(this);
    this.selectingCountry = this.selectingCountry.bind(this);
  }

  componentDidMount() {
    this.filterOrigins();
    this.FilterCategoryFood();
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
          CardIsLoading: false,
        });
      });
  }

  async filterOrigins() {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const allMeals = await fetch(URL).then((response) => response.json());
    this.setState({
      countries: allMeals.meals,
      isLoading: false,
    });
  }

  async selectingCountry() {
    const gettingCountry = document.querySelector('select').value;
    if (gettingCountry === 'All') {
      this.FilterCategoryFood();
    } else {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${gettingCountry}`;
      const limitNumber = 12;
      fetch(URL)
        .then((response) => response.json())
        .then((allMeals) => {
          const result = allMeals.meals.slice(0, limitNumber);
          console.log(gettingCountry);
          this.setState({
            foodData: result,
            CardIsLoading: false,
          });
        });
    }
  }

  render() {
    const { history } = this.props;
    const { isLoading, countries, CardIsLoading, foodData } = this.state;
    const loading = (<h1>Carregando...</h1>);
    return (
      <>
        <Header title="Explorar Origem" />
        <div>Página de explorar Comidas por origem</div>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => this.selectingCountry(e) }
        >
          <option data-testid="All-option">All</option>
          { isLoading ? '' : countries.map((country) => (
            <option
              key={ country.strArea }
              data-testid={ `${country.strArea}-option` }
            >
              { country.strArea }
            </option>))}
        </select>
        { CardIsLoading ? loading : foodData.map((recipe, index) => (
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
        <Footer history={ history } />
      </>
    );
  }
}

ExpComidasOri.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExpComidasOri;
