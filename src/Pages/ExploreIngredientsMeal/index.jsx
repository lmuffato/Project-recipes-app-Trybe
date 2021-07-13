import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { fetchMealsIngredients, fetchByMealIngredien } from '../../services/fetchRecipes';
import RecipesContext from '../../context/RecipesContext';
import './styles.css';

function ExploreIngredientsMeal() {
  const { updateData } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const getIngredients = async () => {
    const result = await fetchMealsIngredients();
    const arrayMAX = 12;
    setIngredients(result.meals.slice(0, arrayMAX));
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const handleClick = (ingredient) => {
    updateData(fetchByMealIngredien(ingredient))
      .then(() => setShouldRedirect(true));
  };

  if (!ingredients.length) return <div>Loading...</div>;
  if (shouldRedirect) return <Redirect to="/comidas" />;

  return (
    <section>
      <Header>Ingredientes</Header>
      <div className="grid">
        { ingredients.map(({ strIngredient }, index) => (
          <button
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleClick(strIngredient) }
            key={ strIngredient }
            type="button"
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              alt={ strIngredient }
            />
            <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
          </button>)) }
      </div>
      <Footer />
    </section>

  );
}
export default ExploreIngredientsMeal;
