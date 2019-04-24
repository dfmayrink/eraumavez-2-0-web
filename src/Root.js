import React from 'react';
import { Provider } from 'react-redux';

import store from './services/store';
import Firebase from "./components/Firebase";
import FirebaseContext from "./components/Firebase/context";

const Root = ({ children, initialState = {} }) => (
    <Provider store={store(initialState)}>
      {children}
    </Provider>
);

export default Root;
