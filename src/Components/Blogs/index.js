import React, { Component } from 'react';

import Blog from './blog';
import Create from './Forms/create';

export default class extends Component {
  state = {
    blogs: [],
    displayCreateBlog: false,
    isLoading: true,
  };

  componentDidMount() {
    this.getAllData();
  }

  getAllData = async () => {
    await fetch(
      'https://my-json-server.typicode.com/rapmendoza/blogarap/blogs?_sort=id&_order=desc'
    )
      .then(response => response.json())
      .then(blogs => {
        setTimeout(() => {
          this.setState({ blogs, isLoading: false });
        }, 2000);
      });
  };

  handleToggleModal = () => {
    this.setState({
      displayCreateBlog: !this.state.displayCreateBlog,
    });
  };

  handleDisplayUpdate = newBlog => {
    this.setState({
      blogs: [newBlog, ...this.state.blogs],
    });
  };

  render() {
    const { blogs, displayCreateBlog, isLoading } = this.state;

    return (
      <section className="section is-loading">
        <div className="container">
          <div className="level is-mobile">
            <div className="level-left">
              <h1 className="title">Blogs</h1>
            </div>
            <div className="level-right">
              <button
                className="button is-primary is-outlined"
                onClick={this.handleToggleModal}
              >
                New
              </button>
            </div>
            <Create
              active={displayCreateBlog}
              onToggle={this.handleToggleModal}
              handler={this.handleDisplayUpdate}
              blogs={blogs}
            />
          </div>

          {blogs.map(blog => (
            <Blog blog={blog} key={blog.id} />
          ))}

          {isLoading && (
            <progress className="progress is-primary" max="100">
              100%
            </progress>
          )}
        </div>
      </section>
    );
  }
}
