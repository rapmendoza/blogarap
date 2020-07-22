import React, { Component } from 'react';

export default class extends Component {
  state = {
    blog: {
      id: '',
      title: '',
      author: 'Guest',
      content: '',
    },
  };

  render() {
    const { active, onToggle } = this.props;

    return (
      <div className={`modal${active ? ' is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Create new blog</p>
          </header>
          <section className="modal-card-body">
            <form>
              <div className="field">
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Title"
                        value={this.state.title}
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
                        value={this.state.content}
                        style={{ minHeight: '300px' }}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </form>
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
  }
}
