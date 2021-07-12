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
    this.renderCurrentSearch = this.renderCurrentSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { currentSearch } = this.props;
    if (currentSearch.length !== 0) {
      this.renderCurrentSearch();
    } else {
      this.FilterCategoryDrink();
      this.loadingDrinkCategories();
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
        console.log();
        const result = allDrinks.drinks.slice(0, limitNumber);
        this.setState({
          drinkData: result,
          isLoading: false,
        });
      });
  }

  async renderCurrentSearch() {
    const { currentSearch, typeRecipe, history } = this.props;
    const endpoints = {
      name: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${currentSearch}`,
      ingrendient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${currentSearch}`,
      firstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${currentSearch}`,
    };
    const erroMsg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    if (typeRecipe) {
      const chosenEnpoint = endpoints[typeRecipe];
      const request = await fetch(chosenEnpoint)
        .then((response) => response.json())
        .catch((err) => {
          console.log(err);
          // eslint-disable-next-line no-alert
          return { [typeRecipe]: null };
        });
      if (request.drinks === undefined || request.drinks === null) {
        // eslint-disable-next-line no-alert
        return alert(erroMsg);
      }
      const limit = 12;
      const data = request.drinks;
      const sliced = data.slice(0, limit);
      this.setState({
        drinkData: sliced,
        isLoading: false,
      });
      if (data.length === 1) {
        const idRecipe = sliced[0].idDrink;
        console.log(idRecipe);
        return history.push(`/bebidas/${idRecipe}`);
      }
    }
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
  typeRecipe: state.recipe.typeRecipe,
});

const mapDispatchToProps = (dispatch) => ({
  cleanGlobalSearch: (currentSearch) => dispatch(handleCurrentSearch(currentSearch)),
});

MainDrinkCard.propTypes = {
  history: PropTypes.shape().isRequired,
  currentSearch: PropTypes.node.isRequired,
  cleanGlobalSearch: PropTypes.func.isRequired,
  typeRecipe: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainDrinkCard);
