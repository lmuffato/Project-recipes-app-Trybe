import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import InferiorMenu from '../components/InferiorMenu';
import MealsContext from '../context/MealsContext';

export default function FoodByIngredient() {
  const { setMeals } = useContext(MealsContext);
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const mealResults = async () => {
      const mealIngredients = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const responseApi = await mealIngredients.json();
      const { meals } = responseApi;
      // const mealImages = await fetch('https://www.themealdb.com/images/ingredients/{nome-do-ingrediente}.png');
      // const responseImgApi = await mealImagens.json();
      const indexMeals = 12;
      const twelveIngredients = meals.slice(0, indexMeals);
      setIngredients(twelveIngredients);
    };
    mealResults();
  }, []);

  const fetchingIngredients = async (fingredient) => {
    const choosenMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${fingredient}`);
    const responseApi = await choosenMeal.json();
    await setMeals(responseApi);
    history.push('/comidas');
  };

  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Explorar Ingredientes</h1>
      </Header>
      <section>
        { ingredients.map((el, index) => (
          <div
            onClick={ () => fetchingIngredients(el.strIngredient) }
            data-testid={ `${index}-ingredient-card` }
            key={ el.idIngredient }
            aria-hidden="true"
          >
            <p data-testid={ `${index}-card-name` }>{ el.strIngredient }</p>
            <img
              src={ `https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png` }
              alt=""
              data-testid={ `${index}-card-img` }
            />
          </div>
        )) }
      </section>
      <InferiorMenu />
    </div>
  );
}
