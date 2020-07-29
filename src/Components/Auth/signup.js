import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Nav from '../Nav';

export default () => {
  const [isLoading, setIsLoading] = useState(false),
    [redirect, setRedirect] = useState(false),
    [isUsernameTaken, setIsUsernameTaken] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    let data = new FormData(event.target);

    data = {
      name: data.get('name'),
      username: data.get('username'),
      password: data.get('password'),
    };

    checkUser(data);
  };

  const checkUser = data => {
    const { username } = data;

    fetch(`https://blogarap-api.herokuapp.com/users?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(user => {
        if (user.length) {
          setIsUsernameTaken(true);
          setIsLoading(false);
          return false;
        } else {
          setIsUsernameTaken(false);
          createUser(data);
        }
      });
  };

  const createUser = data => {
    fetch(`https://blogarap-api.herokuapp.com/users`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(user => {
        sessionStorage.setItem('id', user.id);
        sessionStorage.setItem('name', user.name);
        setIsLoading(false);
        setRedirect(true);
      });
  };

  return (
    <div className="hero is-dark is-fullheight is-bold">
      <Nav />
      {redirect && <Redirect to="/blogs" />}
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <h1 className="title">Sign Up</h1>
              <form validate="true" onSubmit={handleSubmit}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Name"
                      name="name"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Username"
                      name="username"
                      required
                    />
                    {isUsernameTaken && (
                      <p className="help is-danger">
                        Username is already taken
                      </p>
                    )}
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button
                      className={`button is-success${
                        isLoading ? ' is-loading' : ''
                      }`}
                      type="submit"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
