export const ACTION_LOGIN = 'ACTION_LOGIN';
export const ACTION_SEARCH = 'ACTION_SEARCH';
export const ACTION_DETAILS = 'ACTION_DRINK_DETAILS';
export const ACTION_MAIN_FOOD_LIST = 'ACTION_MAIN_FOOD_LIST';
export const ACTION_MAIN_DRINK = 'ACTION_MAIN_DRINK';

export const actionLogin = (email, password) => ({
  type: ACTION_LOGIN,
  email,
  password,
});

export const actionSearch = (value) => ({
  type: ACTION_SEARCH,
  data: value,
});

export const requestInitialMeals = (mealsList) => ({
  type: ACTION_MAIN_FOOD_LIST,
  mealsList,
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
    if (currentPage === 'comidas') {
      dispatch(actionSearch(data.meals));
    } else {
      dispatch(actionSearch(data.drinks));
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
