import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function EmProgresso({ props }) {
  const [data, setData] = useState({});
  const [instructArray, setInstructArray] = useState([]);

  const magicNumber = 0;

  const fetchData = () => {
    setData(props[magicNumber]);
  };

  useEffect(() => {
    fetchData();
  }, [props]);

  const verifyLocalStorage = () => {
    const progressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'));

    if (progressRecipes !== null) {
      const { cocktails, meals } = progressRecipes;
      // console.log(target);
      console.log(cocktails);
    }
  };

  useEffect(() => {
    // verifyLocalStorage();
  }, []);

  if (!data) return <h1>Loading...</h1>;

  const ingredients = Object.entries(data)
    .filter((item) => item[0].includes('Ingredient'))
    .filter((element) => element[1] !== '' && element[1] !== null);

  const localSTSettings = (target) => {
    // console.log(ingredients[target.id]);
    // console.log(searchItem.idDrink);
    const progressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'));
    // console.log(progressRecipes);
    const foodsOrCocktails = Object.keys(data)
      .find((item) => item === 'idDrink' || item === 'idMeal');

    // const teste = ingredients.filter((item) => item === ingredients[target.id]);
    // console.log(teste);

    setInstructArray([...instructArray, ingredients[target.id][1]]);
    console.log(instructArray);
    if (foodsOrCocktails === 'idMeal') {
      localStorage
        .setItem(
          'inProgressRecipes', JSON
            .stringify({
              meals: {
                [data.idMeal]: [...instructArray, ingredients[target.id][1]],
              } }),
        );
    } else {
      localStorage
        .setItem(
          'inProgressRecipes', JSON
            .stringify({
              cocktails: {
                [data.idDrink]: [...instructArray, ...ingredients[target.id][1]],
              } }),
        );
    }
  };

  const isCheckedBool = ({ target }) => {
    if (target.nextSibling.className === '') {
      target.nextSibling.className = 'isCheckedCss';
      const isChecked = target.nextSibling.className;
      localSTSettings(target);
      return isChecked;
    }
    target.nextSibling.className = '';
    const notChecked = target.nextSibling.className;
    return notChecked;
  };

  return (
    <div className="m-1 pb-4">
      <div className="d-flex flex-column">
        <img
          data-testid="recipe-photo"
          src={ data.strMealThumb || data.strDrinkThumb }
          alt="meals-img"
          width="350px"
          height="auto"
        />
        <div className="py-4">
          <h2 data-testid="recipe-title">{ data.strMeal || data.strDrink }</h2>
        </div>
        <div className="p-2">
          <button type="button" data-testid="share-btn">Compartilhar</button>
          <button type="button" data-testid="favorite-btn">Favoritar</button>
        </div>
        <div className="py-2">
          <h3 data-testid="recipe-category">{ data.strCategory }</h3>
        </div>
        { ingredients.map((ingredient, index) => (
          <div
            key={ index }
            className="d-flex align-items-baseline"
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              className="mr-2"
              type="checkbox"
              id={ index }
              onClick={ isCheckedBool }
            />
            <label
              htmlFor={ index }
            >
              {`Ingrediente ${index}: ${ingredient[1]}`}
            </label>
          </div>
        ))}
        <div className="py-2">
          <h4>Instruções</h4>
        </div>
        <p
          data-testid="instructions"
          className="text-justify"
        >
          { data.strInstructions }
        </p>
        <Link to="/receitas-feitas" className="align-self-center w-50">
          <button type="button" data-testid="finish-recipe-btn" className="w-100 py-3">
            Finalizar
          </button>
        </Link>
      </div>
    </div>
  );
}

EmProgresso.propTypes = {
  props: object,
}.isRequired;

export default EmProgresso;
