import React from 'react';
import PropTypes from 'prop-types';

class MainFoodCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodData: {},
      isLoading: true,
    };
    this.FilterCategoryFood = this.FilterCategoryFood.bind(this);
  }

  componentDidMount() {
    this.FilterCategoryFood();
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

  render() {
    const { history } = this.props;
    const { foodData, isLoading } = this.state;
    const loading = (<h1>Carregando...</h1>);
    return (
      <div>
        { isLoading ? loading : foodData.map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <input
              type="image"
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid={ `${index}-card-img` }
              width="270px"
              onClick={ () => history.push(`/comidas/${recipe.idMeal}`) }
            />
            <h6 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h6>
          </div>
        ))}
      </div>
    );
  }
}

MainFoodCard.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default MainFoodCard;
