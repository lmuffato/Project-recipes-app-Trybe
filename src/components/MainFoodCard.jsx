import React from 'react';
import PropTypes from 'prop-types';

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
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // const { history: { location: { pathname } } } = this.props;
    // if (pathname !== '/comidas') {
    //   this.FilterCategoryFood();
    //   this.loadingFoodCategories();
    // }

    this.FilterCategoryFood();
    this.loadingFoodCategories();
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

MainFoodCard.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default MainFoodCard;

// o clique de pesquisar(ou no card ingredientes) dispara a action pro global com  dizendo "tem uma pesquisa corrente"
// setta no global o resultado do fetch de pesquisa

// REFACTOR MAIN PAGE
// componente mainfoodcard lê essa chave do state global no didmount
// e condiciona sua renderização natural (12 cards random) ou (se houver pesquisa corrente) prioriza pesquisa do global
// no didmount da main page - action para limpar o global de pesquisa corrente

// -- COMPONENTE SEARCH BUTTON
// resolver bugzinho renderização dos inputs - verificar updates Will -
// refactor onde precisa no componente search bar pra receber a logica de disptach da pesquisa
// verificar lógica do length = 1 redirect p/ detalhes

// settar o reducer/actions - DONE
// settar o disparo action nas pag explorar ingredientes - DONE
