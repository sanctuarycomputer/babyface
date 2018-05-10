import reducer from './reducer';

function createStore(reducer) {
  let state;
  let listeners = []

  function getState() { return state }

  function subscribe(listener) {
    listeners.push(listener)
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      if (index > -1) listeners.splice(index, 1)
    }
  }

  function dispatch(action) {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  dispatch({})
  return { dispatch, subscribe, getState }
}

export default createStore(reducer);
