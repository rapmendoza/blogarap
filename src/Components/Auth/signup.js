import React from 'react';

import Nav from '../Nav';

export default () => {
  return (
    <div className="hero is-dark is-fullheight is-bold">
      <Nav />
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <h1 className="title">Sign Up</h1>
              <form validate="true">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Name"
                      name="name"
                      required
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Username"
                      name="username"
                      required
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      required
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="button is-success" type="submit">
                      Sign up
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
