import Store from './Store';

export const SETUP_NAV = 'SETUP_NAV';
export const SET_MIDSECTION_WIDTH = 'SET_MIDSECTION_WIDTH';

export const setupNav = payload => {
  return Store.dispatch({
    type: SETUP_NAV,
    payload,
  });
}

export const setMidsectionWidth = payload => {
  return Store.dispatch({
    type: SET_MIDSECTION_WIDTH,
    payload,
  });
}
