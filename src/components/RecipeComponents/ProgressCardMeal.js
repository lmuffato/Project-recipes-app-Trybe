// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import ShareBtn from './ShareButton';
// import FavBtn from './FavoriteButton';
// import RecipeImage from './RecipeImage';
// import RecipeTitle from './RecipeTitle';
// import RecipeCatg from './RecipeCategory';
// import RecipeInst from './RecipeInstructions';

// function ProgressCardMeal({ recipe }) {
//   const { meals } = recipe;
//   const { idMeal, strArea, strCategory, strMeal,
//     strMealThumb, strInstructions } = meals[0];
//   const [ingredientList, setIngredientList] = useState([]);

//   const filterIngredients = (recipeItems) => Object.entries(recipeItems)
//     .filter(([name, value]) => name.includes('Ingredient') && value);

//   const currentInfo = {
//     id: idMeal,
//     type: 'comida',
//     area: strArea,
//     category: strCategory || '',
//     alcoholicOrNot: '',
//     name: strMeal,
//     image: strMealThumb,
//     instructions: strInstructions,
//     ingredients: filterIngredients(recipe.meals[0]),
//   };

//   useEffect(() => {
//     const object = { meals: { [meals[0].idMeal]: ingredientList } };
//     localStorage.setItem('inProgressRecipes', JSON.stringify(object));
//   }, [ingredientList, meals]);

//   const markAsDone = ({ target }) => {
//     const { parentNode, value } = target;
//     if (parentNode.style.textDecoration !== 'line-through') {
//       parentNode.style.textDecoration = 'line-through';
//       const lsRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
//       if (meals) {
//         Object.keys(lsRecipe.meals).forEach((id) => {
//           if (id === meals[0].idMeal) {
//             setIngredientList((state) => [...state, Number.parseInt(value, 10)]);
//           }
//         });
//       }
//     } else {
//       parentNode.style.textDecoration = 'none';
//     }
//   };

//   const listIngredients = (ingredients) => (
//     <ol>
//       {ingredients.map((ingredient, key) => (
//         <li key={ key }>
//           <label
//             htmlFor={ `ingredient${key}` }
//             data-testid={ `${key}-ingredient-step` }
//           >
//             {ingredient[1]}
//             <input
//               id={ `ingredient${key}` }
//               value={ key }
//               type="checkbox"
//               onClick={ markAsDone }
//             />
//           </label>
//         </li>))}
//     </ol>
//   );

// if (recipe.drinks) {
//   const { idDrink, strCategory, strAlcoholic,
//     strDrink, strDrinkThumb, strInstructions } = recipe.drinks[0];
//   currentInfo = {
//     id: idDrink,
//     type: 'bebida',
//     area: '',
//     category: strCategory || '',
//     alcoholicOrNot: strAlcoholic,
//     name: strDrink,
//     image: strDrinkThumb,
//     instructions: strInstructions,
//     ingredients: filterIngredients(recipe.drinks[0]),
//   };
// } else {
// }
//   return (
//     <div className="recipe_details">
//       <RecipeImage origin={ currentInfo.image } />
//       <RecipeTitle title={ currentInfo.name } />
//       <ShareBtn />
//       <FavBtn info={ currentInfo } />
//       <RecipeCatg category={ `${currentInfo.category} ${currentInfo.alcoholicOrNot}` } />
//       <h3>Ingredientes</h3>
//       {listIngredients(currentInfo.ingredients)}
//       <h3>Instruções</h3>
//       <RecipeInst instructions={ currentInfo.instructions } />
//       <button
//         data-testid="finish-recipe-btn"
//         type="button"
//         disabled
//       >
//         Finalizar Receita

//       </button>
//     </div>
//   );
// }

// ProgressCardMeal.propTypes = {
//   recipe: PropTypes.objectOf(PropTypes.any),
// }.isRequired;

// export default ProgressCardMeal;
