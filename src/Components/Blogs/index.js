import React, { Component } from 'react';
import Blog from './blog';
import Create from './Forms/create';

export default class extends Component {
  state = {
    blogs: [],
    displayCreateBlog: false,
  };

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/rapmendoza/blogarap/blogs')
      .then(response => response.json())
      .then(blogs => this.setState({ blogs }));
  }

  handleToggleModal = () => {
    this.setState({
      displayCreateBlog: !this.state.displayCreateBlog,
    });
  };

  render() {
    const { blogs, displayCreateBlog } = this.state;

    return (
      <section className="section">
        <div className="container">
          <div className="level">
            <h1 className="level-left title">Blogs</h1>
            <button
              className="level-right button is-primary is-outlined is-pulled-right"
              onClick={this.handleToggleModal}
            >
              New
            </button>
            <Create
              active={displayCreateBlog}
              onToggle={this.handleToggleModal}
            />
          </div>

          <div className="tile is-ancestor">
            {blogs.map(blog => (
              <Blog blog={blog} key={blog.id} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}
