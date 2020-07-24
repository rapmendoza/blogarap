import React from 'react';

export default ({ color, toggle, children }) => (
  <button className={`level-item button is-outlined ${color}`} onClick={toggle}>
    {children}
  </button>
);
