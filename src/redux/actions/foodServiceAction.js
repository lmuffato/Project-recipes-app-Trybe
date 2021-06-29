import fetchAPI from '../fetchAPI';

export const LOADING = 'LOADING';
export const LOADING_SUCESS = 'LOADING_SUCESS';

const loading = () => ({
  type: LOADING,
});
const loadingSucessful = (payload) => ({
  type: LOADING_SUCESS,
  payload,
});

function getFoodAPIThunk(URL) {
  return async (dispatch) => {
    dispatch(loading());
    const response = await fetchAPI(URL);
    try {
      dispatch(loadingSucessful(response));
    } catch (e) {
      console.error(e);
      dispatch(loadingFailed(e));
    }
  };
}

export default getFoodAPIThunk;
