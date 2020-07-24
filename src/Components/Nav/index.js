import React, { Component } from 'react';

export default class extends Component {
  componentDidMount() {
    this.navBarHandler();
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

  render() {
    return (
      <nav className="navbar is-black">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            Blogarap
          </a>

          <div className="navbar-burger burger" data-target="myBurger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="myBurger" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-light is-outlined" href="/signup">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light is-outlined" href="/login">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
