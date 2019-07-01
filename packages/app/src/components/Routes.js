import React, { Fragment } from 'react';
import { Router, Route } from 'react-router-dom';

import { createBrowserHistory } from 'history';

import HomePage from 'pages/HomePage';

export const history = createBrowserHistory();

const Routes = props => {
  return (
    <Router history={history}>
      <Fragment>
        <Route exact path="/" component={HomePage} />
      </Fragment>
    </Router>
  );
};

export default Routes;
