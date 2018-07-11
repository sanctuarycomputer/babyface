import {
  SETUP_NAV,
  SET_MIDSECTION_WIDTH,
  SET_PADDING_WIDTH,
  TOGGLE_CASE_STUDIES_MENU,
  LOAD_STUDIES,
  LOAD_HOME,
  CONSIDERED_LOADING,
  SET_KEY_IMAGE
} from './actions';

import Constants from 'lib/Constants';

const initialState = {
  nav: {
    blurbMode: Constants.NavBlurbMode.HOME,
    meta: null
  },
  midSectionWidth: 0,
  paddingWidth: 0,
  showCaseStudiesMenu: false,
  homePage: null,
  studies: [],
  consideredLoading: true,
  keyImage: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SETUP_NAV:
      return { ...state, nav: { ...action.payload } }
    case SET_MIDSECTION_WIDTH:
      return { ...state, midSectionWidth: action.payload }
    case SET_PADDING_WIDTH:
      return { ...state, paddingWidth: action.payload }
    case TOGGLE_CASE_STUDIES_MENU:
      return { ...state, showCaseStudiesMenu: !state.showCaseStudiesMenu }
    case LOAD_HOME:
      return { ...state, homePage: action.payload }
    case LOAD_STUDIES:
      return { ...state, studies: action.payload }
    case CONSIDERED_LOADING:
      return { ...state, consideredLoading: action.payload }
    case SET_KEY_IMAGE:
      return { ...state, keyImage: action.payload }

    default: return state
  }
}
