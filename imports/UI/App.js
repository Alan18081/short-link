import React, {Component} from 'react';
import {Route,BrowserRouter,Switch} from 'react-router-dom';

import SignUp from './components/SignUp';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Auth from './hoc/Auth';
import Links from './components/Links';

export default class App extends Component {
    render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Auth(Links)}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/login" component={Auth(Login)}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        </BrowserRouter>
      );
    }
}