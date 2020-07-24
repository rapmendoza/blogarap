import React, { Component } from 'react';

export default class extends Component {
  state = {
    isLoading: false,
    title: '',
    content: '',
  };

  componentDidMount() {
    const { id } = this.props;
    this.setState({ isLoading: true });

    fetch(`https://blogarap-api.herokuapp.com/blogs/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(blog => {
        setTimeout(() => {
          this.setState({
            title: blog.title,
            content: blog.content,
            isLoading: false,
          });
        }, 1500);
      });
  }

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleContentChange = e => {
    this.setState({ content: e.target.value });
  };

  handleEdit = event => {
    event.preventDefault();
    const form = event.target;
    let data = new FormData(event.target);

    const { id } = this.props;
    data.set('author', 'guest');

    data = {
      id: id,
      author: data.get('author'),
      title: data.get('title'),
      content: data.get('content'),
    };

    fetch(`https://blogarap-api.herokuapp.com/blogs/${id}`, {
      method: 'PUT',
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
    const { active, onToggle, id } = this.props;
    const { isLoading, title, content } = this.state;

    return (
      <div className={`modal${active ? ' is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit blog</p>
            {!isLoading && (
              <button
                className="delete is-medium"
                aria-label="close"
                onClick={onToggle}
                id={id}
              ></button>
            )}
          </header>
          <form onSubmit={this.handleEdit} validate="true">
            <section className="modal-card-body">
              {isLoading && (
                <progress className="progress is-primary" max="100">
                  100%
                </progress>
              )}

              <div className="field">
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={this.handleTitleChange}
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
                        value={content}
                        onChange={this.handleContentChange}
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
                Save changes
              </button>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}
