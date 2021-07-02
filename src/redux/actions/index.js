export const ACTION_LOGIN = 'ACTION_LOGIN';
export const ACTION_SEARCH = 'ACTION_SEARCH';
export const ACTION_DETAILS = 'ACTION_DRINK_DETAILS';

export const actionLogin = (email, password) => ({
  type: ACTION_LOGIN,
  email,
  password,
});

export const actionSearch = (value, item) => ({
  type: ACTION_SEARCH,
  data: value,
  item,
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
      dispatch(actionSearch(data.meals, 'meals'));
    } else {
      dispatch(actionSearch(data.drinks, 'drinks'));
    }
  } catch (error) {
    dispatch(actionSearch('error'));
  }
};

export const fetchById = (currentPage, id) => async (dispatch) => {
  let url = '';
  if (currentPage === 'comidas') {
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  } else {
    url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (currentPage === 'comidas') {
      dispatch(actionDetails(data.meals));
    } else {
      dispatch(actionDetails(data.drinks));
    }
  } catch (error) {
    dispatch(actionDetails('error'));
  }
};

// export const fetchMealById = (id) => async (dispatch) => {
//   const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     dispatch(actionMealDetails(data.meals));
//   } catch (error) {
//     dispatch(actionMealDetails('error'));
//   }
// };

// export const fetchDrinkById = (id) => async (dispatch) => {
//   const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     dispatch(actionDrinkDetails(data.drinks));
//   } catch (error) {
//     dispatch(actionDrinkDetails('error'));
//   }
// };
