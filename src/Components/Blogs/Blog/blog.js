import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Nav from '../../Nav';

export default class extends Component {
  state = {
    isLoading: true,
    blog: {
      title: '',
      content: '',
      author: '',
    },
  };

  componentDidMount() {
    this.getBlog(this.props.match.params.id);
  }

  getBlog(id) {
    fetch(`https://blogarap-api.herokuapp.com/blogs/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(b => {
        setTimeout(() => {
          this.setState({
            isLoading: false,
            blog: {
              title: b.title,
              content: b.content,
              author: b.author.name,
            },
          });
        }, 1500);
      });
  }

  render() {
    const { isLoading, blog } = this.state;

    return (
      <div>
        <div className="hero is-dark is-fullheight is-bold">
          <Nav />
          <div className="hero-body">
            <div className="container">
              {isLoading ? (
                <progress className="progress is-small is-primary" max="100">
                  100%
                </progress>
              ) : (
                <section className="section">
                  <div className="columns is-mobile">
                    <div className="column is-half-desktop is-offset-one-quarter-desktop">
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
        </div>
      </div>
    );
  }
}
