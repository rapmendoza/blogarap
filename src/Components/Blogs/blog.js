import React, { Component } from 'react';

export default class extends Component {
  render() {
    const { blog, handleToggleEdit, handleToggleDelete } = this.props;

    return (
      <div className="tile is-ancestor">
        <div className="tile is-parent is-12">
          <article className="tile is-child box">
            <div className="level is-mobile">
              <p className="level-left title has-text-black">{blog.title}</p>
              <div className="level-right">
                <button
                  className="level-item button is-info is-outlined"
                  onClick={handleToggleEdit}
                  id={blog.id}
                >
                  Edit
                </button>
                <button
                  className="level-item button is-danger is-outlined"
                  onClick={handleToggleDelete}
                >
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
  }
}
