import {
  SIGN_IN, SIGN_OUT, SIGN_UP
} from './actionTypes';


const initialState = {
  authUser: {},
};

export default function(state = initialState, action) {
  let user = action.payload;
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        authUser: user
      };
    case SIGN_UP:
      return {
        ...state,
        authUser: user
      }
    default:
      return state;
  }
}
