import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Nav from '../Nav';

export default class extends Component {
  state = {
    isLoading: false,
    redirect: false,
    isUsernameTaken: false,
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    let data = new FormData(event.target);

    data = {
      name: data.get('name'),
      username: data.get('username'),
      password: data.get('password'),
    };

    this.checkUser(data);
  };

  checkUser(data) {
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
          this.setState({ isUsernameTaken: true, isLoading: false });
          return false;
        } else {
          this.setState({ isUsernameTaken: false, isLoading: false });
          this.createUser(data);
        }
      });
  }

  createUser(data) {
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
        this.setState({ isLoading: false, redirect: true });
      });
  }

  render() {
    const { isLoading, redirect, isUsernameTaken } = this.state;

    return (
      <div className="hero is-dark is-fullheight is-bold">
        <Nav />
        {redirect && <Redirect to="/blogs" />}
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third">
                <h1 className="title">Sign Up</h1>
                <form validate="true" onSubmit={this.handleSubmit}>
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
  }
}
