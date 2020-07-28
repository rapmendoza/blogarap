import React, { Component } from 'react';

export default class extends Component {
  state = {
    isLoading: false,
  };

  handleCreate = event => {
    event.preventDefault();
    const form = event.target;
    let data = new FormData(event.target);

    data = {
      author: {
        id: parseInt(sessionStorage.getItem('id')),
        name: sessionStorage.getItem('name'),
      },
      title: data.get('title'),
      content: data.get('content'),
    };

    fetch('https://blogarap-api.herokuapp.com/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(() => {
        setTimeout(() => {
          this.props.handleResponse();
          this.setState({ isLoading: false });
          form.reset();
          this.props.onToggle();
        }, 1500);
      });
  };

  handleLoader = () => {
    this.setState({ isLoading: true });
  };

  render() {
    const { active, onToggle } = this.props;
    const { isLoading } = this.state;

    return (
      <div className={`modal${active ? ' is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Create new blog</p>
            {!isLoading && (
              <button
                className="delete is-medium"
                aria-label="close"
                onClick={onToggle}
              ></button>
            )}
          </header>
          <form onSubmit={this.handleCreate} validate="true">
            <section className="modal-card-body">
              {isLoading && (
                <progress className="progress is-small is-primary" max="100">
                  100%
                </progress>
              )}

              <div>
                <div className="field">
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="Title"
                          name="title"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <textarea
                          className="textarea"
                          placeholder="Content"
                          name="content"
                          style={{ minHeight: '300px' }}
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className={`button is-link${isLoading ? ' is-loading' : ''}`}
                type="submit"
                onClick={this.handleLoader}
              >
                Save
              </button>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}
