import React, { Component } from 'react';

export default class extends Component {
  state = {
    isLoading: false,
  };
  componentDidMount() {
    document.getElementById('form-create').reset();
  }

  handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;
    let data = new FormData(event.target);
    let lastId = this.props.blogs[0].id;

    data.set('id', ++lastId);
    data.set('author', 'guest');

    await fetch(
      'https://my-json-server.typicode.com/rapmendoza/blogarap/blogs',
      {
        method: 'POST',
        body: JSON.stringify({
          id: parseInt(data.get('id')),
          author: data.get('author'),
          title: data.get('title'),
          content: data.get('content'),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
      .then(response => response.json())
      .then(blog => this.props.handler(blog));

    this.props.onToggle();
    this.setState({ isLoading: false });
    form.reset();
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
            <button
              className="delete is-medium"
              aria-label="close"
              onClick={onToggle}
            ></button>
          </header>
          <form onSubmit={this.handleSubmit} validate="true" id="form-create">
            <section className="modal-card-body">
              <div className="field">
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Title"
                        id="title"
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
                        id="content"
                        name="content"
                        style={{ minHeight: '300px' }}
                        required
                      ></textarea>
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
