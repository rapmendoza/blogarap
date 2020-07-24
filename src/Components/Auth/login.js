import React from 'react';

export default () => {
  return (
    <div className="hero-body">
      <div className="container">
        <div class="columns">
          <div class="column is-one-third">
            <h1 className="title">Log in</h1>
            <form validate="true">
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
                  <button className="button is-info" type="submit">
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
