// pagina actions
export const HANDLE_CHANGE_USER = 'HANDLE_CHANGE_USER';

export const handleChangeUser = (name, value) => ({
  type: HANDLE_CHANGE_USER,
  payload: {
    name,
    value,
  },
});

export const HANDLE_INFO_RECIPE = 'HANDLE_TYPE_RECIPE';
export const HANDLE_CURRENT_SEARCH = 'HANDLE_CURRENT_SEARCH';

/* export const handleTypeRecipe = (typeRecipe) => ({
  type: HANDLE_INFO_RECIPE,
  typeRecipe,
}); */

export const handleCurrentSearch = (currentSearch, typeRecipe) => ({
  type: HANDLE_CURRENT_SEARCH,
  payload: {
    currentSearch,
    typeRecipe,
  },
});
