import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Nav from '../../Nav';

export default props => {
  const [isLoading, setIsLoading] = useState(false),
    [blog, setBlog] = useState({
      title: '',
      content: '',
      author: '',
    });

  useEffect(() => {
    getBlog(props.match.params.id);
  }, []);

  const getBlog = id => {
    setIsLoading(true);

    fetch(`https://blogarap-api.herokuapp.com/blogs/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(b => {
        setTimeout(() => {
          setIsLoading(false);
          setBlog({
            title: b.title,
            content: b.content,
            author: b.author.name,
          });
        }, 1500);
      });
  };

  return (
    <div>
      <div className="hero is-dark is-fullheight is-bold">
        <Nav />
        <div className="hero-body">
          <div className="container">
            {!isLoading && (
              <section className="section">
                <div className="columns is-mobile">
                  <div className="column is-three-fifths-desktop is-offset-one-fifth-desktop">
                    <h1 className="title">{blog.title}</h1>
                    <h2 className="subtitle has-text-grey-light is-italic is-size-6 is-capitalized">
                      by{' '}
                      <span className="has-text-weight-semibold">
                        {blog.author}
                      </span>
                    </h2>
                    <p
                      style={{
                        whiteSpace: 'pre-wrap',
                        letterSpacing: '.03rem',
                      }}
                    >
                      {blog.content}
                    </p>
                    <Link
                      to="/blogs"
                      className="button is-light is-outlined mt-6"
                    >
                      Back
                    </Link>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
        {isLoading && (
          <progress className="progress is-small is-primary" max="100">
            100%
          </progress>
        )}
      </div>
    </div>
  );
};
