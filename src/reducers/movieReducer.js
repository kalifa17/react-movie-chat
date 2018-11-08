import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIES_BEGIN:
      return {
        ...state,
        loading: false,
        error: null
      };

    case actionTypes.FETCH_MOVIES_SUCCESS:
      initialState.items = action.payload.movies;
      return {
        ...state,
        loading: false,
        items: action.payload.movies
      };

    case actionTypes.FETCH_MOVIES_FAILURE:
      console.error(action);
      console.error(action.payload);
      console.error(action.payload.error);
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
};
