import {
  FETCH_LANGUAGES_ERROR,
  FETCH_LANGUAGES_REQUEST,
  FETCH_LANGUAGES_SUCCESS
} from '../constants';

export const languagesReducer = (state, action) => {
  switch (action.type) {
    case FETCH_LANGUAGES_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case FETCH_LANGUAGES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    }
    case FETCH_LANGUAGES_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};
