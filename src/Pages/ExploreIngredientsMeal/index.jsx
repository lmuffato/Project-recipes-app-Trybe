import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Loading from '../../Components/Loading';
import { fetchMealsIngredients, fetchByMealIngredien } from '../../services/fetchRecipes';
import RecipesContext from '../../context/RecipesContext';
import './styles.css';

function ExploreIngredientsMeal() {
  const { updateData } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    const result = await fetchMealsIngredients();
    const arrayMAX = 12;
    setIngredients(result.meals.slice(0, arrayMAX));
  };

  const { pathname } = useLocation();

  useEffect(() => {
    getIngredients();
  }, []);

  const handleClick = (ingredient) => {
    updateData(fetchByMealIngredien(ingredient));
  };

  if (!ingredients.length) return <Loading />;

  return (
    <section>
      <Header>Explorar Ingredientes</Header>
      <div className="grid">
        { ingredients.map(({ strIngredient }, index) => (
          <Link
            to={ {
              pathname: '/comidas',
              state: { previousPath: pathname, ingredient: strIngredient },
            } }
            className="card"
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleClick(strIngredient) }
            key={ `${strIngredient}-explore` }
          >
            <Card.Img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              alt={ strIngredient }
            />
            <Card.Body>
              <Card.Title
                className="card-name"
                data-testid={ `${index}-card-name` }
              >
                { strIngredient }
              </Card.Title>
            </Card.Body>
          </Link>))}
        <Footer />
      </div>
    </section>
  );
}
export default ExploreIngredientsMeal;
