import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class extends Component {
  state = {
    isLoggedIn: false,
    isLoading: false,
  };

  componentDidMount() {
    this.navBarHandler();
    this.checkUser();
  }

  navBarHandler() {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0
    );

    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  }

  checkUser() {
    if (sessionStorage.getItem('id')) {
      this.setState({ isLoggedIn: true });
    }
  }

  handleLogout = () => {
    this.setState({ isLoading: true });

    setTimeout(() => {
      this.setState({ isLoggedIn: false, isLoading: false });
      this.props.handleLogout();
      sessionStorage.clear();
    }, 1000);
  };

  render() {
    const { isLoggedIn, isLoading } = this.state;
    const name = sessionStorage.getItem('name');

    return (
      <nav className="navbar is-black">
        <div className="navbar-brand">
          <a
            className="navbar-item is-size-4 has-text-weight-semibold"
            href="/"
          >
            Blogarap
          </a>

          <div className="navbar-burger burger" data-target="myBurger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="myBurger" className="navbar-menu">
          {isLoggedIn ? (
            <div className="navbar-end">
              <h1 className="navbar-item">
                Welcome
                <span className="is-capitalized has-text-weight-bold">
                  {`, ${name}`}
                </span>
              </h1>
              <div className="navbar-item">
                <div className="buttons">
                  <button
                    className={`button is-light is-outlined${
                      isLoading ? ' is-loading' : ''
                    }`}
                    onClick={this.handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link to="/signup" className="button is-light is-outlined">
                    Sign up
                  </Link>
                  <Link to="/login" className="button is-light is-outlined">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
}
