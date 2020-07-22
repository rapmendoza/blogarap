import React from 'react';

export default ({ active, onToggle }) => {
  return (
    <div className={`modal${active ? ' is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create new blog</p>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input className="input" type="text" placeholder="Title" />
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
                    style={{ minHeight: '300px' }}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-link">Save</button>
          <button className="button" onClick={onToggle}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
