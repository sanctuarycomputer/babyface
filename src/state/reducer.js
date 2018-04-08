import {
  SETUP_NAV,
  SET_MIDSECTION_WIDTH,
} from './actions';

const initialState = {
  nav: {},
  midSectionWidth: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SETUP_NAV:
      return { ...state, nav: { ...action.payload } }
    case SET_MIDSECTION_WIDTH:
      return { ...state, midSectionWidth: action.payload }

    default: return state
  }
}
