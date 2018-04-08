import reducer from './reducer';

function createStore(reducer) {
  let state;
  let listeners = []

  function getState() {
    return state
  }

  function subscribe(listener) {
    listeners.push(listener)

    return function unsubscribe() {
      let index = listeners.indexOf(listener)
      listeners.splice(listener)
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
