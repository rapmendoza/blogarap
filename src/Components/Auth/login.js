import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Nav from '../Nav';

export default class extends Component {
  state = {
    isLoading: false,
    redirect: false,
    isMismatch: false,
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const data = new FormData(event.target);

    const username = data.get('username');
    const password = data.get('password');

    fetch(
      `https://blogarap-api.herokuapp.com/users?username=${username}&password=${password}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
      .then(response => response.json())
      .then(user => {
        if (user.length) {
          sessionStorage.setItem('id', user[0].id);
          sessionStorage.setItem('name', user[0].name);
          this.setState({
            isLoading: false,
            isMismatch: false,
            redirect: true,
          });
        } else {
          this.setState({ isLoading: false, isMismatch: true });
        }
      });
  };

  render() {
    const { isLoading, redirect, isMismatch } = this.state;

    return (
      <div className="hero is-dark is-fullheight is-bold">
        <Nav />
        {redirect && <Redirect to="/blogs" />}
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third">
                <h1 className="title">Log in</h1>
                <form validate="true" onSubmit={this.handleSubmit}>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                      />
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
                      {isMismatch && (
                        <p className="help is-danger">
                          Username and Password did not match.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="field">
                    <p className="control">
                      <button
                        className={`button is-info${
                          isLoading ? ' is-loading' : ''
                        }`}
                        type="submit"
                      >
                        Login
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
  }
}
