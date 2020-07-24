import React, { Component } from 'react';

import Blog from './blog';
import Modal from './modal';
import DeleteModal from './delete';

export default class extends Component {
  state = {
    blogs: [],
    displayCreateBlog: false,
    displayDeleteBlog: false,
    isLoading: true,
    selectedBlog: 0,
  };

  componentDidMount() {
    this.getAllData();
  }

  getAllData = async (length = 1500) => {
    await fetch('https://blogarap-api.herokuapp.com/blogs?_sort=id&_order=desc')
      .then(response => response.json())
      .then(blogs => {
        setTimeout(() => {
          this.setState({ blogs, isLoading: false });
        }, length);
      });
  };

  handleToggleModal = id => {
    const blogID = typeof id === 'number' ? id : null;

    this.setState({
      displayCreateBlog: !this.state.displayCreateBlog,
      selectedBlog: blogID,
    });
  };

  handleToggleDelete = id => {
    this.setState({
      displayDeleteBlog: !this.state.displayDeleteBlog,
      selectedBlog: id,
    });
  };

  handleDisplayUpdate = () => {
    this.getAllData(0);
  };

  render() {
    const {
      blogs,
      displayCreateBlog,
      displayDeleteBlog,
      isLoading,
      selectedBlog,
    } = this.state;

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
              handleToggleEdit={() => this.handleToggleModal(blog.id)}
              handleToggleDelete={() => this.handleToggleDelete(blog.id)}
            />
          ))}

          {displayCreateBlog && (
            <Modal
              active={displayCreateBlog}
              onToggle={this.handleToggleModal}
              handleResponse={this.handleDisplayUpdate}
              id={selectedBlog}
            />
          )}

          <DeleteModal
            active={displayDeleteBlog}
            onToggle={this.handleToggleDelete}
            handleResponse={this.handleDisplayUpdate}
            id={selectedBlog}
          />

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
