import { LOADING, LOADING_SUCESS } from '../actions/foodServiceAction';

const initialState = {
  loading: null,
};

export default function foodReducer(state = initialState, action) {
  switch (action.type) {
  case LOADING:
    return { ...state, loading: true };
    // TODO Terminar implementação do caso loading sucess
  case LOADING_SUCESS:
    return { ...state, loading: false };
  default:
    return state;
  }
}
