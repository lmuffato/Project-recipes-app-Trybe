import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleCurrentSearch } from '../actions';

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
    const { currentSearch } = this.props;
    if (currentSearch.length > 1) {
      this.renderCurrentSearch();
    } else {
      this.FilterCategoryDrink();
      this.loadingDrinkCategories();
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
        console.log(result);
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

  renderCurrentSearch() {
    const { currentSearch } = this.props;
    this.setState({
      isLoading: false,
      drinkData: currentSearch,
    });
  }

  render() {
    const { history } = this.props;
    const { drinkData, isLoading, categories, isCharging } = this.state;
    const loading = (<h1>Carregando...</h1>);
    console.log(this);
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
              <input
                type="image"
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                data-testid={ `${index}-card-img` }
                width="350px"
                onClick={ () => history.push(`/bebidas/${recipe.idDrink}`) }
              />
              <h6 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h6>
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

MainDrinkCard.propTypes = {
  history: PropTypes.shape().isRequired,
  currentSearch: PropTypes.shape().isRequired,
  cleanGlobalSearch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainDrinkCard);
