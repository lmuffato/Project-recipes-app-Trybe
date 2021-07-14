import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStateEasyRedux } from 'easy-redux-trybe';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import styles from '../../styles/MainPages.module.scss';
import stylesCards from '../../styles/Cards.module.scss';

function DrinkIngredients() {
  const [, setStateRedux] = useStateEasyRedux({ name: 'Search' }, {});
  const history = useHistory();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const { drinks } = await response.json();
      const INDEX_END = 12;
      const resultsTwelveItems = drinks.slice(0, INDEX_END);
      setStateRedux({ actionType: 'FETCH_COMPLETED_DID_MOUNT', resultsTwelveItems });
    };
    fetchApi();
  }, []);

  const fetchByIngredient = async (ingredient) => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );
    const { drinks } = await response.json();
    const INDEX_END = 12;
    const resultsTwelveItems = drinks.slice(0, INDEX_END);
    await setStateRedux({ actionType: 'FETCH_INGREDIENT_COMPLETED', resultsTwelveItems });
    history.push('/bebidas');
  };

  const resultsTwelveItems = useSelector((state) => (
    state.Search ? state.Search.resultsTwelveItems : undefined));

  return (
    <div className={ styles.container }>
      <Header title="Explorar Ingredientes" />
      Os ingredientes das bebidas
      <main className={ styles.cardsArea }>
        {resultsTwelveItems && resultsTwelveItems.map(
          (el, index) => (
            <div
              key={ index }
              className={ stylesCards.cardMealDrink }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => fetchByIngredient(el.strIngredient1) }
              aria-hidden="true"
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${el.strIngredient1}-Small.png` }
                alt="Ingredient"
                width="100%"
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>
                { el.strIngredient1}
              </p>
            </div>
          ),
        )}
      </main>
      <Footer />
    </div>
  );
}

export default DrinkIngredients;
