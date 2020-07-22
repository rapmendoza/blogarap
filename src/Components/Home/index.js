import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="hero-body">
      <div className="container">
        <h1 className="title">
          Hey there! Welcome to{' '}
          <span class="has-text-weight-bold	has-text-warning">blogarap</span>.
        </h1>
        <Link to="/blogs" className="button is-dark is-inverted is-outlined">
          Get Started.
        </Link>
      </div>
    </div>
  );
};
