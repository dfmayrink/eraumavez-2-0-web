import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignOut = ({ history, firebase, children }) => (
  <div onClick={() => {firebase.doSignOut(); history.push(ROUTES.LANDING);}}>
    {children}
  </div>
);

export default compose(
  withRouter,
  withFirebase
)(SignOut);
