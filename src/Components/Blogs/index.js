import React, { Component } from 'react';
import Blog from './blog';

export default class extends Component {
  state = {
    blogs: [],
  };

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/rapmendoza/blogarap/blogs')
      .then(response => response.json())
      .then(blogs => this.setState({ blogs }));
  }

  render() {
    const { blogs } = this.state;

    return (
      <section className="section">
        <div className="container">
          <div className="level">
            <h1 className="level-left title">Blogs</h1>
            <button class="level-right button is-primary is-outlined is-pulled-right">
              New
            </button>
          </div>

          <div className="tile is-ancestor">
            {blogs.map(blog => (
              <Blog blog={blog} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}
