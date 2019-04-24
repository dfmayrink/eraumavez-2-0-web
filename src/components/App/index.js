import React, { Component } from 'react';

import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import GithubCorner from '../github/Corner';
import FloatCart from '../FloatCart';
import Header from "../Header";
import ResumoEstimativa from '../ResumoEstimativa'
import {BrowserRouter, Route} from "react-router-dom";
import PainelServicos from "../Servicos";
import * as ROUTES from "../../constants/routes";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header/>
          <Route component={PainelServicos} path={ROUTES.ESTIMATIVA}/>
          <Route component={ResumoEstimativa} path={ROUTES.RESUMO_ESTIMATIVA}/>
          {/*<Route exact path={ROUTES.LANDING} component={LandingPage} />*/}
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          {/*<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />*/}
          {/*<Route path={ROUTES.HOME} component={HomePage} />*/}
          {/*<Route path={ROUTES.ACCOUNT} component={AccountPage} />*/}
          {/*<Route path={ROUTES.ADMIN} component={AdminPage} />*/}
          {/*<main>*/}
            {/*<Filter/>*/}
            {/*<Shelf/>*/}
          {/*</main>*/}
          {/*<FloatCart />*/}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
