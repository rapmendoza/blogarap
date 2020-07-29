import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default props => {
  const handleMouseEnter = e => {
    const article = e.target;

    article.classList.remove('is-light');
    article.classList.add('is-white');
  };

  const handleMouseLeave = e => {
    const article = e.target;

    article.classList.remove('is-white');
    article.classList.add('is-light');
  };

  const { blog, handleToggleEdit, handleToggleDelete, isLoggedIn } = props;
  const canEdit = parseInt(sessionStorage.getItem('id')) === blog.author.id;

  return (
    <div className="tile is-ancestor">
      <div className="tile is-vertical">
        <div className="tile">
          <div className="tile is-parent is-vertical">
            <article
              className="tile is-child notification is-light"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="level is-mobile mb-1">
                <h2 className="level-left has-text-black has-text-weight-semibold is-size-3">
                  {blog.title}
                </h2>

                {isLoggedIn && canEdit && (
                  <div className="level-right">
                    <Button color="is-info" toggle={handleToggleEdit}>
                      Edit
                    </Button>
                    <Button color="is-danger" toggle={handleToggleDelete}>
                      Delete
                    </Button>
                  </div>
                )}
              </div>

              <p className="subtitle has-text-grey is-italic is-size-6 is-capitalized">
                by{' '}
                <span className="has-text-weight-semibold">
                  {blog.author.name}
                </span>
              </p>

              <div className="content">
                <p
                  style={{
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {blog.content}
                </p>
                <Link to={`/blogs/${blog.id}`}>Continue Reading</Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};
