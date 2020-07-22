import React from 'react';
import 'bulma/css/bulma.css';

export default props => {
  return (
    <section class="hero is-primary is-fullheight is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Hey there! Welcome to blogarap.</h1>
          <button class="button is-primary is-inverted is-outlined">
            Get started.
          </button>
        </div>
      </div>
    </section>
  );
};
