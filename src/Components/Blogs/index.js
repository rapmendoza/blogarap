import React, { Component } from 'react';

import Blog from './blog';
import Modal from './modal';

export default class extends Component {
  state = {
    blogs: [],
    displayCreateBlog: false,
    isLoading: true,
    selectedBlog: 0,
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
        }, 1500);
      });
  };

  handleToggleModal = id => {
    const blogID = typeof id === 'number' ? id : null;

    this.setState({
      displayCreateBlog: !this.state.displayCreateBlog,
      selectedBlog: blogID,
    });
  };

  handleDisplayCreate = newBlog => {
    this.setState({
      blogs: [newBlog, ...this.state.blogs],
    });
  };

  handleDisplayUpdate = updatedBlog => {
    let blogArr = this.state.blogs.map(x => {
      return x.id === updatedBlog.id ? updatedBlog : x;
    });

    this.setState({
      blogs: [...blogArr],
    });
  };

  render() {
    const { blogs, displayCreateBlog, isLoading, selectedBlog } = this.state;

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
                id={1}
              >
                New
              </button>
            </div>
          </div>

          {blogs.map(blog => (
            <Blog
              blog={blog}
              key={blog.id}
              handleToggle={() => this.handleToggleModal(blog.id)}
            />
          ))}

          {displayCreateBlog && (
            <Modal
              active={displayCreateBlog}
              onToggle={this.handleToggleModal}
              handleCreate={this.handleDisplayCreate}
              handleEdit={this.handleDisplayUpdate}
              blogs={blogs}
              id={selectedBlog}
            />
          )}

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
