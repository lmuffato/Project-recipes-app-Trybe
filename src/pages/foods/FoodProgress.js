import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStateEasyRedux } from 'easy-redux-trybe';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { setLocalStorage, getLocalStorage } from '../../helper';
import positions from '../../services/data';
import { checkIngredients } from '../../services/functions';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import styles from '../../styles/DetailsPages.module.scss';

function setRecipeStorage(id) {
  const mealProgress = getLocalStorage('inProgressRecipes');

  if (!mealProgress) {
    const storage = localStorage.inProgressRecipes;
    let setInProgressRecipe = {
      meals: {
        [id]: [],
      },
    };
    if (storage && storage.includes('cocktails')) {
      const drinkInProgress = getLocalStorage('inProgressRecipes').cocktails;
      setInProgressRecipe = {
        meals: {
          [id]: [],
        },
        cocktails: drinkInProgress,
      };
    }
    setLocalStorage('inProgressRecipes', setInProgressRecipe);
  }
}

function FoodProgress(props) {
  const { match: { params: { id } } } = props;

  const history = useHistory();
  const [recipeRedux, setRecipeRedux] = useStateEasyRedux({ name: 'FoodProgress' }, {});
  const [copyUrl, setCopyUrl] = useStateEasyRedux({ name: 'copyFood' }, {});
  const [favoriteRecipe, setFavoriteRecipe] = useStateEasyRedux(
    { name: 'favoriteRecipe' }, {},
  );

  setRecipeStorage(id);

  useEffect(() => {
    const fetchRecipe = async () => {
      const requestFood = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

      const dataFood = await requestFood;

      const resultFood = await dataFood.json();
      const responseFood = resultFood.meals;

      setRecipeRedux({ actionType: 'FETCH_FOOD_IN_PROGRESS',
        ingredientsList: getLocalStorage('inProgressRecipes').meals[id],
        recipeIsDone: false,
        responseFood,
      });
      setCopyUrl({ actionType: 'COPY_URL', copyRecipe: false });
      const getRecipe = getLocalStorage('favoriteRecipes');
      const resultGet = getRecipe && getRecipe.some((element) => element.id === id);
      setFavoriteRecipe({ actionType: 'FAVORITE_RECIPE', favorite: resultGet });
    };
    fetchRecipe();
  }, []);

  const { responseFood, ingredientsList, recipeIsDone } = recipeRedux;
  const { copyRecipe } = copyUrl;
  const { favorite } = favoriteRecipe;

  const copyUrlLink = () => {
    const currentURL = window.location.href.toString();
    const splitURL = currentURL.split('/in-progress');
    copy(splitURL[0]);
    setCopyUrl({ copyRecipe: true });
    const time = 2000;
    setTimeout(() => {
      setCopyUrl({ copyRecipe: false });
    }, time);
  };

  const clickFavorite = ({ idMeal, strArea, strCategory, strMeal, strMealThumb }) => {
    if (!favorite) {
      const favoriteRecipeObj = [{
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      }];
      setLocalStorage('favoriteRecipes', favoriteRecipeObj);
    } else {
      const removeFavorite = getLocalStorage('favoriteRecipes')
        .filter((el) => el.id !== idMeal);
      setLocalStorage('favoriteRecipes', removeFavorite);
    }
    setFavoriteRecipe({ favorite: !favorite });
  };

  const recipeProgress = (newProg, action) => {
    const storage = localStorage.inProgressRecipes;
    let setInProgressRecipe = {
      meals: {
        [id]: newProg,
      },
    };
    if (storage && storage.includes('cocktails')) {
      const drinkInProgress = getLocalStorage('inProgressRecipes').cocktails;
      setInProgressRecipe = {
        meals: {
          [id]: newProg,
        },
        cocktails: drinkInProgress,
      };
    }
    setLocalStorage('inProgressRecipes', setInProgressRecipe);
    setRecipeRedux({ actionType: action,
      ingredientsList: newProg,
    });
  };

  const handleCheck = ({ target }) => {
    const { checked } = target;
    const ingredient = (target.id.split('Ingredient'))[1];
    const ingredientDiv = target.parentNode;
    const currentProgress = [...ingredientsList, ingredient];
    const howManyIngredients = ingredientDiv.parentNode.childElementCount;
    if (checked && currentProgress.length === howManyIngredients) {
      ingredientDiv.style.textDecoration = 'line-through';
      recipeProgress(currentProgress, 'CHECK_INGREDIENT');
      setRecipeRedux({ actionType: 'ENABLE_FINISH_BUTTON',
        recipeIsDone: true,
      });
    } else if (checked) {
      ingredientDiv.style.textDecoration = 'line-through';
      recipeProgress(currentProgress, 'CHECK_INGREDIENT');
    } else {
      ingredientDiv.style.textDecoration = '';
      const removeIngredient = currentProgress.filter((ings) => ings !== ingredient);
      recipeProgress(removeIngredient, 'UNCHECK_INGREDIENT');
      setRecipeRedux({
        recipeIsDone: false,
      });
    }
  };

  const isChecked = (index) => {
    const storedMealProgress = getLocalStorage('inProgressRecipes').meals[id];
    return storedMealProgress.includes(String(index));
  };

  return (
    <div>
      {responseFood && responseFood.map(
        (el) => (
          <div className={ styles.areaRecipe } key={ el.idMeal }>
            <img
              src={ el.strMealThumb }
              alt={ el.strMeal }
              data-testid="recipe-photo"
              className={ styles.imgThumb }
            />
            <div className={ styles.containerContent }>
              {copyRecipe && <span className={ styles.copyUrl }>Link copiado!</span>}
              <div className={ styles.headerContent }>
                <h1 data-testid="recipe-title">{ el.strMeal }</h1>
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ () => copyUrlLink() }
                >
                  <img src={ shareIcon } alt="Compartilhar" />
                </button>
                <button
                  type="button"
                  onClick={ () => clickFavorite(el) }
                  src={ favorite ? blackHeartIcon : whiteHeartIcon }
                  data-testid="favorite-btn"
                >
                  <img
                    src={ favorite ? blackHeartIcon : whiteHeartIcon }
                    alt="Favoritado"
                  />
                </button>
              </div>
              <p data-testid="recipe-category">{ el.strCategory }</p>
              <h3>Ingredients</h3>
              <div>
                {positions
                  .map((position, index) => checkIngredients({ el, position, index },
                    handleCheck,
                    styles.ingredientsCheckbox,
                    isChecked(index)))}
              </div>
              <h3>Instructions</h3>
              <p data-testid="instructions">{ el.strInstructions }</p>
            </div>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              className={ styles.startRecipe }
              disabled={ !recipeIsDone }
              onClick={ () => history.push('/receitas-feitas') }
            >
              Finalizar Receita
            </button>
          </div>
        ),
      )}
    </div>
  );
}

FoodProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default FoodProgress;
