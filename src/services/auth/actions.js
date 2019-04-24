import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT
} from "./actionTypes";

import {authRef} from "../../components/Firebase/firebase";

export const signIn = (email, password) => dispatch => {
  authRef.doSignInWithEmailAndPassword(email, password)
    .then(user =>
      dispatch({
        type: SIGN_IN,
        payload: user
      })
    )
    .catch(error =>
      dispatch({
        type: SIGN_IN,
        payload: null
      })
    );

}

export const signUp = user => dispatch => {
  dispatch({
    type: SIGN_UP,
    payload: user
  });
}

