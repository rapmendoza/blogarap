import React from 'react';

export default ({ blog }) => {
  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent is-12">
        <article className="tile is-child box">
          <p className="title has-text-black">{blog.title}</p>
          <p className="subtitle has-text-dark">by {blog.author}</p>
          <div className="content">
            <p>{blog.content}</p>
          </div>
        </article>
      </div>
    </div>
  );
};
