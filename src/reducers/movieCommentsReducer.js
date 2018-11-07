import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type){        
        case actionTypes.FETCH_MOVIES_COMMENTS:
            console.log("actionTypes.FETCH_MOVIES_COMMENTS");
            console.log(action.payload);
            initialState.items = action.payload;
            return {
              ...state,
              loading: false,
              items: action.payload
            };
            
        default:
            return state;
    }
};
