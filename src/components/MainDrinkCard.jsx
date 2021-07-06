import React from 'react';
import PropTypes from 'prop-types';

class MainDrinkCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkData: {},
      isLoading: true,
    };
    this.FilterCategoryDrink = this.FilterCategoryDrink.bind(this);
  }

  componentDidMount() {
    this.FilterCategoryDrink();
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
    const { history } = this.props;
    const { drinkData, isLoading } = this.state;
    const loading = (<h1>Carregando...</h1>);
    return (
      <div>
        { isLoading ? loading : drinkData.map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <input
              type="image"
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid={ `${index}-card-img` }
              onClick={ () => history.push(`bebidas/${recipe.idDrink}`) }
            />
            <h6 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h6>
          </div>
        ))}
      </div>
    );
  }
}

MainDrinkCard.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default MainDrinkCard;
