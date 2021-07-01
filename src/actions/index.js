// pagina actions
export const HANDLE_CHANGE_USER = 'HANDLE_CHANGE_USER';
export const HANDLE_CLICK_RADIO_BUTTON = 'HANDLE_CLICK_RADIO_BUTTON';

export const handleChangeUser = (name, value) => ({
  type: HANDLE_CHANGE_USER,
  payload: {
    name,
    value,
  },
});

export const handleClickRadioButton = (payload) => ({
  type: HANDLE_CLICK_RADIO_BUTTON,
  payload,
});

const requestApiOfRecipes = async (value) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
  const api = await fetch(endpoint);
  const jsonTreatment = api.json();
  return jsonTreatment;
};

export const actionTunk = () => async (dispatch) => {
  const getApi = await requestApiOfRecipes();
  dispatch(handleClickRadioButton(getApi));
};
