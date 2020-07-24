import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Blogs from './Blogs';
import LogIn from './Auth';
import SignUp from './Auth/signup';

export default () => {
  return (
    <div className="hero is-dark is-fullheight is-bold">
      <Nav />
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Blogs} path="/blogs" />
        <Route component={SignUp} path="/signup" />
        <Route component={LogIn} path="/login" />
      </Switch>
    </div>
  );
};
