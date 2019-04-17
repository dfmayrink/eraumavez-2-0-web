import React, { Component } from 'react';

import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import GithubCorner from '../github/Corner';
import FloatCart from '../FloatCart';
import Header from "../Header";
import {BrowserRouter} from "react-router-dom";
import PainelServicos from "../Servicos";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header/>
          <PainelServicos/>
          <main>
            <Filter/>
            <Shelf/>
          </main>
          <FloatCart />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
