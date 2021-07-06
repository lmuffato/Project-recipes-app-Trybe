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

export const handleTypeRecipe = (type, id) => ({
  type: HANDLE_INFO_RECIPE,
  payload: {
    id,
    type,
  },
});
