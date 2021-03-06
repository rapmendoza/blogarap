import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Blogs from './Blogs';
import Blog from './Blogs/Blog/blog';
import SignUp from './Auth/signup';
import LogIn from './Auth/login';

export default () => {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Blogs} path="/blogs" exact />
      <Route component={Blog} path="/blogs/:id" />
      <Route component={SignUp} path="/signup" />
      <Route component={LogIn} path="/login" />
    </Switch>
  );
};
