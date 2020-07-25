import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Nav from '../Nav';

export default class extends Component {
  state = {
    isLoading: false,
    redirect: false,
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    let data = new FormData(event.target);

    data = {
      name: data.get('name'),
      username: data.get('username'),
      password: data.get('password'),
    };

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
  };

  render() {
    const { isLoading, redirect } = this.state;

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
                      <button
                        className={`button is-success${
                          isLoading ? ' is-loading' : ''
                        }`}
                        type="submit"
                      >
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
  }
}
