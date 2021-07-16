import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import InferiorMenu from '../components/InferiorMenu';

export default function FoodByIngredient() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const mealResults = async () => {
      const mealIngredients = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const responseApi = await mealIngredients.json();
      const { meals } = responseApi;
      // const mealImages = await fetch('https://www.themealdb.com/images/ingredients/{nome-do-ingrediente}.png');
      // const responseImgApi = await mealImagens.json();
      const indexMeals = 12;
      const twelveIngredients = meals.slice(0, indexMeals);
      console.log(twelveIngredients);
      setIngredients(twelveIngredients);
    };
    mealResults();
  }, []);

  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Explorar Ingredientes</h1>
      </Header>
      <section>
        { ingredients.map((el, index) => (
          <div
            data-testid={ `${index}-ingredient-card` }
            key={ el.idIngredient }
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
