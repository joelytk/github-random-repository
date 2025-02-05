import {
  FETCH_RANDOM_REPOSITORY_ERROR,
  FETCH_RANDOM_REPOSITORY_REQUEST,
  FETCH_RANDOM_REPOSITORY_SUCCESS
} from '../constants';

export const repositoryReducer = (state, action) => {
  switch (action.type) {
    case FETCH_RANDOM_REPOSITORY_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case FETCH_RANDOM_REPOSITORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    }
    case FETCH_RANDOM_REPOSITORY_ERROR: {
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
