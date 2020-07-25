import React, { Component } from 'react';
import Button from './Button';

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
                <Button color="is-info" toggle={handleToggleEdit}>
                  Edit
                </Button>
                <Button color="is-danger" toggle={handleToggleDelete}>
                  Delete
                </Button>
              </div>
            </div>

            <p className="subtitle has-text-dark">by {blog.author.name}</p>
            <div className="content">
              <p>{blog.content}</p>
            </div>
          </article>
        </div>
      </div>
    );
  }
}
