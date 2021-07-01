import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { /* useStore, */ useDispatch, useSelector } from 'react-redux';
// import store from '../store';

function actionCreator() { // action creator
  console.log('entrou na ACTION CREATOR');
  const state = {
    componentName: this.componentName,
    state: this.state,
    hasPermission: this.hasPermission, // ? this.hasPermission : [this.clazzName],
  };
  const type = state.state.actionType
    ? `${state.componentName}/${state.state.actionType}`
    : `${state.componentName}/SET_STATE_CLASS`;
  const result = {
    type, // 'SET_STATE_CLASS' / state.action
    payload: state, // { this.nameClass, this.stateClass }
  };
  console.log(result);
  return result;
}

const actionSetStateClass = (payload) => (
  payload
    ? `${payload.componentName}/SET_STATE_CLASS`
    : 'ERROR'
);

const actionX = (payload) => (
  payload
    ? `${payload.componentName}/${payload.state.actionType}`
    : 'ERROR'
);

export function reducer(state = {}, { type, payload }) {
  console.log('entrou no REDUCER');
  console.log(type, payload);

  switch (type) {
  case actionSetStateClass(payload):
  case actionX(payload):
    if (payload.hasPermission.includes(payload.componentName)) {
      console.log('if dentro de reducer');
    }
    console.log(payload.componentName, payload.componentName, payload.hasPermission);
    return {
      ...state,
      [payload.componentName]: {
        ...payload.state,
        hasPermission: payload.hasPermission,
      },
    };
  case 'ERROR':
    console.error('Não foi possível criar a action');
    return state;
  default:
    return state;
  }
}

export function setStateInRedux() {

}

export const easyReduxDispatchToProps = (dispatchToProps) => ({
  setStateInRedux: (action) => dispatchToProps(action),
});

function EasyRedux(component, initialState, hasPermission = [component.name]) { //  = [clazz.name]
  console.log(hasPermission);
  const componentName = component.name;
  const stateClass = initialState.state;
  const stateHook = initialState;
  const state = stateClass || stateHook;
  // const store = useStore();
  // const dispatch = useDispatch();
  // const useThunkDispatch = () => useDispatch();

  // get initialState() { return this.initialState; };
  // set initialState(value) { this.initialState = value; }

  return {
    componentName,
    state,
    hasPermission,
    // store,
    // dispatch,
    // useThunkDispatch,
    // extra functions
    // easyReduxDispatchToProps,
    setStateInRedux,
    reducer,
    action: actionCreator,
  };
}

// new SetStateInRedux({ name: 'Teste'}, { uhul: 'uhullll'})
export default EasyRedux;

const optionsDefault = {
  // todo options
  combineReducers: false,
  nameReducer: undefined,
};

export const useStateEasyRedux = (clazz, initialState, options = optionsDefault) => {
  const optSelector = (stt) => {
    if (options.nameReducer) console.log('108', stt[options.nameReducer][clazz.name]);
    return options.nameReducer ? stt[options.nameReducer][clazz.name] : stt[clazz.name];
  };
  const selector = useSelector((stt) => optSelector(stt));
  console.log('ESTADO', selector);
  const stateDefault = useMemo(
    () => (selector || initialState), [selector, initialState],
  );
  // console.log(stateDefault)

  const [state, setState] = useState(stateDefault);

  const ref = useRef();
  const dispatch = useDispatch();
  // const useThunkDispatch = () => useDispatch();

  const setLegacyState = useCallback((stt, fnCb) => {
    ref.current = fnCb;
    if (typeof stt === 'function') {
      setState((prevState) => ({ ...prevState, ...stt(prevState) }));
      return;
    }
    if (typeof stt === 'object' && !Array.isArray(stt)) {
      setState((os) => ({ ...os, ...stt }));
      return;
    }
    setState((os) => ({ ...os, [stt]: stt }));
  }, [setState]);

  const stateRedux = useMemo(() => new EasyRedux(clazz, state), [state, clazz]);
  console.log(stateRedux);
  // const getStateRedux = useSelector((stt) => stt.cpnt[stateRedux.componentName]);

  useEffect(() => {
    console.log(stateRedux);
    // fazer verificação se já existe no redux essa informação
    dispatch(stateRedux.action());
    // stateRedux.dispatch(stateRedux.action());
    if (typeof ref.current === 'function') ref.current(state);
    ref.current = null;
  }, [state]);

  return [state, setLegacyState, stateRedux, selector];
};

/**
 * Inject state in callback
 * (state) => { }
 *
 * const [state, setState] = useState({ count: 0 });
 *
 * Ex: setState({ count: 1 }, (state) => { console.log(state.count) });
 * // 1
 * @param {any} initialState
 * @returns {Array} [state, setState]
 *
 *
 * @author Lucas Eduardo Pedroso
 * @version 0.1.0
 */
export const useClassState = (initialState) => {
  const [state, setState] = useState(initialState);

  const ref = useRef();

  const setLegacyState = useCallback((stt, fnCb) => {
    ref.current = fnCb;
    if (typeof stt === 'function') {
      setState((prevState) => ({ ...prevState, ...stt(prevState) }));
      return;
    }
    if (typeof stt === 'object' && !Array.isArray(stt)) {
      setState((prevState) => ({ ...prevState, ...stt }));
      return;
    }
    setState((prevState) => ({ ...prevState, [stt]: stt }));
  }, []);

  useEffect(() => {
    if (typeof ref.current === 'function') ref.current(state);
    ref.current = null;
  }, [state]);

  return [state, setLegacyState];
};
