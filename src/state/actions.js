import Store from './Store';
import ContentfulData from 'lib/ContentfulData';

export const SETUP_NAV = 'SETUP_NAV';
export const SET_MIDSECTION_WIDTH = 'SET_MIDSECTION_WIDTH';
export const SET_PADDING_WIDTH = 'SET_PADDING_WIDTH';
export const TOGGLE_CASE_STUDIES_MENU = 'TOGGLE_CASE_STUDIES_MENU';
export const LOAD_STUDIES = 'LOAD_STUDIES';
export const LOAD_HOME = 'LOAD_HOME';
export const CONSIDERED_LOADING = 'CONSIDERED_LOADING';

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

export const setPaddingWidth = payload => {
  return Store.dispatch({
    type: SET_PADDING_WIDTH,
    payload,
  });
}

export const toggleCaseStudiesMenu = () => {
  return Store.dispatch({
    type: TOGGLE_CASE_STUDIES_MENU
  });
}

export const loadHome = () => {
  ContentfulData.getEntries({
    content_type: 'homePage',
    include: 2
  }).then(res => {
    Store.dispatch({
      type: LOAD_HOME,
      payload: res.items[0]
    });
  });
}

export const loadStudies = studies => {
  Store.dispatch({
    type: LOAD_STUDIES,
    payload: studies
  });
}

export const consideredLoading = payload => {
  return Store.dispatch({
    type: CONSIDERED_LOADING,
    payload,
  });
}
