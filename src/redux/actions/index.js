export const ACTION_LOADING = 'ACTION_LOADING';
export const ACTION_SEARCH = 'ACTION_SEARCH';
export const ACTION_DETAILS = 'ACTION_DRINK_DETAILS';
export const ACTION_MAIN_FOOD_LIST = 'ACTION_MAIN_FOOD_LIST';
export const ACTION_MAIN_DRINK = 'ACTION_MAIN_DRINK';
export const ACTION_DRINKS_CATEGORY = 'ACTION_DRINKS_CATEGORY';
export const ACTION_FOOD_CATEGORY = 'ACTION_FOOD_CATEGORY';

export const actionDrinksCategory = (drinksCategories) => ({
  type: ACTION_DRINKS_CATEGORY,
  drinksCategories,
});

export const actionFoodCategory = (foodCategories) => ({
  type: ACTION_FOOD_CATEGORY,
  foodCategories,
});

export const actionSearch = (value) => ({
  type: ACTION_SEARCH,
  data: value,
});

export const requestRecipies = () => ({
  type: ACTION_LOADING,
});

export const setInitialMeals = (mealsList, showDetails = true) => ({
  type: ACTION_MAIN_FOOD_LIST,
  mealsList,
  showDetails,
});

export const requestInitialDrinks = (drinksList) => ({
  type: ACTION_MAIN_DRINK,
  drinksList,
});

export const actionDetails = (value) => ({
  type: ACTION_DETAILS,
  data: value,
});

export const fetchSearch = (type, text, currentPage) => async (dispatch) => {
  let url = '';
  console.log(type, text, currentPage);
  if (type === 'ingredient') {
    if (currentPage === 'comidas') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`;
    } else {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`;
    }
  }

  if (type === 'name') {
    if (currentPage === 'comidas') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;
    } else {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`;
    }
  }

  if (type === 'first') {
    if (currentPage === 'comidas') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`;
    } else {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`;
    }
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    if (currentPage === 'comidas') {
      await dispatch(actionSearch(data.meals));
    } else {
      await dispatch(actionSearch(data.drinks));
    }
  } catch (error) {
    dispatch(actionSearch('error'));
  }
};

// export const fetchById = (currentPage, id) => async (dispatch) => {
//   let url = '';
//   if (currentPage === 'comidas') {
//     url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
//   } else {
//     url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
//   }

//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     if (currentPage === 'comidas') {
//       dispatch(actionDetails(data.meals));
//     } else {
//       dispatch(actionDetails(data.drinks));
//     }
//   } catch (error) {
//     dispatch(actionDetails('error'));
//   }
// };
