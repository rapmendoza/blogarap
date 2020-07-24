import React, { Component } from 'react';

import Blog from './Blog';
import CreateModal from './Forms/create';
import EditModal from './Forms/edit';
import DeleteModal from './Forms/delete';

export default class extends Component {
  state = {
    blogs: [],
    displayCreateBlog: false,
    displayEditBlog: false,
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

  handleToggleCreate = () => {
    this.setState({
      displayCreateBlog: !this.state.displayCreateBlog,
      selectedBlog: null,
    });
  };

  handleToggleEdit = id => {
    this.setState({
      displayEditBlog: !this.state.displayEditBlog,
      selectedBlog: id,
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
      displayEditBlog,
      displayDeleteBlog,
      isLoading,
      selectedBlog,
    } = this.state;

    return (
      <section className="section is-loading">
        <div className="container">
          {isLoading && (
            <progress className="progress is-primary" max="100">
              100%
            </progress>
          )}

          {!isLoading && (
            <div className="level is-mobile">
              <div className="level-left">
                <h1 className="title">Blogs</h1>
              </div>
              <div className="level-right">
                <button
                  className="button is-primary is-outlined"
                  onClick={this.handleToggleCreate}
                >
                  New
                </button>
              </div>
            </div>
          )}

          {blogs.map(blog => (
            <Blog
              blog={blog}
              key={blog.id}
              handleToggleEdit={() => this.handleToggleEdit(blog.id)}
              handleToggleDelete={() => this.handleToggleDelete(blog.id)}
            />
          ))}

          <CreateModal
            active={displayCreateBlog}
            onToggle={this.handleToggleCreate}
            handleResponse={this.handleDisplayUpdate}
          />

          {displayEditBlog && (
            <EditModal
              active={displayEditBlog}
              onToggle={this.handleToggleEdit}
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
        </div>
      </section>
    );
  }
}
