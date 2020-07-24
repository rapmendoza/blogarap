import React, { Component } from 'react';

export default class extends Component {
  state = {
    isLoading: false,
  };

  handleDelete = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { id } = this.props;

    fetch(`https://blogarap-api.herokuapp.com/blogs/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setTimeout(() => {
          this.props.handleResponse();
          this.setState({ isLoading: false });
          this.props.onToggle();
        }, 1000);
      });
  };

  render() {
    const { active, onToggle, id } = this.props;
    const { isLoading } = this.state;

    return (
      <div className={`modal${active ? ' is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              Are you sure you want to delete this post?
            </p>
            <button
              className="delete is-medium"
              aria-label="close"
              onClick={onToggle}
              id={id}
            ></button>
          </header>
          <form onSubmit={this.handleDelete}>
            <section className="modal-card-body"></section>
            <footer className="modal-card-foot">
              <button
                className={`button is-danger${isLoading ? ' is-loading' : ''}`}
                type="submit"
                onClick={this.handleLoader}
              >
                Delete
              </button>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}
