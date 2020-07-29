import React, { useState, useEffect } from 'react';

export default props => {
  const [isLoading, setIsLoading] = useState(false),
    [title, setTitle] = useState(''),
    [content, setContent] = useState('');

  useEffect(() => {
    const { id } = props;
    getBlog(id);
  }, []);

  const getBlog = id => {
    setIsLoading(true);

    fetch(`https://blogarap-api.herokuapp.com/blogs/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(blog => {
        setTimeout(() => {
          setTitle(blog.title);
          setContent(blog.content);
          setIsLoading(false);
        }, 1500);
      });
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  const handleEdit = event => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    let data = new FormData(event.target);

    const { id } = props;
    data.set('author', 'guest');

    data = {
      id: id,
      author: {
        id: parseInt(sessionStorage.getItem('id')),
        name: sessionStorage.getItem('name'),
      },
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
          props.handleResponse();
          setIsLoading(false);
          form.reset();
          props.onToggle();
        }, 1500);
      });
  };

  const { active, onToggle, id } = props;

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
        <form onSubmit={handleEdit} validate="true">
          <section className="modal-card-body">
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
                      onChange={handleTitleChange}
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
                      onChange={handleContentChange}
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
            >
              Save changes
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};
