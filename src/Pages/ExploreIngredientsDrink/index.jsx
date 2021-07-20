import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { fetchDrinkIngredients, fetchIngredients } from '../../services/fetchRecipes';
import RecipesContext from '../../context/RecipesContext';
import './styles.css';

function ExploreIngredientsDrink() {
  const { updateData } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    const result = await fetchDrinkIngredients();
    const arrayMAX = 12;
    setIngredients(result.drinks.slice(0, arrayMAX));
  };

  const { pathname } = useLocation();

  useEffect(() => {
    getIngredients();
  }, []);

  const handleClick = (ingredient) => {
    updateData(fetchIngredients(ingredient));
  };

  if (!ingredients.length) return <div>Loading...</div>;

  return (
    <section>
      <Header>Explorar Ingredientes</Header>
      <div className="grid">
        { ingredients.map(({ strIngredient1 }, index) => (
          <Link
            to={ {
              pathname: '/bebidas',
              state: { previousPath: pathname, ingredient: strIngredient1 },
            } }
            className="card"
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleClick(strIngredient1) }
            key={ `${strIngredient1}-index` }
          >
            <Card.Img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ strIngredient1 }
            />
            <Card.Body>
              <Card.Title
                className="card-name"
                data-testid={ `${index}-card-name` }
              >
                { strIngredient1 }
              </Card.Title>
            </Card.Body>
          </Link>)) }
      </div>
      <Footer />
    </section>

  );
}
export default ExploreIngredientsDrink;
