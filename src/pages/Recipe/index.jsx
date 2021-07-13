import React, { useEffect, useState } from 'react';
import { BiHeart, BiShareAlt } from 'react-icons/bi';

import { useHistory, useParams } from 'react-router-dom';
import HeaderBack from '../../components/HeaderBack';
import { getRecipe } from '../../services/recipesData';

import styles from './styles.module.scss';

function Recipe() {
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    async function loadRecipe() {
      const path = `/${pathname.split('/')[1]}`;
      const result = await getRecipe(path, id);
      setVideoId(result.strYoutube.split('=')[1]);

      const keys = Object.keys(result);
      const ingredientsName = keys.filter((key) => key.includes('strIngredient'));
      const ingredientsMeasure = keys.filter((key) => key.includes('strMeasure'));

      const ingredientsFromApi = ingredientsName.map((ingredient) => {
        const foundIngredient = result[ingredient];
        return foundIngredient;
      });

      const measuresFromApi = ingredientsMeasure.map((measure) => {
        const foundMeasure = result[measure];
        return foundMeasure;
      });

      let ingredients = {};

      ingredientsFromApi.forEach((ingredient, index) => {
        ingredients = { ...ingredients, [ingredient]: measuresFromApi[index] };
      });

      ingredients = Object.entries(ingredients).reduce(
        (allIngredients, [ingredient, measure]) => {
          if (ingredient && measure) {
            return [
              ...allIngredients,
              `${ingredient} - ${measure}`,
            ];
          }

          return allIngredients;
        }, [],
      );
      setRecipe({ ...result, ingredients });
    }

    loadRecipe();
  }, [pathname, id]);

  return (
    <div className={ styles.recipe }>
      <HeaderBack title={ recipe.name || 'Recipe' } />
      <div className={ styles.header }>
        <img src={ recipe.imagePath } alt={ recipe.name } />
        <div className={ styles.options }>
          <BiHeart />
          <BiShareAlt />
        </div>
      </div>
      <main>
        <button type="button" className={ styles.startRecipe }>Iniciar receita</button>
        <h1>{ recipe.name }</h1>
        <h3>{ recipe.strCategory }</h3>
        <section>
          <h2>Ingredients</h2>
          { recipe.ingredients && recipe.ingredients.map((ingredient) => (
            <li key={ ingredient }>{ ingredient }</li>
          )) }
        </section>
        <section>
          <h2>Intructions</h2>
          <p>{ recipe.strInstructions }</p>
        </section>
        <section>
          <h2>Video</h2>
          <iframe
            src={ `https://www.youtube.com/embed/${videoId}` }
            title={ `Instructions of ${recipe.name}` }
            frameBorder="0"
            allow="accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture"
            allowFullScreen
          />
        </section>
        <section>
          <h2>Recomendadas</h2>
        </section>
      </main>
    </div>
  );
}

export default Recipe;
