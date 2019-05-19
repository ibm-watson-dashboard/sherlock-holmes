import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import Alert from 'react-s-alert';

import AppHeader from '../common/AppHeader';
import PrivateRoute from '../common/PrivateRoute';
import PublicRoute from '../common/PublicRoute';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';

import Home from '../home/Home';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {authenticated: false, currentUser: null, loading: false}

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    this.setState({loading: true});

    getCurrentUser()
    .then(response => {
      this.setState({currentUser: response, authenticated: true, loading: false});
    }).catch(error => {
      this.setState({loading: false});
    });    
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({authenticated: false, currentUser: null});
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if(this.state.loading) {
      return <LoadingIndicator />
    }

    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={this.state.authenticated} currentUser={this.state.currentUser} onLogout={this.handleLogout} />
        </div>
        <div className="app-body">
          <Switch>
            <PublicRoute exact path="/" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Home}></PublicRoute>
            <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Profile}></PrivateRoute>
            <PublicRoute path="/oauth2/redirect" component={OAuth2RedirectHandler}></PublicRoute>
            <PublicRoute component={NotFound}></PublicRoute>
          </Switch>
        </div>
        <Alert stack={{limit: 3}}  timeout = {3000} position='top-right' effect='slide' offset={65} />
      </div>
    );
  }
}

export default App;
