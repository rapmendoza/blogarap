import React from 'react';

export default ({ blog }) => {
  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent is-12">
        <article className="tile is-child box">
          <div className="level">
            <p className="level-left title has-text-black">{blog.title}</p>
            <div className="level-right">
              <button className="level-item button is-info is-outlined">
                Edit
              </button>
              <button className="level-item button is-danger is-outlined">
                Delete
              </button>
            </div>
          </div>

          <p className="subtitle has-text-dark">by {blog.author}</p>
          <div className="content">
            <p>{blog.content}</p>
          </div>
        </article>
      </div>
    </div>
  );
};
