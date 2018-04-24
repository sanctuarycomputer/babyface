import {
  SETUP_NAV,
  SET_MIDSECTION_WIDTH,
  SET_PADDING_WIDTH,
  TOGGLE_CASE_STUDIES_MENU,
  LOAD_STUDIES,
  LOAD_HOME,
} from './actions';

const initialState = {
  nav: {},
  midSectionWidth: 0,
  paddingWidth: 0,
  showCaseStudiesMenu: false,
  homePage: null,
  studies: []
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

    default: return state
  }
}
