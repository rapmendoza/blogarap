import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Blogs from './Blogs';

export default () => {
  return (
    <div className="hero is-dark is-fullheight is-bold">
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Blogs} path="/blogs" />
      </Switch>
    </div>
  );
};
