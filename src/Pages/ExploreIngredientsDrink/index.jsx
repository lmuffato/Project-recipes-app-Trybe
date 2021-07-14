import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { fetchDrinkIngredients, fetchIngredients } from '../../services/fetchRecipes';
import RecipesContext from '../../context/RecipesContext';
import './styles.css';

function ExploreIngredientsDrink() {
  const { updateData } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const getIngredients = async () => {
    const result = await fetchDrinkIngredients();
    const arrayMAX = 12;
    setIngredients(result.drinks.slice(0, arrayMAX));
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const handleClick = (ingredient) => {
    updateData(fetchIngredients(ingredient))
      .then(() => setShouldRedirect(true));
  };

  if (!ingredients.length) return <div>Loading...</div>;
  if (shouldRedirect) return <Redirect to="/bebidas" />;

  return (
    <section>
      <Header>Explorar Ingredientes</Header>
      <div className="grid">
        { ingredients.map(({ strIngredient1 }, index) => (
          <button
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleClick(strIngredient1) }
            key={ strIngredient1 }
            type="button"
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ strIngredient1 }
            />
            <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
          </button>)) }
      </div>
      <Footer />
    </section>

  );
}
export default ExploreIngredientsDrink;
