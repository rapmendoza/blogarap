import React, { useState } from 'react';

export default props => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = event => {
    event.preventDefault();
    setIsLoading(true);
    const { id } = props;

    fetch(`https://blogarap-api.herokuapp.com/blogs/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setTimeout(() => {
          props.handleResponse();
          setIsLoading(false);
          props.onToggle();
        }, 1000);
      });
  };

  const { active, onToggle } = props;

  return (
    <div className={`modal${active ? ' is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Are you sure you want to delete this post?
          </p>
        </header>
        <form onSubmit={handleDelete}>
          <section className="modal-card-body">
            <div className="level is-mobile">
              <button
                className={`level-item button is-danger${
                  isLoading ? ' is-loading' : ''
                }`}
                type="submit"
              >
                Yes
              </button>
              <button
                className="level-item button"
                type="button"
                onClick={onToggle}
              >
                No
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};
