import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';

import App from './containers/App';
import HomePage from './containers/HomePage';

import Header from './components/Header';
import Footer from './components/Footer';

export default () => (
  <App>
    <Header />
    <Switch>
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
