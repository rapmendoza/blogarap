import React from 'react';

const blog = ({ blog }) => {
  return (
    <div className="tile is-parent">
      <article className="tile is-child box">
        <p className="title has-text-black">{blog.title}</p>
        <p className="subtitle has-text-dark">by {blog.author}</p>
        <div className="content">
          <p>{blog.content}</p>
        </div>
      </article>
    </div>
  );
};

export default blog;
