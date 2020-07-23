import React, { Component } from 'react';

import Blog from './blog';
import Create from './Forms/create';

export default class extends Component {
  state = {
    blogs: [],
    displayCreateBlog: false,
  };

  componentDidMount() {
    this.getAllData();
  }

  getAllData = async () => {
    await fetch('http://localhost:3001/blogs?_sort=id&_order=desc')
      .then(response => response.json())
      .then(blogs => this.setState({ blogs }));
  };

  handleToggleModal = () => {
    this.setState({
      displayCreateBlog: !this.state.displayCreateBlog,
    });
  };

  handleDisplayUpdate = blog => {
    this.setState({
      blogs: [blog, ...this.state.blogs],
    });
  };

  render() {
    const { blogs, displayCreateBlog } = this.state;

    return (
      <section className="section">
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
            />
          </div>

          {blogs.map((blog, i) => (
            <Blog blog={blog} key={blog.id} />
          ))}
        </div>
      </section>
    );
  }
}
