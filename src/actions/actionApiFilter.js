export const HANDLE_CLICK_INGREDIENTE = 'HANDLE_CLICK_INGREDIENTE';
export const HANDLE_CLICK_NOME = 'HANDLE_CLICK_NOME';
export const HANDLE_CLICK_PRIMEIRA_LETRA = 'HANDLE_CLICK_PRIMEIRA_LETRA';

export const actioOfIngredient = (payload) => ({
  type: HANDLE_CLICK_INGREDIENTE,
  payload,
});

export const actionOfNome = (payload) => ({
  type: HANDLE_CLICK_NOME,
  payload,
});

export const actionOfPrimeiraLetra = (payload) => ({
  type: HANDLE_CLICK_PRIMEIRA_LETRA,
  payload,
});

const requestApiOfIngrediente = async (value) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
  const api = await fetch(endpoint);
  const jsonTreatment = api.json();
  return jsonTreatment;
};

const requestApiOfName = async (value) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
  const api = await fetch(endpoint);
  const jsonTreatment = api.json();
  return jsonTreatment;
};

const requestApiOfPrimeiraLetra = async (value) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
  const api = await fetch(endpoint);
  const jsonTreatment = api.json();
  return jsonTreatment;
};

export const tunkIngrediente = () => async (dispatch) => {
  const getApi = await requestApiOfIngrediente();
  dispatch(actioOfIngredient(getApi));
};

export const tunkName = () => async (dispatch) => {
  const getApi = await requestApiOfName();
  dispatch(actionOfNome(getApi));
};

export const tunkPrimeiraLetra = () => async (dispatch) => {
  const getApi = await requestApiOfPrimeiraLetra();
  dispatch(actionOfPrimeiraLetra(getApi));
};
