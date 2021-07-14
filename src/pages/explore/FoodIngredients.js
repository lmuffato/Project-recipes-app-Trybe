import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStateEasyRedux } from 'easy-redux-trybe';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import styles from '../../styles/MainPages.module.scss';
import stylesCards from '../../styles/Cards.module.scss';

function FoodIngredients() {
  const [, setStateRedux] = useStateEasyRedux({ name: 'Search' }, {});
  const history = useHistory();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const { meals } = await response.json();
      const INDEX_END = 12;
      const resultsTwelveItems = meals.slice(0, INDEX_END);
      setStateRedux({ actionType: 'FETCH_COMPLETED_DID_MOUNT', resultsTwelveItems });
    };
    fetchApi();
  }, []);

  const fetchByIngredient = async (ingredient) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );
    const { meals } = await response.json();
    const INDEX_END = 12;
    const resultsTwelveItems = meals.slice(0, INDEX_END);
    await setStateRedux({ actionType: 'FETCH_INGREDIENT_COMPLETED', resultsTwelveItems });
    history.push('/comidas');
  };

  const resultsTwelveItems = useSelector((state) => (
    state.Search ? state.Search.resultsTwelveItems : undefined));

  return (
    <div className={ styles.container }>
      <Header title="Explorar Ingredientes" />
      Os ingredientes das comidas
      <main className={ styles.cardsArea }>
        {resultsTwelveItems && resultsTwelveItems.map(
          (el, index) => (
            <div
              key={ index }
              className={ stylesCards.cardMealDrink }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => fetchByIngredient(el.strIngredient) }
              aria-hidden="true"
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png` }
                alt="Ingredient"
                width="100%"
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>
                { el.strIngredient}
              </p>
            </div>
          ),
        )}
      </main>
      <Footer />
    </div>
  );
}

export default FoodIngredients;
